class TowerDefenseMenu
{
    constructor()
    {
        this.sideMenu = [];
        this.transparentImage = null


        this.draggedTurret = null;
        this.startIndex = 0;


        this.verticalObjects = 0;

        //For building new rockets.
        this.buildx = -1;
        this.buildy = -1;

        //Building new turret
        this.buildIndex = -1;

        this.towercost = 0;
        this.towerSpeedCost = 0;
        this.towerPowerCost = 0;
        this.towerRangeCost = 0;

        this.speedLevel = 1;
        this.powerLevel = 1;
        this.rangeLevel = 1;
    }

    addTowers()
    {
        for(var i = 0; i< twdContent.towers.length; i++)
        {
            
                var tower = twdContent.towers[i];

                var div = document.getElementById('turrets');
                var towerTemplate = '<div style="width:50px;float:left;margin:5px;" onclick="twdEventHandlers.selectImage(this)" cost="'+ tower.costs + '" index="'+ tower.id + '"><img src="' + tower.image.src + '" style="backgrond:red;" width="50" height="50"><div width="50"><div style="display: table;margin: 0 auto;">'+tower.costs+'<img src ="./images/money.png" style="vertical-align: middle;margin-left:3px;" width="15" height="15"></div></div></div>';
                div.innerHTML +=  towerTemplate;

        }        
    }



	checkMenuClick()
	{
		// //mainCanvasYCurrent = e.screenY;
        // //mainCanvasXCurrent = e.screenX;

		// if(mainCanvasXCurrent > mainCanvas.width-twdImages.imgBlackTransparent.width)
        // {
        // 	for (x = 0; x < this.sideMenu.length; x++) {
        // 		if(mainCanvasXCurrent > this.sideMenu[x].drawx && mainCanvasXCurrent < (this.sideMenu[x].drawx + twdImages.imgBlackTransparent.width) 
        // 			&& mainCanvasYCurrent > this.sideMenu[x].drawy && mainCanvasYCurrent < (this.sideMenu[x].drawy + twdImages.imgBlackTransparent.height))
        // 		{
        // 			if(this.sideMenu[x].towerIndex != -1)
        // 			{
        // 				this.draggedTurret = {  
        // 					turretIndex :  this.sideMenu[x].towerIndex,                                 
        //                     drawx:mainCanvasXCurrent,
        //                     drawy:mainCanvasYCurrent,
        //                     height: twdImages.imgBlackTransparent.height,
        //                     width: twdImages.imgBlackTransparent.width,
        //                     dropped: false,
        //                 };
        // 			}

        //             if(this.verticalObjects < twdImages.towers.length)
        //             {   
        //                 //console.log(this.verticalObjects);
        //                 if(this.sideMenu[x].action == "up" && this.startIndex > 0)
        //                 {
        //                     this.startIndex--;
        //                 }

        //                 if(this.sideMenu[x].action == "down" && (this.startIndex + this.verticalObjects) < twdImages.towers.length)
        //                 {
        //                     //console.log(this.verticalObjects);
        //                     this.startIndex++;
        //                     //console.log("Down!");
        //                 }                    
        //             }

        //             //console.log(this.sideMenu[x].action);
        // 		}
        // 	}
        	
        // }
    }
    
    copyInstanceStack (original) {
        var copied = Object.assign(
          Object.create(
            Object.getPrototypeOf(original)
          ),
          original
        );      
        return copied;
    }


    build() {
        var turret = null;
        console.log(this.buildIndex);

        var tower = twdContent.towers.find(x => x.id == this.buildIndex);


        var newTower = this.copyInstanceStack(tower);


        if(newTower != null)
        {
            newTower.rangeLevel = this.rangeLevel;
            newTower.buildx = this.buildx;
            newTower.angle = 0;
            newTower.buildy = this.buildy;
            newTower.powerLevel = this.powerLevel;
            newTower.speedLevel = this.speedLevel;
            twdGame.towers.push(newTower);
        }

        //Reset build
        this.buildx = -1;
        this.buildy = -1;
        this.buildIndex = -1;
    }


	drop() {

			if(this.draggedTurret != null)
			{
				for (x = 0; x < twdGrid.grid.length; x++) {
	                for (y = 0; y < twdGrid.grid[x].length; y++) {
	                	var startx = twdGrid.grid[x][y].drawx + mainCanvasXOffset;
	                	var starty = twdGrid.grid[x][y].drawy + mainCanvasYOffset;

	                	if (mainCanvasXCurrent > startx  && mainCanvasXCurrent < (startx + twdGrid.grid[x][y].width) &&
	                                mainCanvasYCurrent > starty && mainCanvasYCurrent < (starty + twdGrid.grid[x][y].height)) {
	                		 
                            if(this.draggedTurret.turretIndex == 0)
                            {
	                		     var turret = new Turret(x, y, 0);
	                		     twdGrid.turrets[x][y] = turret;
                            }

                            if(this.draggedTurret.turretIndex == 1)
                            {
                                 var turret = new RocketLauncher(x, y, 1);
                                 twdGrid.turrets[x][y] = turret;
                            }


	                	}
	                }
	            }
	            this.draggedTurret = null;
       		}
	}


	draw() {

				this.transparentImage = twdImages.imgBlackTransparent;

				var fitVerticalCount = Math.floor(mainCanvas.height / twdImages.imgBlackTransparent.height);
                var startSideMenuY = Math.round((mainCanvas.height - (fitVerticalCount * twdImages.imgBlackTransparent.height)) / 2);   



                this.verticalObjects = fitVerticalCount - 2;

                this.sideMenu = [];

                var towerIndex = 0;
                for (i = 0; i < fitVerticalCount; i++) { 

                    mainCtx.drawImage(twdImages.imgBlackTransparent, mainCanvas.width-twdImages.imgBlackTransparent.width, startSideMenuY);

                    if(i == 0)
                    {
                            var cell = {
                                    x: 0,
                                    y: i,
                                    drawx:mainCanvas.width - twdImages.imgBlackTransparent.width,
                                    drawy:startSideMenuY,
                                    towerIndex : -1,
                                    action : "up",
                                    cellHeight: twdImages.imgBlackTransparent.height,
                                    cellWidth: twdImages.imgBlackTransparent.width
                                };
                        this.sideMenu.push(cell);  
                    }

                    if(i == fitVerticalCount-1)
                    {
                        var cell = {
                                    x: 0,
                                    y: i,
                                    drawx:mainCanvas.width - twdImages.imgBlackTransparent.width,
                                    drawy:startSideMenuY,
                                    towerIndex : -1,
                                    action : "down",
                                    cellHeight: twdImages.imgBlackTransparent.height,
                                    cellWidth: twdImages.imgBlackTransparent.width
                                };
                        this.sideMenu.push(cell);  
                    }


                    if(i != 0 && i != fitVerticalCount-1)
                    {
                        if((towerIndex + this.startIndex) < twdImages.towers.length)
                        {
                        	mainCtx.drawImage(twdImages.towers[towerIndex + this.startIndex].images[0], mainCanvas.width-twdImages.imgBlackTransparent.width, startSideMenuY);
                            
                            var cell = {
                                        x: 0,
                                        y: i,
                                        towerIndex : towerIndex + this.startIndex,
                                        drawx:mainCanvas.width - twdImages.imgBlackTransparent.width,
                                        drawy:startSideMenuY,
                                        action : "defense",
                                        cellHeight: twdImages.imgBlackTransparent.height,
                                        cellWidth: twdImages.imgBlackTransparent.width,
                                    };
                            this.sideMenu.push(cell);                        

                            towerIndex++;                            
                        }
                        else
                        {
                            var cell = {
                                        x: 0,
                                        y: i,
                                        towerIndex : -1,
                                        drawx:mainCanvas.width - twdImages.imgBlackTransparent.width,
                                        drawy:startSideMenuY,
                                        action : "empty",
                                        cellHeight: twdImages.imgBlackTransparent.height,
                                        cellWidth: twdImages.imgBlackTransparent.width,
                                    };
                            this.sideMenu.push(cell);  
                        }
                    }  

                    startSideMenuY += twdImages.imgBlackTransparent.height;     
                }


                if(this.draggedTurret != null)
                {	
                    mainCtx.drawImage(twdImages.towers[this.draggedTurret.turretIndex].images[0], mainCanvasXCurrent -  twdImages.imgBlackTransparent.width / 2, mainCanvasYCurrent - twdImages.imgBlackTransparent.height / 2);
                }			
	};
}