class TowerDefenseGraphics
{
    constructor()
    {
        this.cellHeight = 50;
        this.cellWidth = 50;
    }

    drawEnemies()
    {
        for (var x = 0; x < twdGame.enemies.length; x++) {  
            twdGame.enemies[x].draw();                      
        }
    }

    drawTurrets()
    {
		//var nextrow = 0;
        for (var x = 0; x < twdGame.towers.length; x++) {  

            this.render(twdGame.towers[x].image.images[Math.round(twdGame.towers[x].angle)],(twdGame.towers[x].buildx*this.cellWidth ) + mainCanvasXOffset, 
            twdGame.towers[x].buildy*this.cellHeight + mainCanvasYOffset);            
        }
    }

    drawProjectiles()
    {
		//var nextrow = 0;
        for (var x = 0; x < twdGame.projectiles.length; x++) {  
            this.render(twdGame.projectiles[x].image.images[Math.round(twdGame.projectiles[x].angle)],(twdGame.projectiles[x].x) + mainCanvasXOffset, 
            twdGame.projectiles[x].y + mainCanvasYOffset);            
        }
    }
    
    drawGrid()
    {
		//var nextrow = 0;
        for (var x = 0; x < twdGame.level.cells.length; x++) {           
            this.render(twdGame.level.cells[x].image.image,(twdGame.level.cells[x].x*this.cellWidth ) + mainCanvasXOffset, 
                twdGame.level.cells[x].y*this.cellHeight + mainCanvasYOffset);            
        }
    }

    render(image, x, y)
	{	
		if(DRAWMODE == "Canvas")
		{
			mainCtx.drawImage(image, x, y);
		}

		if(DRAWMODE == "WebGL")
		{
            //try
            //{
                mainCtx.bindTexture(mainCtx.TEXTURE_2D, image);

                var matrix = m4.orthographic(0, mainCtx.canvas.width, mainCtx.canvas.height, 0, -1, 1);

                // this matrix will translate our quad to dstX, dstY
                matrix = m4.translate(matrix, x, y, 0);

                // this matrix will scale our 1 unit quad
                // from 1 unit to texWidth, texHeight units
                matrix = m4.scale(matrix, 50, 50, 1);

                // Set the matrix.
                mainCtx.uniformMatrix4fv(matrixLocation, false, matrix);

                // Tell the shader to get the texture from texture unit 0
                mainCtx.uniform1i(textureLocation, 0);

                // draw the quad (2 triangles, 6 vertices)
                mainCtx.drawArrays(mainCtx.TRIANGLES, 0, 6);
            //}
            //catch(err)
           // {
                
           // }
		}

	}

}
