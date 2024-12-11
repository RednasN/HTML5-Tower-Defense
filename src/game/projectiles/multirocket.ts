import { TwdCanvasState } from '../canvas-state';
import { GameLoop } from '../game-loop';
import { TowerDefenseGrid } from '../grid';
import { TowerDefenseImages } from '../images';

import { Projectile } from './projectile';

export class MultiRocket extends Projectile {
  public gridX: number;
  public gridY: number;
  public x: number;
  public y: number;
  public enemyIndex: number;
  public bulletIndex: number;
  public angle: number;
  public locked: boolean;
  public needdraw: boolean;
  public damage: number;
  public fixedangletime: number;
  public shootingDelay: number;
  public plusrotation: boolean | null;
  public steps: number;

  private twdGrid: TowerDefenseGrid;
  private twdImages: TowerDefenseImages;
  private canvasState: TwdCanvasState;
  private gameLoop: GameLoop;

  constructor(
    gameLoop: GameLoop,
    canvasState: TwdCanvasState,
    twdImages: TowerDefenseImages,
    twdGrid: TowerDefenseGrid,
    x: number,
    y: number,
    enemyIndex: number,
    bulletIndex: number,
    angle: number,
    damage: number,
    fixedangletime: number,
    shootingdelay: number
  ) {
    super();

    this.twdGrid = twdGrid;
    this.twdImages = twdImages;
    this.canvasState = canvasState;
    this.gameLoop = gameLoop;

    this.gridY = y;
    this.gridX = x;
    this.x = 0;
    this.y = 0;
    this.enemyIndex = enemyIndex;
    this.bulletIndex = bulletIndex;
    this.angle = angle;
    this.locked = false;
    this.needdraw = true;
    this.damage = damage;
    this.fixedangletime = fixedangletime;
    this.shootingDelay = shootingdelay;

    this.plusrotation = null;

    const cellHeight = this.twdGrid.grid[this.gridX][this.gridY].height / 2;
    const cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;

    const centerTurretX = twdGrid.grid[this.gridX][this.gridY].drawx + cellWidth;
    const centerTurretY = twdGrid.grid[this.gridX][this.gridY].drawy + cellHeight;

    this.x = centerTurretX;
    this.y = centerTurretY;
    this.x += 20 * Math.cos((this.angle * Math.PI) / 180);
    this.y += 20 * Math.sin((this.angle * Math.PI) / 180);

    this.steps = 0;
  }

  public draw(): void {
    if (this.needdraw && this.shootingDelay < 0) {
      try {
        //console.log(this.angle);
        this.twdGrid.render(
          this.twdImages.bullets[this.bulletIndex].images[Math.round(this.angle)],
          Math.floor(this.x) + this.canvasState.mainCanvasXOffset - 25,
          Math.floor(this.y) + this.canvasState.mainCanvasYOffset - 25
        );
      } catch (err) {
        console.log('Error!', err);
      }
    }
  }

  public calculate() {
    this.shootingDelay -= this.gameLoop.delta * 1000;

    if (this.needdraw && this.shootingDelay < 0) {
      const centerEnemyX = this.twdGrid.enemies[this.enemyIndex].drawx + 25;
      const centerEnemyY = this.twdGrid.enemies[this.enemyIndex].drawy + 25;

      const deltaX = this.x - centerEnemyX;
      const deltaY = this.y - centerEnemyY;

      const rad = Math.atan2(deltaY, deltaX); // In radians
      const angle = Math.round((rad * 180) / Math.PI + 180);

      this.fixedangletime -= this.gameLoop.delta * 1000;

      if (!this.locked && this.fixedangletime < 0) {
        if (this.plusrotation == null) {
          let stepsRight = 0;
          let rightThisAngle = this.angle;

          while (rightThisAngle != angle) {
            rightThisAngle++;
            stepsRight++;

            if (rightThisAngle > 360) {
              rightThisAngle = 0;
            }
          }

          if (stepsRight > 180) {
            this.plusrotation = false;
          } else {
            this.plusrotation = true;
          }
        } else {
          this.steps++;

          if (this.steps > 359) {
            this.plusrotation = !this.plusrotation;
            this.steps = 0;
          }
        }

        if (this.plusrotation) {
          this.angle += 175 * this.gameLoop.delta;
        }

        if (!this.plusrotation) {
          this.angle += -(175 * this.gameLoop.delta);
        }

        if (Math.abs(angle - this.angle) < 5) {
          this.locked = true;
        }
      } else {
        if (this.fixedangletime < 0) {
          this.angle = angle;
        }
      }

      if (this.angle > 359) {
        this.angle = 0;
      }

      if (this.angle < 0) {
        this.angle = 359;
      }

      let speed = 150;

      if (this.locked) {
        speed = 250;
      }

      this.x += this.gameLoop.delta * speed * Math.cos((this.angle * Math.PI) / 180);
      this.y += this.gameLoop.delta * speed * Math.sin((this.angle * Math.PI) / 180);

      if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
        this.needdraw = false;

        //Hit.
        this.twdGrid.enemies[this.enemyIndex].hit(this.damage);
      }
    }
  }
}
