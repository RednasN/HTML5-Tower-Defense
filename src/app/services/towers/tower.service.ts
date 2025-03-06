import { Injectable, inject } from '@angular/core';

import {
  Weapon,
  WeaponType,
  isBulletShooter,
  isLaserTurret,
  isNucleareLauncher,
  isRocketLauncher,
  isSlowRocketLauncher,
} from '../../models/weapons/weapon.model';
import { CanvasService } from '../game/canvas.service';
import { ImageService } from '../game/image.service';

import { BasicTurretService } from './basic-turret.service';
import { LaserTurretService } from './laser-turret.service';
import { NuclearLauncherService } from './nuclear-launcher.service';
import { RocketLauncherService } from './rocket-launcher.service';
import { SlowRocketLauncherService } from './slow-rocket-launcher.service';

@Injectable({
  providedIn: 'root',
})
export class TowerService {
  private readonly canvasService = inject(CanvasService);
  private readonly imageService = inject(ImageService);

  private readonly basicTurretService = inject(BasicTurretService);
  private readonly rocketLauncherService = inject(RocketLauncherService);
  private readonly laserTurretService = inject(LaserTurretService);
  private readonly slowRocketLauncherService = inject(SlowRocketLauncherService);
  private readonly nuclearlauncherService = inject(NuclearLauncherService);

  private weapons: Weapon[] = [];

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
      } else if (isSlowRocketLauncher(weapon)) {
        this.slowRocketLauncherService.calculate(weapon);
      }
    });
  }

  public draw(): void {
    this.weapons.forEach(weapon => {
      try {
        this.canvasService.draw(this.imageService.towers[weapon.type][Math.round(weapon.angle)], weapon.startx!, weapon.starty!);
      } catch (err) {
        console.log('Error!', err);
      }
    });
  }

  public createTower(type: WeaponType, x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    switch (type) {
      case WeaponType.BulletShooter:
        this.createBulletShooter(x, y, speedLevel, powerLevel, rangeLevel);
        break;
      case WeaponType.RocketLauncher:
        this.createRocketLauncher(x, y, speedLevel, powerLevel, rangeLevel);
        break;
      case WeaponType.LaserTurret:
        this.createLaserTurret(x, y, speedLevel, powerLevel, rangeLevel);
        break;
      case WeaponType.NuclearLauncher:
        this.createNuclearLauncher(x, y, speedLevel, powerLevel, rangeLevel);
        break;
      case WeaponType.SlowRocketLauncher:
        this.createSlowRocketLauncher(x, y, speedLevel, powerLevel, rangeLevel);
        break;
      default:
        throw new Error('Invalid turret type');
    }
  }

  private createBulletShooter(x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const basicTurret = this.basicTurretService.create(x, y, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(basicTurret);
  }

  private createNuclearLauncher(x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const nuclearlauncher = this.nuclearlauncherService.create(x, y, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(nuclearlauncher);
  }

  private createRocketLauncher(x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const rocketLauncher = this.rocketLauncherService.create(x, y, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(rocketLauncher);
  }

  private createLaserTurret(x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const laserTurret = this.laserTurretService.create(x, y, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(laserTurret);
  }

  private createSlowRocketLauncher(x: number, y: number, speedLevel: number, powerLevel: number, rangeLevel: number): void {
    const laserTurret = this.slowRocketLauncherService.create(x, y, speedLevel, powerLevel, rangeLevel);
    this.weapons.push(laserTurret);
  }
}
