/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { WeaponType } from '../weapons/weapon.model';

export enum UpgradeType {
  Range = 'range',
  Damage = 'damage',
  Speed = 'speed',
}

export type UpgradeLevelDetails = {
  level: number;
  cost: number;
  value: number;
};

export type UpgradeDetails = {
  type: UpgradeType;
  details: UpgradeLevelDetails[];
};

export type TurretConfig = {
  cost: number;
  type: WeaponType;
  upgrades: UpgradeDetails[];
};

export enum EnemyType {
  Basic = 'basic',
  FastAndWeak = 'fastAndWeak',
  SlowAndStrong = 'slowAndStrong',
  Boss = 'boss',
}

export type EnemyConfig = {
  type: EnemyType;
  health: number;
  speed: number;
  reward: number;
};

export const basicEnemyConfig: EnemyConfig = {
  type: EnemyType.Basic,
  health: 100,
  speed: 250,
  reward: 10,
};

export const rocketLauncherConfig: TurretConfig = {
  type: WeaponType.RocketLauncher,
  cost: 25,
  upgrades: [
    {
      type: UpgradeType.Range,
      details: [
        { level: 1, cost: 10, value: 150 },
        { level: 2, cost: 20, value: 175 },
        { level: 3, cost: 30, value: 200 },
        { level: 4, cost: 40, value: 225 },
        { level: 5, cost: 50, value: 250 },
      ],
    },
    {
      type: UpgradeType.Damage,
      details: [
        { level: 1, cost: 10, value: 1 },
        { level: 2, cost: 20, value: 2 },
        { level: 3, cost: 30, value: 3 },
        { level: 4, cost: 40, value: 4 },
        { level: 5, cost: 50, value: 5 },
      ],
    },
    {
      type: UpgradeType.Speed,
      details: [
        { level: 1, cost: 10, value: 1500 },
        { level: 2, cost: 20, value: 1400 },
        { level: 3, cost: 30, value: 1300 },
        { level: 4, cost: 40, value: 1250 },
        { level: 5, cost: 50, value: 200 },
      ],
    },
  ],
};

export const bulletShooterConfig: TurretConfig = {
  type: WeaponType.BulletShooter,
  cost: 25,
  upgrades: [
    {
      type: UpgradeType.Range,
      details: [
        { level: 1, cost: 10, value: 150 },
        { level: 2, cost: 20, value: 175 },
        { level: 3, cost: 30, value: 200 },
        { level: 4, cost: 40, value: 225 },
        { level: 5, cost: 50, value: 250 },
      ],
    },
    {
      type: UpgradeType.Damage,
      details: [
        { level: 1, cost: 10, value: 1 },
        { level: 2, cost: 20, value: 2 },
        { level: 3, cost: 30, value: 3 },
        { level: 4, cost: 40, value: 4 },
        { level: 5, cost: 50, value: 5 },
      ],
    },
    {
      type: UpgradeType.Speed,
      details: [
        { level: 1, cost: 10, value: 2000 },
        { level: 2, cost: 20, value: 1750 },
        { level: 3, cost: 30, value: 1500 },
        { level: 4, cost: 40, value: 1250 },
        { level: 5, cost: 50, value: 1000 },
      ],
    },
  ],
};

export const laserTurretConfig: TurretConfig = {
  type: WeaponType.LaserTurret,
  cost: 25,
  upgrades: [
    {
      type: UpgradeType.Range,
      details: [
        { level: 1, cost: 10, value: 150 },
        { level: 2, cost: 20, value: 175 },
        { level: 3, cost: 30, value: 200 },
        { level: 4, cost: 40, value: 225 },
        { level: 5, cost: 50, value: 250 },
      ],
    },
    {
      type: UpgradeType.Damage,
      details: [
        { level: 1, cost: 10, value: 1 },
        { level: 2, cost: 20, value: 2 },
        { level: 3, cost: 30, value: 3 },
        { level: 4, cost: 40, value: 4 },
        { level: 5, cost: 50, value: 5 },
      ],
    },
    {
      type: UpgradeType.Speed,
      details: [
        { level: 1, cost: 10, value: 2000 },
        { level: 2, cost: 20, value: 1750 },
        { level: 3, cost: 30, value: 1500 },
        { level: 4, cost: 40, value: 1250 },
        { level: 5, cost: 50, value: 1000 },
      ],
    },
  ],
};

export const slowRocketLauncherConfig: TurretConfig = {
  type: WeaponType.SlowRocketLauncher,
  cost: 25,
  upgrades: [
    {
      type: UpgradeType.Range,
      details: [
        { level: 1, cost: 10, value: 300 },
        { level: 2, cost: 20, value: 350 },
        { level: 3, cost: 30, value: 400 },
        { level: 4, cost: 40, value: 450 },
        { level: 5, cost: 50, value: 500 },
      ],
    },
    {
      type: UpgradeType.Damage,
      details: [
        { level: 1, cost: 10, value: 1 },
        { level: 2, cost: 20, value: 2 },
        { level: 3, cost: 30, value: 3 },
        { level: 4, cost: 40, value: 4 },
        { level: 5, cost: 50, value: 5 },
      ],
    },
    {
      type: UpgradeType.Speed,
      details: [
        { level: 1, cost: 10, value: 2000 },
        { level: 2, cost: 20, value: 1750 },
        { level: 3, cost: 30, value: 1500 },
        { level: 4, cost: 40, value: 1300 },
        { level: 5, cost: 50, value: 1200 },
      ],
    },
  ],
};

export const nuclearLauncherConfig: TurretConfig = {
  type: WeaponType.NuclearLauncher,
  cost: 25,
  upgrades: [
    {
      type: UpgradeType.Range,
      details: [
        { level: 1, cost: 10, value: 150 },
        { level: 2, cost: 20, value: 175 },
        { level: 3, cost: 30, value: 200 },
        { level: 4, cost: 40, value: 225 },
        { level: 5, cost: 50, value: 250 },
      ],
    },
    {
      type: UpgradeType.Damage,
      details: [
        { level: 1, cost: 10, value: 1 },
        { level: 2, cost: 20, value: 2 },
        { level: 3, cost: 30, value: 3 },
        { level: 4, cost: 40, value: 4 },
        { level: 5, cost: 50, value: 5 },
      ],
    },
    {
      type: UpgradeType.Speed,
      details: [
        { level: 1, cost: 10, value: 2000 },
        { level: 2, cost: 20, value: 1750 },
        { level: 3, cost: 30, value: 1500 },
        { level: 4, cost: 40, value: 1250 },
        { level: 5, cost: 50, value: 1000 },
      ],
    },
  ],
};

export function getTurretConfig(type: WeaponType): TurretConfig {
  switch (type) {
    case WeaponType.BulletShooter:
      return bulletShooterConfig;
    case WeaponType.RocketLauncher:
      return rocketLauncherConfig;
    case WeaponType.LaserTurret:
      return laserTurretConfig;
    case WeaponType.NuclearLauncher:
      return nuclearLauncherConfig;
    case WeaponType.SlowRocketLauncher:
      return slowRocketLauncherConfig;
    default:
      throw new Error('Invalid turret type');
  }
}
