var TO_RADIANS = Math.PI / 180; 


var DRAWMODE = "Canvas";

//Default values
var drawScale = 1;


var mainCanvas = null;
var mainCtx = null;

//Seperate files.
var twdImages = null;
var twdEventHandlers = null;
var twdGrid = null;
var twdGameLoop = null;
var twdMenu = null;

var scaleToFit = 1;

var mainCanvasXCurrent = 0;
var mainCanvasYCurrent = 0;
var mainCanvasXOffset = 0;
var mainCanvasYOffset = 0;

var program;
var positionLocation;
var texcoordLocation;
var matrixLocation;
var textureLocation;
var positionBuffer;
var positions;
var texcoordBuffer;
var texcoords;

var test = [];

window.onload = function () { 

    if(DRAWMODE == "Canvas")
    {
        mainCanvas = document.getElementById('towerDefenseView');
        mainCtx = mainCanvas.getContext("2d");
    }

    if(DRAWMODE == "WebGL")
    {
        mainCanvas = document.getElementById("towerDefenseView");
        mainCtx = mainCanvas.getContext("webgl", {alpha:false});

        program = webglUtils.createProgramFromScripts(mainCtx, ["drawImage-vertex-shader", "drawImage-fragment-shader"]);

        // look up where the vertex data needs to go.
        positionLocation = mainCtx.getAttribLocation(program, "a_position");
        texcoordLocation = mainCtx.getAttribLocation(program, "a_texcoord");

        // lookup uniforms
        matrixLocation = mainCtx.getUniformLocation(program, "u_matrix");
        textureLocation = mainCtx.getUniformLocation(program, "u_texture");

        // Create a buffer.
        positionBuffer = mainCtx.createBuffer();
        mainCtx.bindBuffer(mainCtx.ARRAY_BUFFER, positionBuffer);

        // Put a unit quad in the buffer
        positions = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]
        mainCtx.bufferData(mainCtx.ARRAY_BUFFER, new Float32Array(positions), mainCtx.STATIC_DRAW);

        // Create a buffer for texture coords
        texcoordBuffer = mainCtx.createBuffer();
        mainCtx.bindBuffer(mainCtx.ARRAY_BUFFER, texcoordBuffer);

        // Put texcoords in the buffer
        texcoords = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]
        mainCtx.bufferData(mainCtx.ARRAY_BUFFER, new Float32Array(texcoords), mainCtx.STATIC_DRAW);



        mainCtx.blendFunc(mainCtx.SRC_ALPHA, mainCtx.ONE_MINUS_SRC_ALPHA);
        mainCtx.enable(mainCtx.BLEND);




        mainCtx.useProgram(program);

        // Setup the attributes to pull data from our buffers
        mainCtx.bindBuffer(mainCtx.ARRAY_BUFFER, positionBuffer);
        mainCtx.enableVertexAttribArray(positionLocation);
        mainCtx.vertexAttribPointer(positionLocation, 2, mainCtx.FLOAT, false, 0, 0);
        mainCtx.bindBuffer(mainCtx.ARRAY_BUFFER, texcoordBuffer);
        mainCtx.enableVertexAttribArray(texcoordLocation);
        mainCtx.vertexAttribPointer(texcoordLocation, 2, mainCtx.FLOAT, false, 0, 0);
    }

  resizeCanvas();
  setup();
};

var userLang = navigator.language || navigator.userLanguage; 


//alert(userLang);

function setup()
{
	twdImages = new TowerDefenseImages();
	twdImages.setupTowers();
	twdImages.setupEnemies();
	twdImages.setupBullets();    
	twdImages.setupAssets(); 
    twdImages.setupGridImages();
    twdImages.setupExplosions();

	
	twdEventHandlers = new EventHandlers();
	twdEventHandlers.setupMainHandlers();
	
	twdGrid = new TowerDefenseGrid();
	//twdGrid.setupOpenGrid(0, 0 ,9,9, 10, 10, 50, 50);


    twdGrid.setupLevelOne();

    twdMenu = new Menu();
	
	twdGameLoop = new GameLoop();


    
    //console.log(test['hoi']);

   //  RegisterTurret(RocketLauncher);

   //  //Turret.prototype = Object.create(Weapon.prototype); // Inherit!
   //  //Turret.prototype.constructor = Turret;

   //  //RocketLauncher.prototype = Object.create(Weapon.prototype); // Inherit!
   //  //RocketLauncher.prototype.constructor = RocketLauncher;
   //  // var turret = new Turret(1, 2 , 3);

   // // console.log(turret);
   //  //console.log()

   //  //return;

   //  function RegisterTurret(turret)
   //  {
   //      console.log(turret.name);
   //      test[turret.name] = turret;
       
        
       
   //      //console.log(turret.constructor);
   //     // test['hoi'] = 'test';
   //  }


 setTimeout(function () {

        twdGameLoop.start();
        interval(function(){
             twdGrid.enemies.push(new EnemyTank(0, 150, 5));
        }, 1, 1);  

        interval(function(){
            
            document.getElementById("pocket").innerHTML = twdGrid.money;            
             
        }, 1500, 999); 


 }, 2000);

	//twdGameLoop.start();

  //setInterval(function(){ twdGrid.enemies.push(new EnemyTank(0)); }, 3000);
  
}

function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

function resizeCanvas() {

    var theWidth= window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var theHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    //alert(window.innerHeight);
    //alert(document.documentElement.clientHeight);
    //alert(document.body.clientHeight);

    console.log("Hoogte: " + document.body.clientHeight + " Breedte: " +document.body.clientWidth);

    mainCanvas.width = theWidth / drawScale;
    mainCanvas.height = theHeight  / drawScale;

    //mainCanvas.width = mainCanvas.width * 2;
    //mainCanvas.height = mainCanvas.height * 2;
    
    var scaleX = theWidth / mainCanvas.width;
    var scaleY = theHeight / mainCanvas.height;

    //scaleToFit = Math.min(scaleX, scaleY);
    scaleToFit = Math.max(scaleX, scaleY);

    mainCanvas.style.transformOrigin = '0 0'; //scale from top left
    mainCanvas.style.transform = 'scale(' + (scaleToFit )+ ')';
    
    //canvasWidth = canvas.width;
    //canvasHeight = canvas.height;

    //doLoop();
}