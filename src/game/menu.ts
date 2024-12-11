import { DraggedTurret } from '../models/dragged-turret';
import { SideMenuCell } from '../models/side-menu-cell';

import { TwdCanvasState } from './canvas-state';
import { GameLoop } from './game-loop';
import { TowerDefenseGrid } from './grid';
import { TowerDefenseImages } from './images';
import { MultiRocketLauncher } from './weapons/multirocketlauncher';
import { NuclearLauncher } from './weapons/nuclearlauncher';
import { RocketLauncher } from './weapons/rockerlauncher';
import { Turret } from './weapons/turret';

export class TwdMenu {
  public speedLevel = 1;
  public powerLevel = 1;
  public rangeLevel = 1;

  public towercost = 0;
  public towerSpeedCost = 0;
  public towerPowerCost = 0;
  public towerRangeCost = 0;

  public buildx = -1;
  public buildy = -1;

  public buildIndex = -1;

  public draggedTurret: DraggedTurret | null = null;

  private canvasState: TwdCanvasState;
  private twdImages: TowerDefenseImages;
  private twdGrid: TowerDefenseGrid;
  private twdGameLoop: GameLoop;

  private verticalObjects: number = 0;
  private sideMenu: SideMenuCell[] = [];

  private startIndex = 0;

  constructor(twdGameLoop: GameLoop, canvasState: TwdCanvasState, twdImages: TowerDefenseImages, twdGrid: TowerDefenseGrid) {
    this.canvasState = canvasState;
    this.twdImages = twdImages;
    this.twdGrid = twdGrid;
    this.twdGameLoop = twdGameLoop;
  }

  public drop(): void {
    if (this.draggedTurret != null) {
      for (let x = 0; x < this.twdGrid.grid.length; x++) {
        for (let y = 0; y < this.twdGrid.grid[x].length; y++) {
          const startx = this.twdGrid.grid[x][y].drawx + this.canvasState.mainCanvasXOffset;
          const starty = this.twdGrid.grid[x][y].drawy + this.canvasState.mainCanvasYOffset;

          if (
            this.canvasState.mainCanvasXCurrent > startx &&
            this.canvasState.mainCanvasXCurrent < startx + this.twdGrid.grid[x][y].width &&
            this.canvasState.mainCanvasYCurrent > starty &&
            this.canvasState.mainCanvasYCurrent < starty + this.twdGrid.grid[x][y].height
          ) {
            if (this.draggedTurret.turretIndex == 0) {
              const turret = new Turret(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, x, y, 0);
              this.twdGrid.turrets[x][y] = turret;
            }

            if (this.draggedTurret.turretIndex == 1) {
              const turret = new RocketLauncher(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, x, y, 1);
              this.twdGrid.turrets[x][y] = turret;
            }
          }
        }
      }
      this.draggedTurret = null;
    }
  }

  public checkMenuClick(): void {
    if (this.canvasState.mainCanvasXCurrent > this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width) {
      for (let x = 0; x < this.sideMenu.length; x++) {
        if (
          this.canvasState.mainCanvasXCurrent > this.sideMenu[x].drawx &&
          this.canvasState.mainCanvasXCurrent < this.sideMenu[x].drawx + this.twdImages.imgBlackTransparent!.width &&
          this.canvasState.mainCanvasYCurrent > this.sideMenu[x].drawy &&
          this.canvasState.mainCanvasYCurrent < this.sideMenu[x].drawy + this.twdImages.imgBlackTransparent!.height
        ) {
          if (this.sideMenu[x].towerIndex != -1) {
            this.draggedTurret = {
              turretIndex: this.sideMenu[x].towerIndex,
              drawx: this.canvasState.mainCanvasXCurrent,
              drawy: this.canvasState.mainCanvasYCurrent,
              height: this.twdImages.imgBlackTransparent!.height,
              width: this.twdImages.imgBlackTransparent!.width,
              dropped: false
            };
          }

          if (this.verticalObjects < this.twdImages.towers.length) {
            if (this.sideMenu[x].action == 'up' && this.startIndex > 0) {
              this.startIndex--;
            }

            if (this.sideMenu[x].action == 'down' && this.startIndex + this.verticalObjects < this.twdImages.towers.length) {
              this.startIndex++;
            }
          }
        }
      }
    }
  }

  public build(): void {
    let turret = null;
    if (this.buildIndex == 0) {
      turret = new Turret(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, this.buildx, this.buildy, 0);
    }

    if (this.buildIndex == 1) {
      turret = new RocketLauncher(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, this.buildx, this.buildy, 1);
    }

    if (this.buildIndex == 2) {
      turret = new NuclearLauncher(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, this.buildx, this.buildy, 2);
    }

    if (this.buildIndex == 3) {
      turret = new MultiRocketLauncher(this.twdImages, this.canvasState, this.twdGrid, this.twdGameLoop, this.buildx, this.buildy, 3);
    }

    if (turret != null) {
      turret.rangeLevel = this.rangeLevel;
      turret.powerLevel = this.powerLevel;
      turret.speedLevel = this.speedLevel;
      this.twdGrid.turrets[this.buildx][this.buildy] = turret;
    }

    //Reset build
    this.buildx = -1;
    this.buildy = -1;
    this.buildIndex = -1;
  }

  public draw(): void {
    const fitVerticalCount = Math.floor(this.canvasState.mainCanvas.height / this.twdImages.imgBlackTransparent!.height);
    let startSideMenuY = Math.round(
      (this.canvasState.mainCanvas.height - fitVerticalCount * this.twdImages.imgBlackTransparent!.height) / 2
    );

    this.verticalObjects = fitVerticalCount - 2;

    this.sideMenu = [];

    let towerIndex = 0;
    for (let i = 0; i < fitVerticalCount; i++) {
      this.canvasState.mainCtx.drawImage(
        this.twdImages.imgBlackTransparent!,
        this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
        startSideMenuY
      );

      if (i == 0) {
        const cell = {
          x: 0,
          y: i,
          drawx: this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
          drawy: startSideMenuY,
          towerIndex: -1,
          action: 'up',
          cellHeight: this.twdImages.imgBlackTransparent!.height,
          cellWidth: this.twdImages.imgBlackTransparent!.width
        };

        this.sideMenu.push(cell);
      }

      if (i == fitVerticalCount - 1) {
        const cell = {
          x: 0,
          y: i,
          drawx: this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
          drawy: startSideMenuY,
          towerIndex: -1,
          action: 'down',
          cellHeight: this.twdImages.imgBlackTransparent!.height,
          cellWidth: this.twdImages.imgBlackTransparent!.width
        };
        this.sideMenu.push(cell);
      }

      if (i != 0 && i != fitVerticalCount - 1) {
        if (towerIndex + this.startIndex < this.twdImages.towers.length) {
          this.canvasState.mainCtx.drawImage(
            this.twdImages.towers[towerIndex + this.startIndex].images[0],
            this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
            startSideMenuY
          );

          const cell = {
            x: 0,
            y: i,
            towerIndex: towerIndex + this.startIndex,
            drawx: this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
            drawy: startSideMenuY,
            action: 'defense',
            cellHeight: this.twdImages!.imgBlackTransparent!.height,
            cellWidth: this.twdImages.imgBlackTransparent!.width
          };

          this.sideMenu.push(cell);

          towerIndex++;
        } else {
          const cell = {
            x: 0,
            y: i,
            towerIndex: -1,
            drawx: this.canvasState.mainCanvas.width - this.twdImages.imgBlackTransparent!.width,
            drawy: startSideMenuY,
            action: 'empty',
            cellHeight: this.twdImages.imgBlackTransparent!.height,
            cellWidth: this.twdImages.imgBlackTransparent!.width
          };

          this.sideMenu.push(cell);
        }
      }

      startSideMenuY += this.twdImages.imgBlackTransparent!.height;
    }

    if (this.draggedTurret != null) {
      this.canvasState.mainCtx.drawImage(
        this.twdImages.towers[this.draggedTurret.turretIndex].images[0],
        this.canvasState.mainCanvasXCurrent - this.twdImages.imgBlackTransparent!.width / 2,
        this.canvasState.mainCanvasYCurrent - this.twdImages.imgBlackTransparent!.height / 2
      );
    }
  }
}
