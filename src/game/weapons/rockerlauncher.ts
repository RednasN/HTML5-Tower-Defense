import { TwdCanvasState } from "../canvas-state";
import { GameLoop } from "../game-loop";
import { TowerDefenseGrid } from "../grid";
import { TowerDefenseImages } from "../images";
import { Rocket } from "../projectiles/rocket";
import { Weapon } from "./weapon";

export class RocketLauncher extends Weapon {    

    private twdImages: TowerDefenseImages;
    private canons: number[] = [];

    constructor(twdImages: TowerDefenseImages, canvasState: TwdCanvasState, twdGrid: TowerDefenseGrid, twdGameLoop: GameLoop, x: number, y: number, imageIndex: number)
    {
      super(canvasState, twdGrid, twdGameLoop, x, y, imageIndex);
      this.twdImages = twdImages;

      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
      this.range = 200;
      this.damage = 10;
      this.speed = 2000;    

      this.canons = [0, 90, 180, 270];
    }

    public draw(): void {
        this.twdGrid.render(this.twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx!, this.starty!);
    }

    shoot() {
        var angle = this.canons[Math.floor(Math.random()*this.canons.length)];        
        this.twdGrid.bullets.push(new Rocket(this.twdGameLoop, this.canvasState, this.twdImages, this.twdGrid, this.gridX, this.gridY, this.focusedIndex, 1, angle, this.damage));
    }

    calculate() {      

      this.startx = this.twdGrid.grid[this.gridX][this.gridY].drawx + this.canvasState.mainCanvasXOffset;
      this.starty = this.twdGrid.grid[this.gridX][this.gridY].drawy + this.canvasState.mainCanvasYOffset;

      this.angle += 35 * this.twdGameLoop.delta;
      if(this.angle > 359)
      {
        this.angle = 0;
      }

      for(var i = 0; i < this.canons.length; i++)
      {
          this.canons[i]++;
          if(this.canons[i] == 359)
          {
              this.canons[i] = 0;
          }
      }

      this.findClosest();

      if(this.focusedIndex != -1 && !this.isInRange(this.focusedIndex))
      {
          this.focusedIndex = -1;
      }

      this.canShoot();
    }
}
