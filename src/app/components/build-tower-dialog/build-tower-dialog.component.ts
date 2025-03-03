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

import { UpgradeType, getTurretConfig } from '../../models/configs/turret-config.model';
import { WeaponType } from '../../models/weapons/weapon.model';
import { GridService } from '../../services/game/grid.service';
import { TowerService } from '../../services/towers/tower.service';
import { ProgressionCircleComponent } from '../progression-circle/progression-circle.component';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type UpgradeDetails = {
  type: UpgradeType;
  icon: string;
  level: number;
  upgradeCost?: number;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Turret = {
  image: string;
  selected: boolean;
  imageIndex: number;
  type: WeaponType;
};

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

  public upgradeOptions: UpgradeDetails[] = [
    { type: UpgradeType.Speed, icon: './assets/speed.png', level: 1 },
    { type: UpgradeType.Damage, icon: './assets/power.png', level: 1 },
    { type: UpgradeType.Range, icon: './assets/range.png', level: 1 },
  ];

  public ngOnInit(): void {
    this.createTowerOptions();
  }

  public upgrade(option: UpgradeDetails): void {
    if (option.level <= 5) {
      option.level++;
      this.updateUpgradeOptions();
    }
  }

  public selectTurret(turret: Turret): void {
    this.turrets.forEach(t => (t.selected = false));
    turret.selected = true;

    this.updateUpgradeOptions();
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public buildTower(): void {
    const speedLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Speed)!.level;
    const powerLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Damage)!.level;
    const rangeLevel = this.upgradeOptions.find(option => option.type === UpgradeType.Range)!.level;

    const selectedTurret = this.turrets.find(turret => turret.selected);

    if (!selectedTurret) {
      return;
    }
    const selectedCell = this.gridService.selectedCell;

    if (selectedTurret.type === WeaponType.BulletShooter) {
      this.towerService.createBulletShooter(selectedCell!.x, selectedCell!.y, 0, speedLevel, powerLevel, rangeLevel);
    } else if (selectedTurret.type === WeaponType.RocketLauncher) {
      this.towerService.createRocketLauncher(selectedCell!.x, selectedCell!.y, 1, speedLevel, powerLevel, rangeLevel);
    } else if (selectedTurret.type === WeaponType.LaserTurret) {
      this.towerService.createLaserTurret(selectedCell!.x, selectedCell!.y, 4, speedLevel, powerLevel, rangeLevel);
    } else if (selectedTurret.type === WeaponType.NuclearLauncher) {
      this.towerService.createNuclearLauncher(selectedCell!.x, selectedCell!.y, 2, speedLevel, powerLevel, rangeLevel);
    }

    this.dialogRef.close();
  }

  private createTowerOptions(): void {
    this.turrets = [
      { type: WeaponType.BulletShooter, image: './assets/turrets/turret.png', selected: false, imageIndex: 0 },
      { type: WeaponType.RocketLauncher, image: './assets/turrets/rocket-launcher-basic.png', selected: false, imageIndex: 1 },
      { type: WeaponType.NuclearLauncher, image: './assets/turrets/nuclear-turret.png', selected: false, imageIndex: 2 },
      { type: WeaponType.MultiRocketLauncher, image: './assets/turrets/multi-rocket-launcher.png', selected: false, imageIndex: 3 },
      { type: WeaponType.LaserTurret, image: './assets/turrets/laser-shooter.png', selected: false, imageIndex: 4 },
    ];
  }

  private updateUpgradeOptions(): void {
    const selectedTurret = this.turrets.find(x => x.selected);
    const turretConfig = getTurretConfig(selectedTurret!.type);

    const currentSpeedStats = this.upgradeOptions.find(x => x.type === UpgradeType.Speed);
    const speedUpgradeOption = turretConfig.upgrades
      .find(x => x.type === UpgradeType.Speed)!
      .details.find(x => x.level === currentSpeedStats!.level + 1);

    currentSpeedStats!.upgradeCost = speedUpgradeOption?.cost;

    const currentDamageStats = this.upgradeOptions.find(x => x.type === UpgradeType.Damage);
    const damageUpgradeOption = turretConfig.upgrades
      .find(x => x.type === UpgradeType.Damage)!
      .details.find(x => x.level === currentDamageStats!.level + 1);

    currentDamageStats!.upgradeCost = damageUpgradeOption?.cost;

    const currentRangeStats = this.upgradeOptions.find(x => x.type === UpgradeType.Range);
    const rangeUpgradeOption = turretConfig.upgrades
      .find(x => x.type === UpgradeType.Range)!
      .details.find(x => x.level === currentRangeStats!.level + 1);

    currentRangeStats!.upgradeCost = rangeUpgradeOption?.cost;
  }

  // private updateUpgradeOptions(turretType: WeaponType): void {
  //   const turretConfig = getTurretConfig(turretType);

  //   this.upgradeOptions.find(x => x.type === UpgradeType.Speed)!.details = turretConfig.upgrades
  //     .find(x => x.type === UpgradeType.Speed)!
  //     .details.map(x => {
  //       return { level: x.level, cost: x.cost };
  //     });

  //   this.upgradeOptions.find(x => x.type === UpgradeType.Damage)!.details = turretConfig.upgrades
  //     .find(x => x.type === UpgradeType.Damage)!
  //     .details.map(x => {
  //       return { level: x.level, cost: x.cost };
  //     });

  //   this.upgradeOptions.find(x => x.type === UpgradeType.Range)!.details = turretConfig.upgrades
  //     .find(x => x.type === UpgradeType.Range)!
  //     .details.map(x => {
  //       return { level: x.level, cost: x.cost };
  //     });
  // }
}
