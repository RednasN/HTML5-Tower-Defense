import { TwdCanvasState } from "../canvas-state";
import { GameLoop } from "../game-loop";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";
import { Explosion } from "../side-effects/explosion";

export class NuclearBullet {
    private gridY: number;
    private gridX: number;
    private x: number;
    private y: number;
    private enemyIndex: number;
    private firstTime: boolean;
    private bulletIndex: number;
    private needdraw: boolean;
    private damage: number;
    private angle: number | null;

    private twdGrid: TowerDefenseGrid;
    private twdImages: TowerDefenseImages;
    private canvasState: TwdCanvasState;
    private gameLoop: GameLoop;
    

    constructor(gameLoop: GameLoop, canvasState: TwdCanvasState, twdImages: TowerDefenseImages, twdGrid: TowerDefenseGrid, x: number, y: number, enemyIndex: number, bulletIndex: number, damage: number) {
        this.twdGrid = twdGrid;
        this.twdImages = twdImages;
        this.canvasState = canvasState;
        this.gameLoop = gameLoop;

        this.gridY = y;
        this.gridX = x;
        this.x = 0;
        this.y = 0;
        this.enemyIndex = enemyIndex;
        this.firstTime = true;
        this.bulletIndex = bulletIndex;
    
        this.needdraw = true;
    
        this.damage = damage;
    
        const cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;
        const cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;
    
        const centerTurretX = twdGrid.grid[this.gridX][this.gridY].drawx + cellWidth;
        const centerTurretY = twdGrid.grid[this.gridX][this.gridY].drawy + cellWidth;
    
        const centerEnemyX = twdGrid.enemies[this.enemyIndex].drawx + cellWidth;
        const centerEnemyY = twdGrid.enemies[this.enemyIndex].drawy + cellWidth;
    
        const deltaX = centerTurretX - centerEnemyX;
        const deltaY = centerTurretY - centerEnemyY;
    
        const rad = Math.atan2(deltaY, deltaX); // In radians    
    
        this.x = centerTurretX - 25  * Math.cos(rad);
        this.y = centerTurretY - 25  * Math.sin(rad);
        this.angle = null;
    }

    public draw(): void {
        if (this.needdraw) {
            this.twdGrid.render(this.twdImages.bullets[this.bulletIndex].images[this.angle!], this.x + this.canvasState.mainCanvasXOffset - 25, this.y + this.canvasState.mainCanvasYOffset - 25);

        }
    }

    public calculate(): void {
      if (this.needdraw) {

          var centerEnemyX = this.twdGrid.enemies[this.enemyIndex].drawx + 25;
          var centerEnemyY = this.twdGrid.enemies[this.enemyIndex].drawy + 25;

          var deltaX = (this.x) - centerEnemyX;
          var deltaY = (this.y) - centerEnemyY;

          var rad = Math.atan2(deltaY, deltaX); // In radians
          this.angle = Math.round(rad * 180 /  Math.PI + 180);

		  if(this.angle == 360)
		  {
			  this.angle = 359;
		  }

          this.x = this.x - (200 * this.gameLoop.delta) * Math.cos(rad);
          this.y = this.y - (200 * this.gameLoop.delta) * Math.sin(rad);
 
          if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
              this.needdraw = false;

              var routeIndex = this.twdGrid.enemies[this.enemyIndex].routeindex;

              var explosionx = this.twdGrid.route[routeIndex].drawx;
              var explosiony = this.twdGrid.route[routeIndex].drawy;

              this.twdGrid.explosions.push(new Explosion(this.canvasState, this.twdImages, this.twdGrid, explosionx, explosiony, 1));

              var routeLength = this.twdGrid.route;

              var startRouteIndexPlus = routeIndex - 1;
              var startRouteIndexMinus = routeIndex + 1;

              for (let i = 0; i < 6; i++) { 
                  if(startRouteIndexPlus < routeLength.length && startRouteIndexPlus > 0)
                  {
                      var explosionx = this.twdGrid.route[startRouteIndexPlus].drawx;
                      var explosiony = this.twdGrid.route[startRouteIndexPlus].drawy;
                      this.twdGrid.explosions.push(new Explosion(this.canvasState, this.twdImages, this.twdGrid, explosionx, explosiony, 1));
                  }

                  if(startRouteIndexMinus >= 0 && routeLength.length > 0) 
                  {
                      var explosionx = this.twdGrid.route[startRouteIndexMinus].drawx;
                      var explosiony = this.twdGrid.route[startRouteIndexMinus].drawy;
                      this.twdGrid.explosions.push(new Explosion(this.canvasState, this.twdImages, this.twdGrid, explosionx, explosiony, 1));
                  }

                  startRouteIndexPlus++;
                  startRouteIndexMinus--;

              }
          }
      }
    }
}