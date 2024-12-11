import { TwdCanvasState } from './game/canvas-state';
import { EnemyTank } from './game/enemies/enemytank';
import { EventHandlers } from './game/event-handlers';
import { GameLoop } from './game/game-loop';
import { TowerDefenseGrid } from './game/grid';
import { TowerDefenseImages } from './game/images';
import { TwdMenu } from './game/menu';
import './style.css'

const canvasState = new TwdCanvasState();

window.onresize = function () {
  calculateSize();
};

window.onload = async function () {
  canvasState.mainCanvas = document.getElementById('towerDefenseView') as HTMLCanvasElement;
  canvasState.mainCtx = canvasState.mainCanvas.getContext("2d") as CanvasRenderingContext2D;

  calculateSize();

  const twdImages = new TowerDefenseImages();

  await Promise.all([
    twdImages.setupTowers(),
    twdImages.setupEnemies(),
    twdImages.setupBullets(),
    twdImages.setupAssets(),
    twdImages.setupGridImages(),
    twdImages.setupExplosions()
  ]);

  const twdGrid = new TowerDefenseGrid(twdImages, canvasState); 
  const twdGameLoop = new GameLoop(twdGrid, canvasState);


  const twdMenu = new TwdMenu(twdGameLoop, canvasState, twdImages, twdGrid); 
  const eventHandlers = new EventHandlers(canvasState, twdGrid, twdGameLoop, twdMenu);

  eventHandlers.setupMainHandlers();

  twdGrid.setupLevelOne();

  setTimeout(function () {
      console.log(twdGameLoop);
      twdGameLoop.start();

      interval(function(){

                  const tank = new EnemyTank(twdImages, canvasState, twdGrid, twdGameLoop, 0, 150, 0);
                  tank.init();
                  twdGrid.enemies.push(tank);
              }, 1000,5);  
        
              interval(function(){
                  
                  document.getElementById("pocket")!.innerHTML = twdGrid.money.toString();            
                   
              }, 1500, 999); 
  }, 0);  
}


function calculateSize() {
  const theWidth= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const theHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
  canvasState.mainCanvas.width = theWidth / canvasState.drawScale;
  canvasState.mainCanvas.height = theHeight  / canvasState.drawScale;
  
  const scaleX = theWidth / canvasState.mainCanvas.width;
  const scaleY = theHeight / canvasState.mainCanvas.height;

  canvasState.scaleToFit = Math.max(scaleX, scaleY);

  canvasState.mainCanvas.style.transformOrigin = '0 0';
  canvasState.mainCanvas.style.transform = 'scale(' + (canvasState.scaleToFit )+ ')';
}

function interval(func: () => void, wait: number, times?: number): void {
  const interv = (function (w: number, t?: number): () => void {
    return function (): void {
      if (typeof t === "undefined" || t-- > 0) {
        setTimeout(interv, w);
        try {
          func.call(null);
        } catch (e) {
          t = 0;
          throw new Error(e instanceof Error ? e.message : "");
        }
      }
    };
  })(wait, times);

  setTimeout(interv, wait);
}