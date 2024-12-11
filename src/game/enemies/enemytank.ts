import { TwdCanvasState } from '../canvas-state';
import { GameLoop } from '../game-loop';
import { TowerDefenseGrid } from '../grid';
import { TowerDefenseImages } from '../images';
import { Explosion } from '../side-effects/explosion';

export class EnemyTank {
  public drawx: number;
  public drawy: number;

  public routeindex: number;
  public lives: number;

  private reward: number;
  private imageIndex: number;
  private curveStartx: number | null;
  private curveStarty: number | null;
  private curveEndx: number | null;
  private curveEndy: number | null;
  private bezierx: number | null;
  private beziery: number | null;
  private t: number;
  private angle: number;
  private died: boolean;

  private isRight: boolean;
  private speed: number;
  private docurve: boolean;

  private twdGrid: TowerDefenseGrid;
  private twdImages: TowerDefenseImages;
  private twdGameLoop: GameLoop;
  private canvasState: TwdCanvasState;

  constructor(
    twdImages: TowerDefenseImages,
    canvasState: TwdCanvasState,
    twdGrid: TowerDefenseGrid,
    twdGameLoop: GameLoop,
    reward: number,
    lives: number,
    imageIndex: number
  ) {
    this.twdGameLoop = twdGameLoop;
    this.twdGrid = twdGrid;
    this.twdImages = twdImages;
    this.canvasState = canvasState;

    this.reward = reward;
    this.drawx = -1;
    this.drawy = -1;
    this.routeindex = -1;
    this.imageIndex = imageIndex;

    this.curveStartx = null;
    this.curveStarty = null;

    this.curveEndx = null;
    this.curveEndy = null;

    this.bezierx = null;
    this.beziery = null;
    this.t = 0.0;

    this.angle = 0;

    this.died = false;

    this.lives = lives;

    this.isRight = true;

    this.speed = 100;

    this.docurve = false;
  }

  public init(): void {
    //console.log(twdGrid.route);
    this.routeindex = this.twdGrid.route.length - 1;
    this.drawx = this.twdGrid.route[this.routeindex].drawx;
    this.drawy = this.twdGrid.route[this.routeindex].drawy;

    //console.log(twdImages.enemies[this.imageIndex].images[1]);
  }

  public hit(hit: number) {
    //console.log(hit);
    if (this.lives >= 0) {
      this.lives += -hit;

      if (this.lives < 0) {
        this.twdGrid.money += this.reward;
      }
    }
  }

  public draw(): void {
    if (this.lives <= 0) {
      if (!this.died) {
        this.twdGrid.explosions.push(new Explosion(this.canvasState, this.twdImages, this.twdGrid, this.drawx, this.drawy, 0));
        this.died = true;
      }

      return;
    }

    this.twdGrid.render(
      this.twdImages.enemies[this.imageIndex].images[this.angle],
      Math.round(this.drawx) + this.canvasState.mainCanvasXOffset,
      Math.round(this.drawy) + this.canvasState.mainCanvasYOffset
    );
  }

  public calculate(): void {
    if (this.lives <= 0) {
      return;
    }

    const oldDrawx = this.drawx;
    const oldDrawy = this.drawy;

    if (
      Math.abs(this.drawx - this.twdGrid.route[this.routeindex].drawx) < 5 &&
      Math.abs(this.twdGrid.route[this.routeindex].drawy - this.drawy) < 5
    ) {
      if (this.routeindex != 0) {
        this.routeindex += -1;
      }

      if (this.routeindex - 1 >= 0) {
        if (
          this.twdGrid.route[this.routeindex - 1].y != this.twdGrid.route[this.routeindex + 1].y &&
          this.twdGrid.route[this.routeindex - 1].x != this.twdGrid.route[this.routeindex + 1].x
        ) {
          this.docurve = true;
          this.isRight = true;
          this.curveStartx = this.twdGrid.route[this.routeindex + 1].drawx;
          this.curveStarty = this.twdGrid.route[this.routeindex + 1].drawy;

          this.curveEndx = this.twdGrid.route[this.routeindex - 1].drawx;
          this.curveEndy = this.twdGrid.route[this.routeindex - 1].drawy;

          this.bezierx = this.twdGrid.route[this.routeindex].drawx;
          this.beziery = this.twdGrid.route[this.routeindex].drawy;

          const startx = this.twdGrid.route[this.routeindex + 1].x;
          const starty = this.twdGrid.route[this.routeindex + 1].y;

          const endx = this.twdGrid.route[this.routeindex - 1].x;
          const endy = this.twdGrid.route[this.routeindex - 1].y;

          const bezierx = this.twdGrid.route[this.routeindex].x;
          const beziery = this.twdGrid.route[this.routeindex].y;

          if (startx > endx && starty > endy && starty > beziery && startx == bezierx) {
            this.isRight = false;
          }

          if (startx < endx && starty < endy && starty < beziery && startx == bezierx) {
            this.isRight = false;
          }

          if (startx < endx && starty > endy && starty > beziery && startx == bezierx) {
            this.isRight = false;
          }

          if (startx > endx && starty < endy && starty < beziery && startx == bezierx) {
            this.isRight = false;
          }
        }
      }
    }

    if (this.docurve) {
      this.drawx = Math.round(
        (1 - this.t) * (1 - this.t) * this.curveStartx! + 2 * (1 - this.t) * this.t * this.bezierx! + this.t * this.t * this.curveEndx!
      );
      this.drawy = Math.round(
        (1 - this.t) * (1 - this.t) * this.curveStarty! + 2 * (1 - this.t) * this.t * this.beziery! + this.t * this.t * this.curveEndy!
      );

      this.t += (this.speed / 100) * this.twdGameLoop.delta;
      if (this.t > 1) {
        this.routeindex += -1;
        this.docurve = false;
        this.t = 0;
      }

      let deltaX = 0;
      let deltaY = 0;

      if (this.isRight) {
        deltaX = this.drawx - this.bezierx!;
        deltaY = this.drawy - this.beziery!;
      } else {
        deltaX = this.bezierx! - this.drawx;
        deltaY = this.beziery! - this.drawy;
      }

      const rad = Math.atan2(deltaY, deltaX); // In radians
      this.angle = Math.round((rad * 180) / Math.PI + 180);

      this.angle = 360 - this.angle;
      if (this.angle > 359) {
        this.angle = 0;
      }

      if (this.angle < 0) {
        this.angle = 359;
      }
    }
    if (!this.docurve) {
      if (
        this.drawx + this.canvasState.mainCanvasXOffset >
        this.twdGrid.route[this.routeindex].drawx + this.canvasState.mainCanvasXOffset
      ) {
        this.drawx += -this.speed * this.twdGameLoop.delta;
      }

      if (
        this.drawx + this.canvasState.mainCanvasXOffset <
        this.twdGrid.route[this.routeindex].drawx + this.canvasState.mainCanvasXOffset
      ) {
        this.drawx += this.speed * this.twdGameLoop.delta;
      }

      if (
        this.drawy + this.canvasState.mainCanvasYOffset >
        this.twdGrid.route[this.routeindex].drawy + this.canvasState.mainCanvasYOffset
      ) {
        this.drawy += -this.speed * this.twdGameLoop.delta;
      }

      if (
        this.drawy + this.canvasState.mainCanvasYOffset <
        this.twdGrid.route[this.routeindex].drawy + this.canvasState.mainCanvasYOffset
      ) {
        this.drawy += this.speed * this.twdGameLoop.delta;
      }

      const deltaX = oldDrawx - this.drawx;
      const deltaY = oldDrawy - this.drawy;

      const rad = Math.atan2(deltaY, deltaX); // In radians
      this.angle = Math.round((rad * 180) / Math.PI + 180);
      if (this.angle > 359) {
        this.angle = 0;
      }

      if (this.angle < 0) {
        this.angle = 359;
      }
    }
  }
}
