import { TwdCanvasState } from '../canvas-state';
import { GameLoop } from '../game-loop';
import { TowerDefenseGrid } from '../grid';

export abstract class Weapon {
  public rangeLevel: number;
  public powerLevel: number;
  public speedLevel: number;

  protected gridX: number;
  protected gridY: number;

  protected focusedIndex: number;
  protected focusedIndexes: number[];

  protected locked: boolean = false;

  protected imageIndex: number;
  protected range: number;
  protected speed: number;
  protected damage: number;

  protected startx: number | null;
  protected starty: number | null;
  private lastFired: number;
  protected angle: number = 0;

  protected twdGrid: TowerDefenseGrid;
  protected twdGameLoop: GameLoop;

  protected canvasState: TwdCanvasState;

  constructor(canvasState: TwdCanvasState, twdGrid: TowerDefenseGrid, twdGameLoop: GameLoop, x: number, y: number, imageIndex: number) {
    this.twdGrid = twdGrid;
    this.twdGameLoop = twdGameLoop;
    this.canvasState = canvasState;

    this.gridX = x;
    this.gridY = y;
    this.imageIndex = imageIndex;

    this.range = 0;
    this.speed = 0;
    this.damage = 0;

    this.focusedIndex = -1;
    this.focusedIndexes = [];

    this.rangeLevel = 0;
    this.powerLevel = 0;
    this.speedLevel = 0;

    this.startx = null;
    this.starty = null;

    this.lastFired = 0;
  }

  abstract shoot(): void;
  abstract draw(): void;

  public canShoot(): void {
    this.lastFired += this.twdGameLoop.delta * 1000;

    if (this.focusedIndex != -1) {
      if (this.lastFired > this.speed - this.speedLevel * 10 * (this.speed / 100)) {
        this.shoot();
        this.lastFired = 0;
      }
    }
  }

  public findClosests() {
    if (this.focusedIndexes.length == 0) {
      for (let i = 0; i < this.twdGrid.enemies.length; i++) {
        if (this.isInRange(i)) {
          this.focusedIndexes.push(i);
        }
      }
    }
  }

  public calculate(): void {
    this.startx = this.twdGrid.grid[this.gridX][this.gridY].drawx + this.canvasState.mainCanvasXOffset;
    this.starty = this.twdGrid.grid[this.gridX][this.gridY].drawy + this.canvasState.mainCanvasYOffset;

    this.findClosest();

    if (this.focusedIndex != -1 && !this.isInRange(this.focusedIndex)) {
      this.focusedIndex = -1;
      this.locked = false;
    }

    if (this.focusedIndex != -1) {
      const cellHeight = this.twdGrid.grid[this.gridX][this.gridY].height / 2;
      const cellWidth = this.twdGrid.grid[this.gridX][this.gridY].width / 2;

      const enemeyCenterX = this.twdGrid.enemies[this.focusedIndex].drawx + this.canvasState.mainCanvasXOffset + cellWidth;
      const enemeyCenterY = this.twdGrid.enemies[this.focusedIndex].drawy + this.canvasState.mainCanvasYOffset + cellHeight;

      const turretCenterX = this.startx + cellWidth;
      const turretCenterY = this.starty + cellHeight;

      const deltaX = turretCenterX - enemeyCenterX;
      const deltaY = turretCenterY - enemeyCenterY;

      const rad = Math.atan2(deltaY, deltaX);

      const angleDest = Math.round((rad * 180) / Math.PI + 180);

      if (!this.locked) {
        let diff = angleDest - this.angle;
        if (diff < 0) {
          diff += 360;
        }
        if (diff > 180) {
          this.angle += -(100 * this.twdGameLoop.delta);

          if (this.angle < 0) {
            this.angle = 359;
          }
        } else {
          this.angle += 100 * this.twdGameLoop.delta;
          if (this.angle > 359) {
            this.angle = 0;
          }
        }
      } else {
        this.angle = angleDest;
        if (this.angle > 359) {
          this.angle = 0;
        }

        if (this.angle < 0) {
          this.angle = 359;
        }
      }

      if (Math.abs(angleDest - this.angle) < 5) {
        this.locked = true;
      }

      if (this.locked) {
        this.canShoot();
      }
    }
  }

  public findClosest() {
    if (this.focusedIndex == -1) {
      let shortestRoute = -1;
      let shortestIndex = -1;

      for (let i = 0; i < this.twdGrid.enemies.length; i++) {
        if (this.isInRange(i)) {
          if (shortestRoute == -1 && shortestIndex == -1) {
            shortestRoute = this.twdGrid.enemies[i].routeindex;
            shortestIndex = i;
          }

          if (this.twdGrid.enemies[i].routeindex < shortestIndex) {
            shortestRoute = this.twdGrid.enemies[i].routeindex;
            shortestIndex = i;
          }
        }
      }

      if (shortestIndex != -1) {
        this.focusedIndex = shortestIndex;
      }
    }
  }

  public isInRange(i: number): boolean {
    if (this.twdGrid.enemies[i].lives <= 0) {
      return false;
    }

    const startx = this.twdGrid.grid[this.gridX][this.gridY].drawx + this.canvasState.mainCanvasXOffset;
    const starty = this.twdGrid.grid[this.gridX][this.gridY].drawy + this.canvasState.mainCanvasYOffset;

    const cellWidth = this.twdGrid.grid[this.gridX][this.gridY].width / 2;
    const cellHeight = this.twdGrid.grid[this.gridX][this.gridY].height / 2;

    const x0 = startx + cellWidth;
    const y0 = starty + cellHeight;

    const x1 = this.twdGrid.enemies[i].drawx + this.canvasState.mainCanvasXOffset + cellWidth;
    const y1 = this.twdGrid.enemies[i].drawy + this.canvasState.mainCanvasYOffset + cellHeight;

    if (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < this.range + (this.range / 100) * this.rangeLevel * 10) {
      //initiate.
      return true;
    }

    return false;
  }
}
