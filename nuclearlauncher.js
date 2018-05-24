class NuclearLauncher extends Weapon {

	constructor(x, y, imageIndex)
    {
      super(x, y, imageIndex);
      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
      	this.range = 1000;
	      this.damage = 1000;
	      this.speed = 1000; 
	      this.locked = false; 
    }

    shoot() {
        twdGrid.bullets.push(new NuclearBullet(this.gridX, this.gridY, this.focusedIndex, 2, this.damage));
    }

    draw() {
        twdGrid.render(twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx, this.starty);
    }

    calculate() {

      this.startx = twdGrid.grid[this.gridX][this.gridY].drawx + mainCanvasXOffset;
      this.starty = twdGrid.grid[this.gridX][this.gridY].drawy + mainCanvasYOffset;

      //console.log(starty);

      this.findClosest();

      if(this.focusedIndex != -1 && !this.isInRange(this.focusedIndex))
      {
          this.focusedIndex = -1;
          this.locked = false;
      }

      if(this.focusedIndex != -1)
      {
          var cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;
          var cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;

          var enemeyCenterX = twdGrid.enemies[this.focusedIndex].drawx + mainCanvasXOffset + cellWidth;
          var enemeyCenterY = twdGrid.enemies[this.focusedIndex].drawy + mainCanvasYOffset + cellHeight;
          
          var turretCenterX = this.startx + cellWidth;
          var turretCenterY = this.starty + cellHeight;
          

          var deltaX = turretCenterX - enemeyCenterX;
          var deltaY = turretCenterY - enemeyCenterY;

          //var deltaX = enemeyCenterX - turretCenterX;
          //var deltaY = enemeyCenterY - turretCenterY;

          var rad = Math.atan2(deltaY, deltaX);


          //var angleDest = Math.round(rad * (180 / Math.PI));

          var angleDest = Math.round(rad * 180 /  Math.PI + 180);
          //angleDest = Math.round(angleDest);

          //if(angleDest == 360)
          //{
          //    angleDest = 359;
          //}

          //if (angleDest < 0) {
          //    angleDest = (360 + Math.round(angleDest));
          //}

          //Calculate which way.

          if(!this.locked)
          {
              var diff = angleDest - this.angle;
              if (diff < 0)
              {
                  diff += 360;
              }
              if (diff > 180)
              {
                  this.angle+= - (50 * twdGameLoop.delta);

                  if(this.angle < 0)
                  {
                      this.angle = 359;
                  }
              }
              else
              {
                  this.angle += (50 * twdGameLoop.delta);
                  if(this.angle > 359)
                  {
                      this.angle = 0;
                  }
              }

          }
          else
          {
              this.angle = angleDest;
              if(this.angle > 359)
              {
                  this.angle = 0;
              }

              if(this.angle < 0)
              {
                  this.angle = 359;
              }
          }

          if (Math.abs(angleDest - this.angle) < 5) 
          {
              this.locked = true;
          }

          if(this.locked)
          {
              this.canShoot();
          }
      }

    }

    
}
