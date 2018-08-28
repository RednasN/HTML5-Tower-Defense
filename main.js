
var TO_RADIANS = Math.PI / 180; 


var DRAWMODE = "Canvas";
//var DRAWMODE = "WebGL";


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
var twdContent = null;
var twdGame = null;
var twdGraphics = null;
var twdCalculate = null;

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

  console.log("Load..");
  twdContent = new TowerDefenseContent();

    twdContent.loadContent("https://nijhof.biz/twd_game/get_images.php", function(err, data) {

        if (err !== null) {
            alert('Error loading content: ' + err);
        } else 
        {
            setup(data);
        }
    });

};

var userLang = navigator.language || navigator.userLanguage; 

class Turret2
{
    constructor()
    {
        this.image = null;
    }
}





//alert(userLang);

async function setup(data)
{ 
    //return true;
    //Storing and calculating images.
    twdImages = new TowerDefenseImages();
    
    twdGrid = new TowerDefenseGrid();
    twdGraphics = new TowerDefenseGraphics();
    twdCalculate = new TowerDefenseCalculate();
    //Load content.    
        
        {
          
            //Processing images.
            for(var i = 0; i < data['images'].length; i++)
            {
                //Push images to available image list.
                var imageSrc = data['images'][i];
                var image = new TowerDefenseImage(imageSrc.image_id, imageSrc.image_name, imageSrc.image_b64)
                twdContent.images.push(image);
            }

            //Processing projectiles.
            for(var i = 0; i < data['projectiles'].length; i++)
            {
                var projectileSrc = data['projectiles'][i];
                var projectile = new TowerDefenseProjectile(
                    projectileSrc['projectile_id'], projectileSrc['projectile_name'],
                    projectileSrc['projectile_type'],projectileSrc['projectile_minlaunchdelay'],projectileSrc['projectile_maxlaunchdelay'],
                    projectileSrc['projectile_minfixedangle'],projectileSrc['projectile_maxfixedangle'], projectileSrc['projectile_methodcalculate']);


                
                //Finding image by id.
                var image = twdContent.images.find(x => x.id === projectileSrc['projectile_images_image_id']);
                
                if(image != null)
                {
                    //Rotating images if nog already started/done.
                    if(image.images == null)
                    {
                        //Rotating images.
                        image.images = await image.calculateRotations();
                    }
                
                    //Add image reference to tower.
                    projectile.image = image;
                }
                twdContent.projectiles.push(projectile);
            }

            //Processing turrets.
            for(var i = 0; i < data['turrets'].length; i++)
            {
                var towerSrc = data['turrets'][i];
                
                var tower = new TowerDefenseTower(towerSrc.turret_id, towerSrc.turret_name, towerSrc.turret_type,
                towerSrc.turret_costs, towerSrc.turret_speed, towerSrc.turret_range, towerSrc.turret_damage, towerSrc.turret_projectilescount,
                towerSrc.turret_methodcalculate, towerSrc.turret_methodshoot, towerSrc.turret_findenemies, towerSrc.turret_findenemy);

                //Finding image by id.
                var image = twdContent.images.find(x => x.id === towerSrc.turret_images_image_id);
                if(image != null)
                {
                    //Rotating images if nog already started/done.
                    if(image.images == null)
                    {
                        //Rotating images.
                        image.images = await image.calculateRotations();
                    }

                    //Add image reference to tower.
                    tower.image = image;
                }

                //Finding projectile
                var projectile = twdContent.projectiles.find(x => x.id === towerSrc.turret_projectiles_projectile_id);
                tower.projectile = projectile;
                
                //Push tower to tower optionlist.
                twdContent.towers.push(tower);
            }

            //Processing Barrels
            for(var i = 0; i < data['turretbarrels'].length; i++)
            {
                var barrelSrc = data['turretbarrels'][i];
                var barrel = new TowerDefenseBarrel(barrelSrc['turretbarrel_id'], barrelSrc['turretbarrel_location']);

                var tower = twdContent.towers.find(x => x.id === barrelSrc['turretbarrel_turrets_turret_id']);

                if(tower.barrels == null)
                {
                    tower.barrels = [];
                }
                tower.barrels.push(barrel);
            }
            
            //Processing levels.
            for(var i = 0; i < data['levels'].length; i++)
            {
                var levelSrc = data['levels'][i];

                var level = new TowerDefenseLevel(levelSrc['level_id'],levelSrc['level_name'], levelSrc["level_description"]);
                if(twdContent.levels == null)
                {
                    twdContent.levels = [];
                }
                twdContent.levels.push(level);
            }

            //Processing cells
            for(var i = 0; i < data['levelcells'].length; i++)
            {
                var cellSrc = data['levelcells'][i];

                var cell = new TowerDefenseCell(cellSrc['levelcell_id'],cellSrc['levelcell_x'], cellSrc["levelcell_y"]);
                
                
                var image = twdContent.images.find(x => x.id === cellSrc.levelcell_images_image_id);
                //console.log(image);
                //var result = await image.calculateImage(); 

                if(image != null)
                {
                    if(image.image == null)
                    {     
                        //image.calculateImage(image);
                        //console.log("Hoi");                   
                        image.image = await image.calculateImage(); 
                        //console.log("doei");
                    }
                    cell.image = image;                          
                }                

                var level = twdContent.levels.find(x => x.id === cellSrc.levelcell_levels_level_id);

                if(level.cells == null)
                {
                    level.cells = [];
                }
                level.cells.push(cell);
            }

            for(var i = 0; i < data['paths'].length; i++)
            {
                var pathSrc = data['paths'][i];

                var level = twdContent.levels.find(x => x.cells.find(q => q.id === pathSrc['levelpath_levelcells_levelcell_id']));
                var cell = level.cells.find(x => x.id === pathSrc['levelpath_levelcells_levelcell_id']);

                var path = new TowerDefensePath(pathSrc["levelpath_id"], pathSrc["levelpath_index"]);
                path.cell = cell;
                if(level.paths == null)
                {
                    level.paths = [];
                }

                level.paths.push(path);
            }

            for(var i = 0; i < data['enemies'].length; i++)
            {
                var enemySrc = data['enemies'][i];

                var enemy = new TowerDefenseEnemy(enemySrc['enemy_id'], enemySrc['enemy_name'],enemySrc['enemy_reward'],
                                        enemySrc['enemy_speed'],enemySrc['enemy_lives']);

                var image = twdContent.images.find(x => x.id === enemySrc.enemy_images_image_id);
                if(image != null)
                {
                    //Rotating images if nog already started/done.
                    if(image.images == null)
                    {
                        //Rotating images.
                        image.images = await image.calculateRotations();
                    }

                    //Add image reference to tower.
                    enemy.image = image;
                }
                twdContent.enemies.push(enemy);
            }


            twdEventHandlers = new EventHandlers();
            twdEventHandlers.setupMainHandlers();

            twdMenu = new TowerDefenseMenu();
            twdMenu.addTowers();

            twdGameLoop = new GameLoop();
            twdGame = new TowerDefenseGame();
            twdGame.selectLevel(twdContent.levels[0]);
            twdGameLoop.start();  
            
            

            function copyInstanceStack (original) {
                var copied = Object.assign(
                  Object.create(
                    Object.getPrototypeOf(original)
                  ),
                  original
                );      
                return copied;
            }

            var enemyCopy = copyInstanceStack(twdContent.enemies[0]);
            enemyCopy.init();

            twdGame.enemies.push(enemyCopy);
        }
    



    //return true;
	//twdImages = new TowerDefenseImages();
	//twdImages.setupTowers();
	//twdImages.setupEnemies();
	//twdImages.setupBullets();    
	//twdImages.setupAssets(); 
    //twdImages.setupGridImages();
    //twdImages.setupExplosions();

	
	
	
	// twdGrid = new TowerDefenseGrid();
	// //twdGrid.setupOpenGrid(0, 0 ,9,9, 10, 10, 50, 50);


    // twdGrid.setupLevelOne();

    
	// twdGameLoop = new GameLoop();


    // setTimeout(function () {

    //         twdGameLoop.start();
    //         interval(function(){
    //             twdGrid.enemies.push(new EnemyTank(0, 150, 5));
    //         }, 1000,100);  

    //         interval(function(){
                
    //             document.getElementById("pocket").innerHTML = twdGrid.money;            
                
    //         }, 1500, 999); 


    // }, 2000);  
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