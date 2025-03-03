/* eslint-disable @typescript-eslint/consistent-type-definitions */
export enum WeaponType {
  Base = 'Base',

  RocketLauncher = 'RocketLauncher',
  BulletShooter = 'BulletShooter',
  NuclearLauncher = 'NuclearLauncher',
  MultiRocketLauncher = 'MultiRocketLauncher',
  LaserTurret = 'LaserTurret',
}

export type Weapon = {
  type: WeaponType;
  rangeLevel: number;
  powerLevel: number;
  speedLevel: number;

  damage: number;
  speed: number;
  range: number;

  gridX: number;
  gridY: number;

  focusedIndex: number;
  focusedIndexes: number[];

  locked: boolean;

  imageIndex: number;

  startx: number | null;
  starty: number | null;
  lastFired: number;
  angle: number;
};

export type RocketLauncher = Weapon & {
  type: WeaponType.RocketLauncher;
  canons: number[];
};

export type BulletShooter = Weapon & {
  type: WeaponType.BulletShooter;
};

export type NuclearLauncher = Weapon & {
  type: WeaponType.NuclearLauncher;
};

export type LaserTurret = Weapon & {
  type: WeaponType.LaserTurret;
  duration: number;
};

export function isRocketLauncher(weapon: Weapon): weapon is RocketLauncher {
  return weapon.type === WeaponType.RocketLauncher;
}

export function isBulletShooter(weapon: Weapon): weapon is BulletShooter {
  return weapon.type === WeaponType.BulletShooter;
}

export function isLaserTurret(weapon: Weapon): weapon is LaserTurret {
  return weapon.type === WeaponType.LaserTurret;
}

export function isNucleareLauncher(weapon: Weapon): weapon is NuclearLauncher {
  return weapon.type === WeaponType.NuclearLauncher;
}
