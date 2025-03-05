import { Injectable, inject } from '@angular/core';

import { Projectile, ProjectileType } from '../../models/projectiles/projectile.model';
import { CanvasService } from '../game/canvas.service';
import { GridService } from '../game/grid.service';
import { ImageService } from '../game/image.service';

import { LaserService } from './laser.service';
import { RocketService } from './rocket.service';
import { TurretBulletService } from './turret-bullet.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectileService {
  private readonly canvasService = inject(CanvasService);
  private readonly gridService = inject(GridService);
  private readonly imageService = inject(ImageService);

  private readonly rocketService = inject(RocketService);
  private readonly laserService = inject(LaserService);
  private readonly turretBulletService = inject(TurretBulletService);

  public projectiles: Projectile[] = [];

  public addProjectile(projectile: Projectile): void {
    this.projectiles.push(projectile);
  }

  public calculate(): void {
    this.projectiles.forEach(projectile => {
      if (projectile.type === ProjectileType.Rocket) {
        this.rocketService.calculate(projectile);
      }

      if (
        projectile.type === ProjectileType.Bullet ||
        projectile.type === ProjectileType.SlowRocket ||
        projectile.type === ProjectileType.NuclearBullet
      ) {
        this.turretBulletService.calculate(projectile);
      }

      if (projectile.type === ProjectileType.Laser) {
        this.laserService.calculate(projectile);
      }
    });
  }

  public draw(): void {
    this.projectiles.forEach(projectile => {
      if (projectile.needdraw) {
        try {
          const image = this.imageService.bullets[projectile.type][Math.floor(projectile.angle ?? 0)];

          switch (projectile.type) {
            case ProjectileType.Laser: {
              for (const laserPart of projectile.laserParts) {
                this.canvasService.draw(
                  image,
                  laserPart.x + this.canvasService.mainCanvasXOffset,
                  laserPart.y + this.canvasService.mainCanvasYOffset
                );
              }
              break;
            }

            default: {
              this.canvasService.draw(
                image,
                projectile.x + this.canvasService.mainCanvasXOffset - 25,
                projectile.y + this.canvasService.mainCanvasYOffset - 25
              );

              break;
            }
          }
        } catch (err) {
          console.log('Error!', err);
        }
      }
    });
  }
}
