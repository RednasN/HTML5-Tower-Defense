import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TurretConfig, UpgradeType, getTurretConfig, getTurretConfigs } from '../../models/configs/turret-config.model';
import { GridService } from '../../services/game/grid.service';
import { TowerService } from '../../services/towers/tower.service';
import { ProgressionCircleComponent } from '../progression-circle/progression-circle.component';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type UpgradeDetails = {
  type: UpgradeType;
  icon: string;
  level: number;
  currentCost?: number;
  upgradeCost?: number;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Turret = TurretConfig & {
  selected: boolean;
};

const DEFAULT_UPGRADE_OPTIONS = [
  { type: UpgradeType.Speed, icon: './assets/speed.png', level: 1 },
  { type: UpgradeType.Damage, icon: './assets/power.png', level: 1 },
  { type: UpgradeType.Range, icon: './assets/range.png', level: 1 },
];

@Component({
  selector: 'app-build-tower-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ProgressionCircleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './build-tower-dialog.component.scss',
  templateUrl: './build-tower-dialog.component.html',
})
export class BuildTowerDialogComponent implements OnInit {
  private readonly towerService = inject(TowerService);
  private readonly gridService = inject(GridService);

  private readonly dialogRef = inject(MatDialogRef<BuildTowerDialogComponent>);

  public turrets: Turret[] = [];

  public totalCost: number | null = null;

  public upgradeOptions: UpgradeDetails[] = cloneDefaultUpgradeOptions();

  public ngOnInit(): void {
    this.createTowerOptions();
  }

  public upgrade(option: UpgradeDetails): void {
    if (option.level < 5) {
      option.level++;
      this.updateUpgradeOptions();
    }
  }

  public selectTurret(turret: Turret): void {
    this.turrets.forEach(t => (t.selected = false));
    turret.selected = true;

    this.upgradeOptions = cloneDefaultUpgradeOptions();

    this.updateUpgradeOptions();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public buildTower(): void {
    const selectedTurret = this.turrets.find(turret => turret.selected);

    if (!selectedTurret) {
      return;
    }

    const speedLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Speed)!.level;
    const powerLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Damage)!.level;
    const rangeLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Range)!.level;

    const selectedCell = this.gridService.selectedCell;

    this.towerService.createTower(selectedTurret.type, selectedCell!.x, selectedCell!.y, speedLevel, powerLevel, rangeLevel);

    this.dialogRef.close();
  }

  private createTowerOptions(): void {
    this.turrets = getTurretConfigs().map(turret => {
      return {
        ...turret,
        selected: false,
      };
    });
  }

  private calculateTotalCost(): void {
    const towerCost = this.turrets.find(turret => turret.selected)?.cost;

    if (!towerCost) {
      this.totalCost = null;
    }

    const upgradeCosts = this.upgradeOptions.reduce((acc, option) => acc + option.currentCost!, 0);

    this.totalCost = upgradeCosts + towerCost!;
  }

  private updateUpgradeOptions(): void {
    const selectedTurret = this.turrets.find(x => x.selected);
    if (!selectedTurret) return;

    const turretConfig = getTurretConfig(selectedTurret.type);

    for (const upgradeType of [UpgradeType.Speed, UpgradeType.Damage, UpgradeType.Range]) {
      this.processUpgradeOption(upgradeType, turretConfig);
    }

    this.calculateTotalCost();
  }

  private processUpgradeOption(upgradeType: UpgradeType, turretConfig: TurretConfig): void {
    const currentStats = this.upgradeOptions.find(x => x.type === upgradeType);
    if (!currentStats) return;

    const upgradeConfig = turretConfig.upgrades.find(x => x.type === upgradeType);
    if (!upgradeConfig) return;

    const nextUpgrade = upgradeConfig.details.find(x => x.level === currentStats.level + 1);
    const currentUpgrades = upgradeConfig.details.filter(x => x.level <= currentStats.level);

    currentStats.upgradeCost = nextUpgrade?.cost;
    currentStats.currentCost = currentUpgrades.reduce((acc, x) => acc + x.cost, 0);
  }
}

function cloneDefaultUpgradeOptions(): UpgradeDetails[] {
  return DEFAULT_UPGRADE_OPTIONS.map(option => ({ ...option }));
}
