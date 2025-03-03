import { Injectable, inject } from '@angular/core';

import { Weapon, isBulletShooter, isLaserTurret, isNucleareLauncher, isRocketLauncher } from '../../models/weapons/weapon.model';
import { CanvasService } from '../game/canvas.service';
import { ImageService } from '../game/image.service';

import { BasicTurretService } from './basic-turret.service';
import { LaserTurretService } from './laser-turret.service';
import { NuclearLauncherService } from './nuclear-launcher.service';
import { RocketLauncherService } from './rocket-launcher.service';

@Injectable({
  providedIn: 'root',
})
export class TowerService {
  private readonly canvasService = inject(CanvasService);
  private readonly imageService = inject(ImageService);

  private readonly basicTurretService = inject(BasicTurretService);
  private readonly rocketLauncherService = inject(RocketLauncherService);
  private readonly laserTurretService = inject(LaserTurretService);
  private readonly nuclearlauncherService = inject(NuclearLauncherService);

  private weapons: Weapon[] = [];

  public createBulletShooter(x: number, y: number, imageIndex: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const basicTurret = this.basicTurretService.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(basicTurret);
  }

  public createNuclearLauncher(x: number, y: number, imageIndex: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const nuclearlauncher = this.nuclearlauncherService.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(nuclearlauncher);
  }

  public createRocketLauncher(x: number, y: number, imageIndex: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const rocketLauncher = this.rocketLauncherService.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(rocketLauncher);
  }

  public createLaserTurret(x: number, y: number, imageIndex: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const laserTurret = this.laserTurretService.create(x, y, imageIndex, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(laserTurret);
  }

  public calculate(): void {
    this.weapons.forEach(weapon => {
      if (isRocketLauncher(weapon)) {
        this.rocketLauncherService.calculate(weapon);
      } else if (isBulletShooter(weapon)) {
        this.basicTurretService.calculate(weapon);
      } else if (isLaserTurret(weapon)) {
        this.laserTurretService.calculate(weapon);
      } else if (isNucleareLauncher(weapon)) {
        this.nuclearlauncherService.calculate(weapon);
      }
    });
  }

  public draw(): void {
    this.weapons.forEach(weapon => {
      try {
        this.canvasService.draw(
          this.imageService.towers[weapon.imageIndex].images[Math.round(weapon.angle)],
          weapon.startx!,
          weapon.starty!
        );
      } catch (err) {
        console.log('Error!', err);
      }
    });
  }
}
