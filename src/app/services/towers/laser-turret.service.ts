import { Injectable, inject } from '@angular/core';

import { LaserTurret, WeaponType } from '../../models/weapons/weapon.model';
import { EnemyService } from '../enemies/enemy.service';
import { CanvasService } from '../game/canvas.service';
import { GridService } from '../game/grid.service';
import { LaserService } from '../projectiles/laser.service';
import { ProjectileService } from '../projectiles/projectile.service';

import { TurretConfigService } from './turret-config.service';
import { WeaponService } from './weapon.service';

@Injectable({
  providedIn: 'root',
})
export class LaserTurretService extends WeaponService {
  private readonly projectileService = inject(ProjectileService);
  private readonly laserService = inject(LaserService);

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
  ): LaserTurret {
    const baseWeapon = super.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);

    const weapon: LaserTurret = {
      ...baseWeapon,
      duration: 1000,
      type: WeaponType.LaserTurret,
      angle: Math.floor(Math.random() * 360),
    };

    this.setStats(weapon);

    return weapon;
  }

  public shoot(weapon: LaserTurret): void {
    if (this.projectileService.projectiles.length === 0) {
      const laser = this.laserService.create(weapon.gridX, weapon.gridY, weapon.focusedIndex, 3, weapon.damage);
      this.projectileService.addProjectile(laser);
    }
  }
}
