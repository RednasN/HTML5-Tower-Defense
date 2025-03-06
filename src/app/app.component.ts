import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, expand, take, timer } from 'rxjs';

import { BuildTowerDialogComponent } from './components/build-tower-dialog/build-tower-dialog.component';
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import { EnemyService } from './services/enemies/enemy.service';
import { GameLoopService } from './services/game/game-loop.service';
import { GameStateService } from './services/game/game-state.service';
import { GridService } from './services/game/grid.service';
import { ImageService } from './services/game/image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameCanvasComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'TowerDefense';

  private readonly imageService = inject(ImageService);
  private readonly gridService = inject(GridService);
  private readonly gameLoopService = inject(GameLoopService);
  private readonly enemyService = inject(EnemyService);
  private readonly dialog = inject(MatDialog);

  private readonly gameState = inject(GameStateService);

  public ngOnInit(): void {
    this.imageService
      .setupTowers()
      .then(() => this.imageService.setupEnemies())
      .then(() => this.imageService.setupBullets())
      .then(() => this.imageService.setupAssets())
      .then(() => this.imageService.setupGridImages())
      .then(() => this.imageService.setupExplosions())
      .then(() => {
        this.gridService.setupLevelOne();

        console.log('Images loaded');
        this.gameLoopService.start();

        timer(0)
          .pipe(
            expand(() => timer(getRandomInterval()).pipe(take(1))),
            take(1000)
          )
          .subscribe(() => {
            this.enemyService.createEnemyTank(10, 1, 0);
          });

        function getRandomInterval(): number {
          return Math.floor(Math.random() * (1500 - 200 + 1)) + 200;
        }
      });
  }

  public togglePause(): void {
    this.gameLoopService.changePause();
  }

  public changeSpeed(): void {
    this.gameLoopService.changeSpeed();
  }

  public get speed(): number {
    return this.gameLoopService.speed;
  }

  public get paused(): boolean {
    return this.gameLoopService.paused;
  }

  public get money$(): Observable<number> {
    return this.gameState.moneyChanged$;
  }

  public buildTower(): void {
    this.dialog.open(BuildTowerDialogComponent, {
      panelClass: 'create-tower-dialog',
    });
  }
}
