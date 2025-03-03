import { Injectable, inject } from '@angular/core';

import { EnemyTank } from '../../models/enemies/enemy-tank.model';
import { ExplosionService } from '../explosions/explosion.service';
import { CanvasService } from '../game/canvas.service';
import { ImageService } from '../game/image.service';

import { EnemyTankService } from './enemy-tank.service';

@Injectable({
  providedIn: 'root',
})
export class EnemyService {
  private readonly canvasService = inject(CanvasService);
  private readonly imageService = inject(ImageService);

  private readonly enemyTankService = inject(EnemyTankService);
  private readonly explosionService = inject(ExplosionService);

  public enemies: EnemyTank[] = [];

  public createEnemyTank(reward: number, lives: number, imageIndex: number): void {
    const enemyTank = this.enemyTankService.create(reward, lives, imageIndex);
    this.enemies.push(enemyTank);
  }

  public calculate(): void {
    this.enemies.forEach(enemy => {
      this.enemyTankService.calculate(enemy);
    });
  }

  public draw(): void {
    this.enemies.forEach(enemy => {
      if (enemy.lives <= 0) {
        if (!enemy.died) {
          this.explosionService.createDefaultExplosion(enemy.drawx, enemy.drawy, 0);
          enemy.died = true;
        }

        return;
      }

      this.canvasService.draw(
        this.imageService.enemies[enemy.imageIndex].images[enemy.angle],
        Math.round(enemy.drawx) + this.canvasService.mainCanvasXOffset,
        Math.round(enemy.drawy) + this.canvasService.mainCanvasYOffset
      );
    });
  }

  public hit(enemyIndex: number, hit: number): void {
    this.enemyTankService.hit(this.enemies[enemyIndex], hit);
  }
}
