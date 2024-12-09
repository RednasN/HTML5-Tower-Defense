import { TwdCanvasState } from './game/canvas-state';
import { EventHandlers } from './game/event-handlers';
import { GameLoop } from './game/game-loop';
import { TowerDefenseGrid } from './game/grid';
import { TowerDefenseImages } from './game/images';
import { TwdMenu } from './game/menu';
import './style.css'

const canvasState = new TwdCanvasState();

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
  }, 0);  
}


function calculateSize() {
  var theWidth= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var theHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
  canvasState.mainCanvas.width = theWidth / canvasState.drawScale;
  canvasState.mainCanvas.height = theHeight  / canvasState.drawScale;
  
  var scaleX = theWidth / canvasState.mainCanvas.width;
  var scaleY = theHeight / canvasState.mainCanvas.height;

  canvasState.scaleToFit = Math.max(scaleX, scaleY);

  canvasState.mainCanvas.style.transformOrigin = '0 0';
  canvasState.mainCanvas.style.transform = 'scale(' + (canvasState.scaleToFit )+ ')';
}

// twdEventHandlers = new EventHandlers();
// twdEventHandlers.setupMainHandlers();

// twdGrid = new TowerDefenseGrid();
// //twdGrid.setupOpenGrid(0, 0 ,9,9, 10, 10, 50, 50);


//   twdGrid.setupLevelOne();

//   twdMenu = new Menu();

// twdGameLoop = new GameLoop();


// setTimeout(function () {

//       twdGameLoop.start();
//       interval(function(){
//            twdGrid.enemies.push(new EnemyTank(0, 150, 5));
//       }, 1000,100);  

//       interval(function(){
          
//           document.getElementById("pocket").innerHTML = twdGrid.money;            
           
//       }, 1500, 999); 


// }, 2000);  
// }

// function interval(func, wait, times){
//   var interv = function(w, t){
//       return function(){
//           if(typeof t === "undefined" || t-- > 0){
//               setTimeout(interv, w);
//               try{
//                   func.call(null);
//               }
//               catch(e){
//                   t = 0;
//                   throw e.toString();
//               }
//           }
//       };
//   }(wait, times);

//   setTimeout(interv, wait);
// };