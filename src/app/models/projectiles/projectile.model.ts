/* eslint-disable @typescript-eslint/consistent-type-definitions */
export enum ProjectileType {
  Base = 'Base',
  Rocket = 'Rocket',
  Bullet = 'Bullet',
  Laser = 'Laser',
}

export type BaseProjectTile = {
  type: ProjectileType;
};

export type Rocket = BaseProjectTile & {
  type: ProjectileType.Rocket;
  gridY: number;
  gridX: number;
  x: number;
  y: number;
  enemyIndex: number;
  bulletIndex: number;
  angle: number;
  locked: boolean;
  needdraw: boolean;
  damage: number;
  plusrotation: boolean | null;
  steps: number;
};

export type Bullet = BaseProjectTile & {
  type: ProjectileType.Bullet;
  gridY: number;
  gridX: number;
  x: number;
  y: number;
  enemyIndex: number;
  bulletIndex: number;
  needdraw: boolean;
  damage: number;
  angle: number | null;
};

export type Laser = BaseProjectTile & {
  type: ProjectileType.Laser;
  gridY: number;
  gridX: number;
  x: number;
  y: number;
  enemyIndex: number;
  bulletIndex: number;
  needdraw: boolean;
  damage: number;
  angle: number | null;
  duration: number;
  laserParts: LaserPart[];
};

export type LaserPart = {
  x: number;
  y: number;
};

export type Projectile = Rocket | Bullet | Laser;
