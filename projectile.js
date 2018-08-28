class TowerDefenseProjectile
{
    constructor(id, name, type, minlaunchdelay, maxlaunchdelay, minfixedangle, maxfixedangle, methodCalculatePath)
    {
        //General properties.
        this.id = id;
        this.name = name;
        this.type = type;
        this.minlaunchdelay = minlaunchdelay;
        this.maxlaunchdelay = maxlaunchdelay;
        this.minfixedangle = minfixedangle;
        this.maxfixedangle = maxfixedangle;

        this.fixedAngleTime = 0;
        this.launchDelayTime = 0;

        this.focusedEnemy = null;

        //Global properties.
        this.image = null;
        this.methodCalculatePath = methodCalculatePath;

        this.x = null;
        this.y = null;
        this.needdraw = false;
        this.angle = null;
        this.tower = null;
        this.barrel = null;
        this.locked = false;

        this.plusrotation = null;
    }

    init()
    {
        //Get barrel for projectile.
        this.barrel = this.tower.barrels[this.randomIntFromInterval(0,this.tower.barrels.length)];
        this.locked = false;
        //Get start drawing.
        this.x = this.tower.buildx * twdGraphics.cellHeight;
        this.y = this.tower.buildy * twdGraphics.cellWidth;

        this.fixedAngleTime = this.randomIntFromInterval(this.minfixedangle, this.maxfixedangle);
        this.launchDelayTime = this.randomIntFromInterval(this.minlaunchdelay, this.maxlaunchdelay);
    }

    calculate()
    {
        //Decrease shooting delay when greater than or equals to 0.
        if(this.launchDelayTime > 0)
        {
            this.launchDelayTime -= twdGameLoop.delta * 1000;
        }

        //Start calculating when delay is smaller or equals 0.
        if(this.launchDelayTime <= 0)
        {
            //Draw is true.          
            this[this.methodCalculatePath]();
        }  
    }

    calculateCurvedPath()
    {
        //Calulations when angletime > 0
        if(this.fixedAngleTime > 0)
        {
            this.fixedAngleTime -= twdGameLoop.delta * 1000;
            this.angle = (this.angle == null ? this.tower.angle : this.angle);
        }

        //Start calculating when delay is smaller or equals 0.
        if(this.fixedAngleTime <= 0)
        {
            var rad = this.calculateRad();

            //Get Destination angle.
            var angleDest = this.calculateAngle(rad);

            //if projectile is locked to enemy, fixed angle.
            if(this.locked)
            {
                this.angle = angleDest;
            }

            //Case when projectile is not locked, calculate new angle.
            if(!this.locked)
            {
                if(this.plusrotation == null)
                {
                    var stepsRight = 0;
                    var rightThisAngle = this.angle;

                    while(rightThisAngle != angleDest)
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

                if (Math.abs(angleDest - this.angle) < 5) 
                {
                    this.locked = true;
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
        }

        var speed = 150;

        if(this.locked)
        {
            speed = 250;
        }

        this.x += (twdGameLoop.delta * speed) * Math.cos(this.angle * Math.PI / 180);
        this.y += (twdGameLoop.delta * speed) * Math.sin(this.angle * Math.PI / 180);

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        var centerEnemyX =  this.focusedEnemy.drawx;
        var centerEnemyY = this.focusedEnemy.drawy;

        if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
            this.needdraw = false;
            //TODO hit.
        }
    }

    calculateAngle(rad)
    {
        var angle = Math.round(rad * 180 /  Math.PI + 180);
 
        if(angle == 360)
        {
            angle = 359;
        }

        return angle;
    }

    calculateRad()
    {
         //Start calculating path when drawing is required and projectile is launched.
         var centerEnemyX =  this.focusedEnemy.drawx;
         var centerEnemyY = this.focusedEnemy.drawy;
 
         var deltaX = (this.x) - centerEnemyX;
         var deltaY = (this.y) - centerEnemyY;
 
         var rad = Math.atan2(deltaY, deltaX); // In radians
         
         return rad;
    }

    calculateStraightPath()
    {       
        var rad = this.calculateRad();
        this.angle = this.calculateAngle();

        //var angleDest = 360 - Math.round(rad * (180 / Math.PI));
        this.x = this.x - (200 * twdGameLoop.delta) * Math.cos(this.rad);
        this.y = this.y - (200 * twdGameLoop.delta) * Math.sin(this.rad);

        if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
            this.needdraw = false;

            //TODO hit.
            //twdGrid.enemies[this.enemyIndex].hit(this.damage);
        }
    }

    randomIntFromInterval(min,max)
    {
        max = max-1;
        return Math.floor(Math.random()*(max-min+1)+min);
    }
}