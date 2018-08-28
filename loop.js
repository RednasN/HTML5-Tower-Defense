function GameLoop()
{	
	this.deltaCalc;
	this.delta = (1000 / 60) / 1000;
	this.then = new Date().getTime();
	this.speed = 1;
	this.dt = (1000 / 60) / 1000;
	this.accumulator = 0.0;
	this.paused = false;
	

	this.fps = (1000 / 120) / 1000;

	this.lastRefresh = 0;
	//console.log(this.fps2);

	function draw()
	{
		if(!twdGameLoop.paused)
		{
			//console.log(twdGameLoop.this.speed);
			var now = new Date().getTime();
			this.deltaCalc = (now - twdGameLoop.then) / 1000 ;


			twdGameLoop.lastRefresh += this.deltaCalc;

			//If code is paused minimum is 2FPS.
			if(this.deltaCalc > 0.5)
			{
				this.deltaCalc = 0.5;
			}

			twdGameLoop.then = now;

			twdGameLoop.accumulator += this.deltaCalc;
			
			while (twdGameLoop.accumulator >= twdGameLoop.dt )
		    {
		    	twdGameLoop.accumulator -= twdGameLoop.dt;

				twdCalculate.calculateTurrets();
		    	//twdGrid.calculateTurrets();
				twdCalculate.calculateEnemies();
				twdCalculate.calculateProjectiles();
				//twdGrid.calculateBullets();
				//twdGrid.calculateExplosions();
		    }
	    }	    

	    if(twdGameLoop.lastRefresh > twdGameLoop.fps)
	    {
		    //console.log(deltaCalc);
		    twdGameLoop.lastRefresh = 0;
		    if(DRAWMODE == "Canvas")
		    {
				mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
				//mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

				mainCtx.beginPath();
				mainCtx.rect(0, 0, mainCanvas.width, mainCanvas.height);
				mainCtx.fillStyle = "grey";
				mainCtx.fill();
			}

			if(DRAWMODE == "WebGL")
			{
				webglUtils.resizeCanvasToDisplaySize(mainCtx.canvas);

			    // Tell WebGL how to convert from clip space to pixels
			    mainCtx.viewport(0, 0, mainCtx.canvas.width, mainCtx.canvas.height);

			    mainCtx.clear(mainCtx.COLOR_BUFFER_BIT);
			}

			//
			twdGraphics.drawGrid();
			twdGraphics.drawTurrets();
			twdGraphics.drawEnemies();
			twdGraphics.drawProjectiles();

			//console.log('Draw' );
			//twdGrid.draw();

			//twdGrid.drawAssets();
			//twdGrid.drawTurrets();
			//twdGrid.drawEnemies();
			//twdGrid.drawExplosions();
			//twdGrid.drawBullets();
			
		}

		//twdMenu.draw();

		requestAnimationFrame(draw);

	}
	
	this.start = function() {
		draw();				
	};	

	this.changeSpeed = function()
	{
		twdGameLoop.speed = twdGameLoop.speed != 4 ? (twdGameLoop.speed+1) : 1;
		twdGameLoop.dt = (1000 / (60 * twdGameLoop.speed)) / 1000;
		//console.log("Verander snelheid");
	}

	this.changePause = function()
	{
		twdGameLoop.paused = twdGameLoop.paused ? false : true;
	}

}