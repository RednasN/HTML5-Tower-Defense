import { TwdCanvasState } from "../canvas-state";
import { GameLoop } from "../game-loop";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";

export class Rocket {

    private gridY: number;
    private gridX: number;
    private x: number;
    private y: number;
    private enemyIndex: number;
    private bulletIndex: number;
    private angle: number;
    private locked: boolean;
    private needdraw: boolean;
    private damage: number;
    private plusrotation: boolean | null;

    private twdGrid: TowerDefenseGrid;
    private twdImages: TowerDefenseImages;
    private canvasState: TwdCanvasState;
    private twdGameLoop: GameLoop;   

    private steps: number;    

    constructor(gameLoop: GameLoop, canvasState: TwdCanvasState, twdImages: TowerDefenseImages, twdGrid: TowerDefenseGrid, x: number, y: number, enemyIndex: number, bulletIndex: number, angle: number, damage: number) {
        this.twdGrid = twdGrid;
        this.twdImages = twdImages;
        this.canvasState = canvasState;
        this.twdGameLoop = gameLoop;    
        
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
    
        this.plusrotation = null;
    
    
        var cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;
        var cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;
    
        var centerTurretX = twdGrid.grid[this.gridX][this.gridY].drawx + cellWidth;
        var centerTurretY = twdGrid.grid[this.gridX][this.gridY].drawy + cellWidth;
    
        this.x = centerTurretX;
        this.y = centerTurretY;
        this.x += 20 * Math.cos(this.angle * Math.PI / 180);
        this.y += 20 * Math.sin(this.angle * Math.PI / 180);
    
        this.steps = 0;    
    }

    public draw(): void
    {
        if(this.needdraw)
        {
            try
            {
                //console.log(this.angle);
                this.twdGrid.render(this.twdImages.bullets[this.bulletIndex].images[Math.round(this.angle)], Math.floor(this.x) + this.canvasState.mainCanvasXOffset - 25, Math.floor(this.y) + this.canvasState.mainCanvasYOffset - 25);
            }
            catch(err)
            {
                console.log("Error!");
            }
        }
    }

    public calculate(): void 
    {
        if(this.needdraw)
        {
            var centerEnemyX = this.twdGrid.enemies[this.enemyIndex].drawx + 25;
            var centerEnemyY = this.twdGrid.enemies[this.enemyIndex].drawy + 25;

            var deltaX =  (this.x) - centerEnemyX;
            var deltaY =  (this.y) - centerEnemyY;

            var rad = Math.atan2(deltaY, deltaX); // In radians
            var angle = Math.round(rad * 180 /  Math.PI + 180);

            if(!this.locked)
            {
                if(this.plusrotation == null)
                {
                    var stepsRight = 0;
                    var rightThisAngle = this.angle;

                    while(rightThisAngle != angle)
                    {
                        rightThisAngle++;
                        stepsRight++;

                        if(rightThisAngle > 360)
                        {
                            rightThisAngle = 0;
                        }
                    }

                    if(stepsRight > 180)
                    {
                        this.plusrotation = false;
                    }
                    else
                    {
                        this.plusrotation = true;
                    }
                }

                else
                {
                    this.steps++;

                    if(this.steps > 359)
                    {
                        this.plusrotation = !this.plusrotation;
                        this.steps = 0;
                    }
                }

                if(this.plusrotation)
                {
                    this.angle += (175 * this.twdGameLoop.delta);
                } 

                if(!this.plusrotation)
                
                {
                    this.angle += -(175 * this.twdGameLoop.delta);
                }        

                if (Math.abs(angle - this.angle) < 5) 
                {
                    this.locked = true;
                }
            }

            else
            {
                this.angle = angle;
            }

            if(this.angle > 359)
            {
                this.angle = 0;
            }

            if(this.angle < 0)
            {
                this.angle = 359;
            }

            
            var speed = 150;

            if(this.locked)
            {
                speed = 250;
            }

            this.x += (this.twdGameLoop.delta * speed) * Math.cos(this.angle * Math.PI / 180);
            this.y += (this.twdGameLoop.delta * speed) * Math.sin(this.angle * Math.PI / 180);

            if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
                this.needdraw = false;

                this.twdGrid.enemies[this.enemyIndex].hit(this.damage);
            }        
        }
    }
}