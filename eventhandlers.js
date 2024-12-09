
function EventHandlers()
{
	// Global Scope variable we need this
	this.closeBuildModal = function(e) {
		document.getElementById("modal-build").style.display = "none";

	   	
	};

	this.selectImage = function (e){
		var towerIndex = e.getAttribute("index");
		var cost = e.getAttribute("cost");

		twdMenu.towercost = cost;
		twdMenu.buildIndex = towerIndex;

		
		
		calculateUpgradeCosts();
	};

	function calculateUpgradeCosts()
	{
		document.getElementById("speedCost").innerHTML = Math.round((parseInt(document.getElementById("speedvalue").innerHTML) + 1) * (twdMenu.towercost / 5));
		document.getElementById("rangeCost").innerHTML = Math.round((parseInt(document.getElementById("rangevalue").innerHTML) + 1) * (twdMenu.towercost / 5));
		document.getElementById("powerCost").innerHTML = Math.round((parseInt(document.getElementById("powervalue").innerHTML) + 1) * (twdMenu.towercost / 5));

		if(parseInt(document.getElementById("speedvalue").innerHTML) != twdMenu.speedLevel)
		{
			twdMenu.speedLevel = parseInt(document.getElementById("speedvalue").innerHTML);
			twdMenu.towerSpeedCost += (twdMenu.towercost / 5) * twdMenu.speedLevel;			
		}

		if(parseInt(document.getElementById("powervalue").innerHTML) != twdMenu.powerLevel)
		{	
			twdMenu.powerLevel = parseInt(document.getElementById("powervalue").innerHTML);
			twdMenu.towerPowerCost += (twdMenu.towercost / 5) * twdMenu.powerLevel;
			
		}

		if(parseInt(document.getElementById("rangevalue").innerHTML) != twdMenu.rangeLevel)
		{
			twdMenu.rangeLevel = parseInt(document.getElementById("rangevalue").innerHTML);
			twdMenu.towerRangeCost += (twdMenu.towercost / 5) * twdMenu.rangeLevel;
			
		}
		
		document.getElementById("totalcost").innerHTML = (parseInt(twdMenu.towercost) + parseInt(twdMenu.towerSpeedCost) + parseInt(twdMenu.towerPowerCost) + parseInt(twdMenu.towerRangeCost));

		
    	
    	
	}

	this.minusSpeed = function() {
		if(document.getElementById("speedvalue").innerHTML != 0)
		{
			document.getElementById("speedvalue").innerHTML = parseInt(document.getElementById("speedvalue").innerHTML) - 1;
			calculateUpgradeCosts();
		}		
	}

	this.minusRange = function() {
		if(document.getElementById("rangevalue").innerHTML != 0)
		{
			document.getElementById("rangevalue").innerHTML = parseInt(document.getElementById("rangevalue").innerHTML) - 1;
			calculateUpgradeCosts();
		}
	}

	this.minusPower = function() {
		if(document.getElementById("powervalue").innerHTML != 0)
		{
			document.getElementById("powervalue").innerHTML = parseInt(document.getElementById("powervalue").innerHTML) - 1;
			calculateUpgradeCosts();
		}
	}

	this.changeSpeed = function()
	{
		twdGameLoop.changeSpeed();

		var gamespeedImage = document.getElementById('gamespeed');
		gamespeedImage.src = "./images/speed-level-"+twdGameLoop.speed+".svg";
	}

	this.changePause = function()
	{
		twdGameLoop.changePause();

		var gamestateImage = document.getElementById('gamestate');
		gamestateImage.src = "./images/" + (twdGameLoop.paused ? "pause.svg" : "play.svg");
	}



	this.plusSpeed = function() {
		if(document.getElementById("speedvalue").innerHTML != 9)
		{
			document.getElementById("speedvalue").innerHTML = parseInt(document.getElementById("speedvalue").innerHTML) + 1;
			calculateUpgradeCosts();
		}
	}

	this.plusRange = function() {
		if(document.getElementById("rangevalue").innerHTML != 9)
		{
			document.getElementById("rangevalue").innerHTML = parseInt(document.getElementById("rangevalue").innerHTML) + 1;
			calculateUpgradeCosts();
		}
	}

	this.plusPower = function() {
		if(document.getElementById("powervalue").innerHTML != 9)
		{
			document.getElementById("powervalue").innerHTML = parseInt(document.getElementById("powervalue").innerHTML) + 1;
			calculateUpgradeCosts();
		}
	}

	this.buildTurret = function(e) {
		document.getElementById("modal-build").style.display = "none";
		twdMenu.build();
	};

	this.showBuild = function () {
		var nowClickedCell = twdGrid.selectedCell;

		if(nowClickedCell != null)
		{
			twdMenu.buildx = nowClickedCell.x;
			twdMenu.buildy = nowClickedCell.y;

			document.getElementById("speedvalue").innerHTML = 0;
			document.getElementById("rangevalue").innerHTML = 0;
			document.getElementById("powervalue").innerHTML = 0;
			document.getElementById("totalcost").innerHTML = 0;
			twdMenu.towercost = 0;
			twdMenu.buildIndex = -1;

			calculateUpgradeCosts();

			document.getElementById("modal-build").style.display = "block";
		}
	}

	this.setupMainHandlers = function() {

		var lastClicked = null;


		var clickedCell = null;

		mainCanvas.addEventListener('touchstart', function(e) {
			
			mainCanvasYCurrent = e.targetTouches[0].pageY / scaleToFit;
            mainCanvasXCurrent = e.targetTouches[0].pageX / scaleToFit;

            function singleClick()
            {
            	console.log("Single click");

				var cell = getClickedCell();
				
				twdGrid.selectedCell = cell;
				//twdGrid.selectedCell = cell;
				//twdgrid.selected
            }

            function getClickedCell()
            {
	            for (x = 0; x < twdGrid.grid.length; x++) {
		                for (y = 0; y < twdGrid.grid[x].length; y++) {
		                	var startx = twdGrid.grid[x][y].drawx + mainCanvasXOffset;
		                	var starty = twdGrid.grid[x][y].drawy + mainCanvasYOffset;

		                	if (mainCanvasXCurrent > startx  && mainCanvasXCurrent < (startx + twdGrid.grid[x][y].width) &&
		                                mainCanvasYCurrent > starty && mainCanvasYCurrent < (starty + twdGrid.grid[x][y].height)) {
		                		 
	                            return twdGrid.grid[x][y];
		                	}
		                }
	            }
	            return null;
       		}

			if(lastClicked != null)
			{
				var nowClicked = new Date();
				var diff = nowClicked.getTime() - lastClicked.getTime();

				if(diff < 300)
				{
					var nowClickedCell = getClickedCell();
					if(nowClickedCell.x  == clickedCell.x && clickedCell.y == nowClickedCell.y)
					{
						twdMenu.buildx = nowClickedCell.x;
						twdMenu.buildy = nowClickedCell.y;

						document.getElementById("speedvalue").innerHTML = 0;
						document.getElementById("rangevalue").innerHTML = 0;
						document.getElementById("powervalue").innerHTML = 0;
						document.getElementById("totalcost").innerHTML = 0;
						twdMenu.towercost = 0;
						twdMenu.buildIndex = -1;

						calculateUpgradeCosts();

						document.getElementById("modal-build").style.display = "block";
					}
				}

				//if (canvasTouchXCurrent > xExact && canvasTouchXCurrent < (xExact + grid.grid[x][y].cellWidth) &&
                //            canvasTouchYCurrent > yExact && canvasTouchYCurrent < (yExact + grid.grid[x][y].cellHeight)) {
			}
			clickedCell = getClickedCell();

			lastClicked = new Date();



			singleClick();
			

            twdMenu.checkMenuClick();

			e.preventDefault();
		});

		mainCanvas.addEventListener('touchmove', function(e) {

			//mainCanvasYCurrent = e.targetTouches[0].pageY / scaleToFit;
            //mainCanvasXCurrent = e.targetTouches[0].pageX / scaleToFit;
            if(twdMenu.draggedTurret != null)
            {
            	mainCanvasYCurrent = e.targetTouches[0].pageY / scaleToFit;
            	mainCanvasXCurrent = e.targetTouches[0].pageX / scaleToFit;
            }

            if(twdMenu.draggedTurret == null)
            {
				var diffY = e.targetTouches[0].pageY / scaleToFit - mainCanvasYCurrent;
	            mainCanvasYCurrent += diffY;
	            mainCanvasYOffset += diffY;

	            var diffX = e.targetTouches[0].pageX / scaleToFit - mainCanvasXCurrent;
	            mainCanvasXCurrent += diffX;
	            mainCanvasXOffset += diffX;

	            mainCanvasYOffset = Math.floor(mainCanvasYOffset);
	            mainCanvasXOffset = Math.floor(mainCanvasXOffset);
        	}

        	//console.log(mainCanvasYCurrent);

			e.preventDefault();
		});

		mainCanvas.addEventListener('touchend', function(e) {
			//mainCanvasYCurrent = e.screenY;
            //mainCanvasXCurrent = e.screenX;


            twdMenu.drop();
			//twdMenu.draggedTurret = null;
            

			e.preventDefault();
			return true;
		});
	};
	
}