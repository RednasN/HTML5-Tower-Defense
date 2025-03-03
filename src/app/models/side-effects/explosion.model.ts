/* eslint-disable @typescript-eslint/consistent-type-definitions */
export enum ExplosionType {
  Base = 'Base',

  Default = 'Default',
}

export type Explosion = {
  type: ExplosionType;
  explosionLength: number;
  ticsPerFrame: number;
  currentTick: number;
  explosionIndex: number;
  explosionListIndex: number;
  drawx: number;
  drawy: number;
};

export type DefaultExplosion = Explosion & {
  type: ExplosionType.Default;
};

export function isDefaultExplosion(weapon: Explosion): weapon is DefaultExplosion {
  return weapon.type === ExplosionType.Default;
}
