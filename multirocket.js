function MultiRocket(x, y, enemyIndex, bulletIndex, angle, damage, fixedangletime, shootingdelay) {
    this.gridY = y;
    this.gridX = x;
    this.x = 0;
    this.y = 0;
    this.enemyIndex = enemyIndex;
    this.bulletIndex = bulletIndex;
    this.angle = angle;
    this.locked = false;
    this.needdraw = true;
    this.damage = damage;
    this.fixedangletime = fixedangletime;
    this.shootingDelay = shootingdelay;

    this.plusrotation = null;


    var cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;
    var cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;

    var centerTurretX = twdGrid.grid[this.gridX][this.gridY].drawx + cellWidth;
    var centerTurretY = twdGrid.grid[this.gridX][this.gridY].drawy + cellWidth;

    this.x = centerTurretX;
    this.y = centerTurretY;
    this.x += 20 * Math.cos(this.angle * Math.PI / 180);
    this.y += 20 * Math.sin(this.angle * Math.PI / 180);

    this.steps = 0;

    

    //var startRouteIndex = twdGrid.enemies[this.enemyIndex].routeindex;

    //var startx = twdGrid.route[startRouteIndex].drawx;
    //var starty = twdGrid.route[startRouteIndex].drawy;
    //twdGrid.explosions.push(new Explosion(startx, starty, 1));

    //console.log(this.enemyIndex)

    this.draw = function ()
    {
        if(this.needdraw && this.shootingDelay < 0)
        {
            try
            {
                //console.log(this.angle);
                twdGrid.render(twdImages.bullets[this.bulletIndex].images[Math.round(this.angle)], Math.floor(this.x) + mainCanvasXOffset - 25, Math.floor(this.y) + mainCanvasYOffset - 25);
            }
            catch(err)
            {
                console.log("Error!");
            }
        }
    }

    this.calculate = function() {

        this.shootingDelay -= twdGameLoop.delta * 1000;

        

        if(this.needdraw && this.shootingDelay < 0)
        {

            //console.log('Delay!' );
        var centerEnemyX = twdGrid.enemies[this.enemyIndex].drawx + 25;
        var centerEnemyY = twdGrid.enemies[this.enemyIndex].drawy + 25;

        //var deltaX = centerEnemyX - (this.x);
        //var deltaY = centerEnemyY - (this.y);

        var deltaX =  (this.x) - centerEnemyX;
        var deltaY =  (this.y) - centerEnemyY;

        var rad = Math.atan2(deltaY, deltaX); // In radians
        var angle = Math.round(rad * 180 /  Math.PI + 180);

        this.fixedangletime -= twdGameLoop.delta * 1000;
        

        
            //console.log(this.angle);
        //console.log(this.fixedangletime);

        if(!this.locked && this.fixedangletime < 0)
        {
            if(this.plusrotation == null)
            {
                var stepsRight = 0;
                var rightThisAngle = this.angle;

                while(rightThisAngle != angle)
                {
                    rightThisAngle++;
                    stepsRight++;

                    if(rightThisAngle > 360)
                    {
                        rightThisAngle = 0;
                    }
                }

                if(stepsRight > 180)
                {
                    this.plusrotation = false;
                }
                else
                {
                    this.plusrotation = true;
                }
            }

            else
            {
                this.steps++;

                if(this.steps > 359)
                {
                    this.plusrotation = !this.plusrotation;
                    this.steps = 0;
                }
            }

            if(this.plusrotation)
            {
                this.angle += (175 * twdGameLoop.delta);
            } 

             if(!this.plusrotation)
            
            {
                this.angle += -(175 * twdGameLoop.delta);
            }        

            if (Math.abs(angle - this.angle) < 5) 
            {
                this.locked = true;
            }
        }

        else
        {
            if(this.fixedangletime < 0)
            {
                this.angle = angle;
            }
            
        }

        if(this.angle > 359)
        {
            this.angle = 0;
        }

        if(this.angle < 0)
        {
            this.angle = 359;
        }

        
        var speed = 150;

        if(this.locked)
        {
            speed = 250;
        }

        this.x += (twdGameLoop.delta * speed) * Math.cos(this.angle * Math.PI / 180);
        this.y += (twdGameLoop.delta * speed) * Math.sin(this.angle * Math.PI / 180);

        var drawx = Math.floor(this.x);
        var drawy = Math.floor(this.y);

        if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
              this.needdraw = false;

              //Hit.    
              twdGrid.enemies[this.enemyIndex].hit(this.damage);
        }        
    }
    }
}