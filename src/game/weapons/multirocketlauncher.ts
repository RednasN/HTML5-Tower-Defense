import { TwdCanvasState } from "../canvas-state";
import { GameLoop } from "../game-loop";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";
import { MultiRocket } from "../projectiles/multirocket";
import { Weapon } from "./weapon";

export class MultiRocketLauncher extends Weapon {    

    private canons: number[] = [];

    private maxFixedAngleTime: number;
    private minFixedAngleTime: number;

    private minShootingDelay: number;
    private maxShootingDelay: number;

    private twdImages: TowerDefenseImages;

    constructor(twdImages: TowerDefenseImages, canvasState: TwdCanvasState, twdGrid: TowerDefenseGrid, twdGameLoop: GameLoop, x: number, y: number, imageIndex: number)
    {
        super(canvasState, twdGrid, twdGameLoop, x, y, imageIndex);

        this.twdImages = twdImages;
        this.twdGrid = twdGrid;
      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
      //Default values for rocketlauncher
      this.range = 1000;
      this.damage = 1;
      this.speed = 1000;    
      this.maxFixedAngleTime = 1000;
      this.minFixedAngleTime = 0;

      this.minShootingDelay = 0;
      this.maxShootingDelay = 1000;

      this.canons = [0,-40,40];
    }

    public draw(): void {
        this.twdGrid.render(this.twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx!, this.starty!);
    }

    public shoot(): void {
        this.findClosests();

        for(var i = 0;i < 50; i++)
        {
            var angleTIme = this.randomIntFromInterval(this.minFixedAngleTime, this.maxFixedAngleTime);
            var shootingDelay = this.randomIntFromInterval(this.minShootingDelay, this.maxShootingDelay);

            var randomFocusedIndex = Math.floor(Math.random()*this.focusedIndexes.length);
            var angleLoop = this.canons[Math.floor(Math.random()*this.canons.length)];            
            
            var totalAngle = angleLoop + this.angle;

            if(totalAngle > 359)
            {
                angleLoop = Math.abs(359 - totalAngle);
                totalAngle = angleLoop;
            }

            if(totalAngle < 0)
            {
                angleLoop = Math.abs(0 - totalAngle);
                totalAngle = angleLoop;
            }

            
            this.twdGrid.bullets.push(new MultiRocket(this.twdGameLoop, this.canvasState, this.twdImages, this.twdGrid, this.gridX, this.gridY, this.focusedIndexes[randomFocusedIndex], 1, totalAngle, this.damage, angleTIme, shootingDelay));
        }

        this.focusedIndexes = [];    
    }

    private randomIntFromInterval(min: number,max: number) : number
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}
