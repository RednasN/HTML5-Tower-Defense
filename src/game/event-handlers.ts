import { Cell } from "../models/grid";

import { TwdCanvasState } from "./canvas-state";
import { GameLoop } from "./game-loop";
import { TowerDefenseGrid } from "./grid";
import { TwdMenu } from "./menu";

export class EventHandlers {
  private canvasState: TwdCanvasState;
  private twdGrid: TowerDefenseGrid;
  private gameLoop: GameLoop;
  private twdMenu: TwdMenu;

  private lastClicked: Date | null = null;
  private clickedCell: Cell | null = null;

  constructor(
    canvasState: TwdCanvasState,
    twdGrid: TowerDefenseGrid,
    gameLoop: GameLoop,
    twdMenu: TwdMenu,
  ) {
    this.canvasState = canvasState;
    this.twdGrid = twdGrid;
    this.gameLoop = gameLoop;
    this.twdMenu = twdMenu;
  }

  public closeBuildModal(): void {
    const modalBuildElement = document.getElementById("modal-build");
    if (modalBuildElement) {
      modalBuildElement.style.display = "none";
    }
  }

  private singleClick(): void {
    this.twdGrid.selectedCell = this.getClickedCell();
  }

  private getClickedCell(): Cell | null {
    for (let x = 0; x < this.twdGrid.grid.length; x++) {
      for (let y = 0; y < this.twdGrid.grid[x].length; y++) {
        var startx =
          this.twdGrid.grid[x][y].drawx + this.canvasState.mainCanvasXOffset;
        var starty =
          this.twdGrid.grid[x][y].drawy + this.canvasState.mainCanvasYOffset;

        if (
          this.canvasState.mainCanvasXCurrent > startx &&
          this.canvasState.mainCanvasXCurrent <
            startx + this.twdGrid.grid[x][y].width &&
          this.canvasState.mainCanvasYCurrent > starty &&
          this.canvasState.mainCanvasYCurrent <
            starty + this.twdGrid.grid[x][y].height
        ) {
          return this.twdGrid.grid[x][y];
        }
      }
    }
    return null;
  }

  public calculateUpgradeCosts(): void {
    const speedCostElement = document.getElementById("speedCost");
    const rangeCostElement = document.getElementById("rangeCost");
    const powerCostElement = document.getElementById("powerCost");

    if (!speedCostElement || !rangeCostElement || !powerCostElement) return;

    const speedValueElement = document.getElementById("speedvalue");
    const rangeValueElement = document.getElementById("rangevalue");
    const powerValueElement = document.getElementById("powervalue");

    if (!speedValueElement || !rangeValueElement || !powerValueElement) return;

    speedCostElement.innerHTML = Math.round(
      (parseInt(speedValueElement.innerHTML) + 1) *
        (this.twdMenu.towercost / 5),
    ).toString();
    rangeCostElement.innerHTML = Math.round(
      (parseInt(rangeValueElement.innerHTML) + 1) *
        (this.twdMenu.towercost / 5),
    ).toString();
    powerCostElement.innerHTML = Math.round(
      (parseInt(powerValueElement.innerHTML) + 1) *
        (this.twdMenu.towercost / 5),
    ).toString();

    if (parseInt(speedValueElement.innerHTML) != this.twdMenu.speedLevel) {
      this.twdMenu.speedLevel = parseInt(speedValueElement.innerHTML);
      this.twdMenu.towerSpeedCost +=
        (this.twdMenu.towercost / 5) * this.twdMenu.speedLevel;
    }

    if (parseInt(powerValueElement.innerHTML) != this.twdMenu.powerLevel) {
      this.twdMenu.powerLevel = parseInt(powerValueElement.innerHTML);
      this.twdMenu.towerPowerCost +=
        (this.twdMenu.towercost / 5) * this.twdMenu.powerLevel;
    }

    if (parseInt(rangeValueElement.innerHTML) != this.twdMenu.rangeLevel) {
      this.twdMenu.rangeLevel = parseInt(rangeValueElement.innerHTML);
      this.twdMenu.towerRangeCost +=
        (this.twdMenu.towercost / 5) * this.twdMenu.rangeLevel;
    }

    const totalCostElement = document.getElementById("totalcost");

    if (!totalCostElement) return;

    totalCostElement.innerHTML = (
      this.twdMenu.towercost +
      this.twdMenu.towerSpeedCost +
      this.twdMenu.towerPowerCost +
      this.twdMenu.towerRangeCost
    ).toString();
  }

  public minusSpeed(): void {
    const speedValueElement = document.getElementById("speedvalue");

    if (!speedValueElement) return;

    if (speedValueElement.innerHTML != "0") {
      speedValueElement.innerHTML = (
        parseInt(speedValueElement.innerHTML.trim(), 10) + 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public minusRange(): void {
    const rangeValueElement = document.getElementById("rangevalue");

    if (!rangeValueElement) return;

    if (rangeValueElement.innerHTML != "0") {
      rangeValueElement.innerHTML = (
        parseInt(rangeValueElement.innerHTML) - 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public minusPower(): void {
    const powerValueElement = document.getElementById("powervalue");

    if (!powerValueElement) return;

    if (powerValueElement.innerHTML != "0") {
      powerValueElement.innerHTML = (
        parseInt(powerValueElement.innerHTML) - 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public changeSpeed(): void {
    this.gameLoop.changeSpeed();

    const gamespeedImage = document.getElementById(
      "gamespeed",
    ) as HTMLImageElement;
    if (gamespeedImage)
      gamespeedImage.src =
        "./images/speed-level-" + this.gameLoop.speed + ".svg";
  }

  public changePause(): void {
    this.gameLoop.changePause();

    const gamestateImage = document.getElementById(
      "gamestate",
    ) as HTMLImageElement;
    if (gamestateImage)
      gamestateImage.src =
        "./images/" + (this.gameLoop.paused ? "pause.svg" : "play.svg");
  }

  public plusSpeed(): void {
    const speedValueElement = document.getElementById("speedvalue");

    if (!speedValueElement) return;

    if (speedValueElement.innerHTML != "9") {
      speedValueElement.innerHTML = (
        parseInt(speedValueElement.innerHTML) + 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public plusRange(): void {
    const rangeValueElement = document.getElementById("rangevalue");

    if (!rangeValueElement) return;

    if (rangeValueElement.innerHTML != "9") {
      rangeValueElement.innerHTML = (
        parseInt(rangeValueElement.innerHTML) + 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public plusPower(): void {
    const powerValueElement = document.getElementById("powervalue");

    if (!powerValueElement) return;

    if (powerValueElement.innerHTML != "9") {
      powerValueElement.innerHTML = (
        parseInt(powerValueElement.innerHTML) + 1
      ).toString();
      this.calculateUpgradeCosts();
    }
  }

  public buildTurret(): void {
    const modalBuildElement = document.getElementById("modal-build");
    if (modalBuildElement) {
      modalBuildElement.style.display = "none";
    }

    this.twdMenu.build();
  }

  public showBuild(): void {
    var nowClickedCell = this.twdGrid.selectedCell;

    if (nowClickedCell != null) {
      this.twdMenu.buildx = nowClickedCell.x;
      this.twdMenu.buildy = nowClickedCell.y;

      const speedValueElement = document.getElementById("speedvalue");
      if (speedValueElement) speedValueElement.innerHTML = "0";

      const rangeValueElement = document.getElementById("rangevalue");
      if (rangeValueElement) rangeValueElement.innerHTML = "0";

      const powerValueElement = document.getElementById("powervalue");
      if (powerValueElement) powerValueElement.innerHTML = "0";

      const totalCostElement = document.getElementById("totalcost");
      if (totalCostElement) totalCostElement.innerHTML = "0";

      this.twdMenu.towercost = 0;
      this.twdMenu.buildIndex = -1;

      this.calculateUpgradeCosts();

      const modalBuildElement = document.getElementById("modal-build");

      if (modalBuildElement) {
        modalBuildElement.style.display = "block";
      }
    }
  }

  public selectImage(e: Event): void {
    const target = e.currentTarget as HTMLElement; // Ensure type safety
    const towerIndex = target.getAttribute("index");
    const cost = target.getAttribute("cost");

    if (towerIndex && cost) {
      // Ensure attributes are not null
      this.twdMenu.towercost = parseInt(cost);
      this.twdMenu.buildIndex = parseInt(towerIndex);

      this.calculateUpgradeCosts();
    } else {
      console.error("Missing attributes on the clicked element.");
    }
  }
  public setupMainHandlers(): void {
    const selectImageElements = document.getElementsByClassName("selectImage");
    for (let i = 0; i < selectImageElements.length; i++) {
      selectImageElements[i].addEventListener("click", (e: Event) => {
        this.selectImage(e);
      });
    }

    const minPowerElements = document.getElementsByClassName("minPower");
    for (let i = 0; i < minPowerElements.length; i++) {
      minPowerElements[i].addEventListener("click", () => {
        this.minusPower();
      });
    }

    const minRangeElements = document.getElementsByClassName("minRange");
    for (let i = 0; i < minRangeElements.length; i++) {
      minRangeElements[i].addEventListener("click", () => {
        this.minusRange();
      });
    }

    const minSpeedElements = document.getElementsByClassName("minSpeed");
    for (let i = 0; i < minSpeedElements.length; i++) {
      minSpeedElements[i].addEventListener("click", () => {
        this.minusSpeed();
      });
    }

    const plusPowerElements = document.getElementsByClassName("plusPower");
    for (let i = 0; i < plusPowerElements.length; i++) {
      plusPowerElements[i].addEventListener("click", () => {
        this.plusPower();
      });
    }

    const plusRangeElements = document.getElementsByClassName("plusRange");
    for (let i = 0; i < plusRangeElements.length; i++) {
      plusRangeElements[i].addEventListener("click", () => {
        this.plusRange();
      });
    }

    const plusSpeedElements = document.getElementsByClassName("plusSpeed");
    for (let i = 0; i < plusSpeedElements.length; i++) {
      plusSpeedElements[i].addEventListener("click", () => {
        this.plusSpeed();
      });
    }

    const changeSpeedElements = document.getElementsByClassName("changeSpeed");
    for (let i = 0; i < changeSpeedElements.length; i++) {
      changeSpeedElements[i].addEventListener("click", () => {
        this.changeSpeed();
      });
    }

    const changePauseElements = document.getElementsByClassName("changePause");
    for (let i = 0; i < changePauseElements.length; i++) {
      changePauseElements[i].addEventListener("click", () => {
        this.changePause();
      });
    }

    const showBuildElements = document.getElementsByClassName("showBuild");
    for (let i = 0; i < showBuildElements.length; i++) {
      showBuildElements[i].addEventListener("click", () => {
        this.showBuild();
      });
    }

    const buildTurretElements = document.getElementsByClassName("buildTurret");
    for (let i = 0; i < buildTurretElements.length; i++) {
      buildTurretElements[i].addEventListener("click", () => {
        this.buildTurret();
      });
    }

    const closeBuildElements =
      document.getElementsByClassName("closeBuildModal");
    for (let i = 0; i < closeBuildElements.length; i++) {
      closeBuildElements[i].addEventListener("click", () => {
        this.closeBuildModal();
      });
    }

    //Get elements by class and attach click handlers
    document.getElementById("minusSpeed")?.addEventListener("click", () => {
      this.minusSpeed();
    });

    this.canvasState.mainCanvas.addEventListener("touchstart", (e) => {
      this.canvasState.mainCanvasYCurrent =
        e.targetTouches[0].pageY / this.canvasState.scaleToFit;
      this.canvasState.mainCanvasXCurrent =
        e.targetTouches[0].pageX / this.canvasState.scaleToFit;

      if (this.lastClicked != null) {
        var nowClicked = new Date();
        var diff = nowClicked.getTime() - this.lastClicked.getTime();

        if (diff < 300) {
          const nowClickedCell = this.getClickedCell();
          if (
            this.clickedCell !== null &&
            nowClickedCell !== null &&
            nowClickedCell.x == this.clickedCell.x &&
            this.clickedCell.y == nowClickedCell.y
          ) {
            this.twdMenu.buildx = nowClickedCell.x;
            this.twdMenu.buildy = nowClickedCell.y;

            const speedValueElement = document.getElementById("speedvalue");
            if (speedValueElement) speedValueElement.innerHTML = "0";

            const rangeValueElement = document.getElementById("rangevalue");
            if (rangeValueElement) rangeValueElement.innerHTML = "0";

            const powerValueElement = document.getElementById("powervalue");
            if (powerValueElement) powerValueElement.innerHTML = "0";

            const totalCostElement = document.getElementById("totalcost");
            if (totalCostElement) totalCostElement.innerHTML = "0";

            this.twdMenu.towercost = 0;
            this.twdMenu.buildIndex = -1;

            this.calculateUpgradeCosts();

            const modalBuildElement = document.getElementById("modal-build");

            if (modalBuildElement) {
              modalBuildElement.style.display = "block";
            }
          }
        }
      }

      this.clickedCell = this.getClickedCell();
      this.lastClicked = new Date();
      this.singleClick();

      this.twdMenu.checkMenuClick();

      e.preventDefault();
    });

    this.canvasState.mainCanvas.addEventListener("touchmove", (e) => {
      //mainCanvasYCurrent = e.targetTouches[0].pageY / scaleToFit;
      //mainCanvasXCurrent = e.targetTouches[0].pageX / scaleToFit;
      if (this.twdMenu.draggedTurret != null) {
        this.canvasState.mainCanvasYCurrent =
          e.targetTouches[0].pageY / this.canvasState.scaleToFit;
        this.canvasState.mainCanvasXCurrent =
          e.targetTouches[0].pageX / this.canvasState.scaleToFit;
      }

      if (this.twdMenu.draggedTurret == null) {
        var diffY =
          e.targetTouches[0].pageY / this.canvasState.scaleToFit -
          this.canvasState.mainCanvasYCurrent;
        this.canvasState.mainCanvasYCurrent += diffY;
        this.canvasState.mainCanvasYOffset += diffY;

        var diffX =
          e.targetTouches[0].pageX / this.canvasState.scaleToFit -
          this.canvasState.mainCanvasXCurrent;
        this.canvasState.mainCanvasXCurrent += diffX;
        this.canvasState.mainCanvasXOffset += diffX;

        this.canvasState.mainCanvasYOffset = Math.floor(
          this.canvasState.mainCanvasYOffset,
        );
        this.canvasState.mainCanvasXOffset = Math.floor(
          this.canvasState.mainCanvasXOffset,
        );
      }

      e.preventDefault();
    });

    this.canvasState.mainCanvas.addEventListener("touchend", (e) => {
      this.twdMenu.drop();
      e.preventDefault();
      return true;
    });
  }
}
