/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type EnemyTank = {
  drawx: number;
  drawy: number;

  routeindex: number;
  lives: number;

  reward: number;
  imageIndex: number;
  curveStartx: number | null;
  curveStarty: number | null;
  curveEndx: number | null;
  curveEndy: number | null;
  bezierx: number | null;
  beziery: number | null;
  t: number;
  angle: number;
  died: boolean;

  isRight: boolean;
  speed: number;
  docurve: boolean;
};
