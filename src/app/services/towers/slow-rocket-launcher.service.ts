import { Injectable, inject } from '@angular/core';

import { BulletShooter, WeaponType } from '../../models/weapons/weapon.model';
import { EnemyService } from '../enemies/enemy.service';
import { CanvasService } from '../game/canvas.service';
import { GridService } from '../game/grid.service';
import { ProjectileService } from '../projectiles/projectile.service';
import { SlowRocketService } from '../projectiles/slow-rocket.service';

import { TurretConfigService } from './turret-config.service';
import { WeaponService } from './weapon.service';

@Injectable({
  providedIn: 'root',
})
export class BasicTurretService extends WeaponService {
  private readonly projectileService = inject(ProjectileService);
  private readonly slowRocketService = inject(SlowRocketService);

  constructor(
    gridService: GridService,
    canvasService: CanvasService,
    enemyService: EnemyService,
    turretConfigService: TurretConfigService
  ) {
    super(gridService, canvasService, enemyService, turretConfigService);
  }

  public override create(
    x: number,
    y: number,
    imageIndex: number,
    speedLevel: number,
    powerLevel: number,
    rangeLevel: number
  ): BulletShooter {
    const baseWeapon = super.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);

    const weapon: BulletShooter = {
      ...baseWeapon,
      type: WeaponType.BulletShooter, // Explicitly set the specific type
      angle: Math.floor(Math.random() * 360),
    };

    this.setStats(weapon);

    return weapon;
  }

  public shoot(weapon: BulletShooter): void {
    const bullet = this.slowRocketService.create(weapon.gridX, weapon.gridY, weapon.focusedIndex, 0, 0, weapon.damage);
    this.projectileService.addProjectile(bullet);
  }
}
