import { TwdCanvasState } from './../canvas-state';
import { TowerDefenseGrid } from './../grid';
import { GameLoop } from "../game-loop";
import { Weapon } from "./weapon";
import { TowerDefenseImages } from '../images';
import { TurretBullet } from '../projectiles/turretbullet';

export class Turret extends Weapon {

    private twdImages: TowerDefenseImages;

    constructor(twdImages: TowerDefenseImages, canvasState: TwdCanvasState, twdGrid: TowerDefenseGrid, twdGameLoop: GameLoop, x: number, y: number, imageIndex: number)
    {
        super(canvasState, twdGrid, twdGameLoop, x, y, imageIndex);

        this.twdImages = twdImages;
        this.twdGrid = twdGrid;
        this.twdGameLoop = twdGameLoop;

        this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);

        this.range = 200;
        this.damage = 10;
        this.speed = 2000; 

        this.locked = false;
    }

    public shoot(): void {
        this.twdGrid.bullets.push(new TurretBullet(this.twdGameLoop, this.canvasState, this.twdImages, this.twdGrid, this.gridX, this.gridY, this.focusedIndex, 0, this.damage));
    }

    public draw(): void {
        this.twdGrid.render(this.twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx!, this.starty!);
    }
}
