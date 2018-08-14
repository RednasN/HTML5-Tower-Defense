class MultiRocketLauncher extends Weapon {    

    constructor(x, y, imageIndex)
    {
      super(x, y, imageIndex);
      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
      //Default values for rocketlauncher
      this.range = 1000;
      this.damage = 1;
      this.speed = 1000;    
      this.maxFixedAngleTime = 1000;
      this.minFixedAngleTime = 0;

      this.minShootingDelay = 0;
      this.maxShootingDelay = 1000;

      this.canons = [0,-40,40];
    }
    //Weapon.call(this, x, y , imageIndex);   

    draw() {
        twdGrid.render(twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx, this.starty);
    }

    shoot() {
        
        //Find closests for other canonloops.
        this.findClosests();

        for(var i = 0;i < 50; i++)
        {
            var angleTIme = this.randomIntFromInterval(this.minFixedAngleTime, this.maxFixedAngleTime);
            var shootingDelay = this.randomIntFromInterval(this.minShootingDelay, this.maxShootingDelay);

            var randomFocusedIndex = Math.floor(Math.random()*this.focusedIndexes.length);
            var angleLoop = this.canons[Math.floor(Math.random()*this.canons.length)];
            
            //console.log(this.canons[angleLoop]);
            
            var totalAngle = angleLoop + this.angle;

            if(totalAngle > 359)
            {
                angleLoop = Math.abs(359 - totalAngle);
                totalAngle = angleLoop;
            }

            if(totalAngle < 0)
            {
                angleLoop = Math.abs(0 - totalAngle);
                totalAngle = angleLoop;
            }
            //console.log(randomFocusedIndex);
            

            //console.log(angleLoop);

            
            twdGrid.bullets.push(new MultiRocket(this.gridX, this.gridY, this.focusedIndexes[randomFocusedIndex], 1, totalAngle, this.damage, angleTIme, shootingDelay));
        }

        this.focusedIndexes = [];    

        //var item = this.canons[Math.floor(Math.random()*this.canons.length)];
        //twdGrid.bullets.push(new Rocket(this.gridX, this.gridY, this.focusedIndex, 1, item, this.damage));
    }

    randomIntFromInterval(min,max)
    {
    return Math.floor(Math.random()*(max-min+1)+min);
    }

    //calculate() {      


      
      

    //   this.startx = twdGrid.grid[this.gridX][this.gridY].drawx + mainCanvasXOffset;
    //   this.starty = twdGrid.grid[this.gridX][this.gridY].drawy + mainCanvasYOffset;

    //   this.angle += 35 * twdGameLoop.delta;
    //   if(this.angle > 359)
    //   {
    //     this.angle = 0;
    //   }

    //   for(var i = 0; i < this.canons.length; i++)
    //   {
    //       this.canons[i]++;
    //       if(this.canons[i] == 359)
    //       {
    //           this.canons[i] = 0;
    //       }
    //   }

    //   this.findClosest();

    //   if(this.focusedIndex != -1 && !this.isInRange(this.focusedIndex))
    //   {
    //       this.focusedIndex = -1;
    //   }

    //   this.canShoot();
    //}
}
