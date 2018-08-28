class TowerDefenseEnemy
{    
    constructor(id, name, reward, speed,lives)
    {
        //General properties.
        this.id = id;
        this.name = name;
        this.reward = reward;
        this.speed = speed;
        this.lives = lives;

        //Global properties.
        this.image = null;
        
        //draw and calculate properties.
        this.angle = null;
        this.drawx = null;
        this.drawy = null;
        this.routeIndex = null;

        this.curveStartx = null;
        this.curveStarty = null;

        this.curveEndy = null;
        this.curveEndy = null;

        this.bezierx=null;
        this.beziery=null;
        this.t = 0.0;

        this.isRight = true;
        this.docurve = false;

        

    }

    draw()
    {
        twdGraphics.render(this.image.images[this.angle],this.drawx + mainCanvasXOffset, 
        this.drawy + mainCanvasYOffset); 
    }

    init()
    {
        this.routeIndex = 0;
        this.angle = 0;
        this.speed = 50;
        this.drawx = twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth;
        this.drawy = twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight;
    }

    calculate()
    {
        var oldDrawx = this.drawx;
        var oldDrawy = this.drawy;

        if(Math.abs(this.drawx-twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth) < 5
            && Math.abs(twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight - this.drawy) < 5)
        {                    
            if(this.routeIndex != twdGame.level.paths.length-1)
            {
                this.routeIndex++;
            }

           if(this.routeIndex + 1 <= twdGame.level.paths.length-1)
            {
                if(twdGame.level.paths[this.routeIndex-1].cell.y != twdGame.level.paths[this.routeIndex + 1].cell.y &&
                    twdGame.level.paths[this.routeIndex-1].cell.x != twdGame.level.paths[this.routeIndex + 1].cell.x)
                {
                    this.docurve = true;
                    this.isRight = true;
                    this.curveStartx = twdGame.level.paths[this.routeIndex-1].cell.x * twdGraphics.cellWidth;
                    this.curveStarty = twdGame.level.paths[this.routeIndex-1].cell.y * twdGraphics.cellHeight;

                    this.curveEndx = twdGame.level.paths[this.routeIndex+1].cell.x * twdGraphics.cellWidth;
                    this.curveEndy = twdGame.level.paths[this.routeIndex+1].cell.y * twdGraphics.cellHeight;

                    this.bezierx=twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth;
                    this.beziery=twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight;


                    var startx = twdGame.level.paths[this.routeIndex-1].cell.x * twdGraphics.cellWidth;
                    var starty = twdGame.level.paths[this.routeIndex-1].cell.y * twdGraphics.cellHeight;

                    var endx = twdGame.level.paths[this.routeIndex+1].cell.x * twdGraphics.cellWidth;
                    var endy = twdGame.level.paths[this.routeIndex+1].cell.y * twdGraphics.cellHeight;

                    var bezierx = twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth;
                    var beziery = twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight;

                    if(startx > endx && starty > endy && starty > beziery && startx == bezierx)
                    {
                        this.isRight = false;
                    }

                    if(startx < endx && starty < endy && starty < beziery && startx == bezierx)
                    {
                        this.isRight = false;
                    }

                    if(startx < endx && starty > endy && starty > beziery && startx == bezierx)
                    {
                        this.isRight = false;
                    }

                    if(startx > endx && starty < endy && starty < beziery && startx == bezierx)
                    {
                        this.isRight = false;
                    }


                }
            }


        }
       
        if(this.docurve )
        {   
            this.drawx = Math.round((1-this.t)*(1-this.t)*this.curveStartx + 2*(1-this.t)*this.t*this.bezierx+this.t*this.t*this.curveEndx);
            this.drawy =  Math.round((1-this.t)*(1-this.t)*this.curveStarty + 2*(1-this.t)*this.t*this.beziery+this.t*this.t*this.curveEndy);
            
            this.t += (this.speed / 100) * twdGameLoop.delta;
            if(this.t > 1)
            {
            
                this.routeIndex ++;
                this.docurve = false;
                this.t = 0;
            }

            var deltaX = 0;
            var deltaY = 0;

            if(this.isRight)
            {
                deltaX = this.drawx - this.bezierx;
                deltaY = this.drawy - this.beziery;
            }
            else
            {
                deltaX =  this.bezierx - this.drawx;
                deltaY =  this.beziery - this.drawy;
            }
            
            

            var rad = Math.atan2(deltaY, deltaX); // In radians
            this.angle = Math.round(rad * 180 /  Math.PI + 180); 

            this.angle = 360 - this.angle;
            if(this.angle > 359)
            {
                this.angle = 0;
            }

            if(this.angle < 0)
            {
                this.angle = 359;
            }



            //console.log(this.angle);
        }
        if(!this.docurve)
        {
            if (this.drawx > twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth) {
                this.drawx += -this.speed * twdGameLoop.delta;
            }

            if (this.drawx  < twdGame.level.paths[this.routeIndex].cell.x * twdGraphics.cellWidth ) {
                this.drawx += this.speed * twdGameLoop.delta;
            }

            if (this.drawy > twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight) {

                this.drawy += -this.speed * twdGameLoop.delta;
            }

            if (this.drawy < twdGame.level.paths[this.routeIndex].cell.y * twdGraphics.cellHeight) {
                this.drawy += this.speed * twdGameLoop.delta;
            }

            var deltaX =  oldDrawx - this.drawx;
            var deltaY =  oldDrawy - this.drawy;

            var rad = Math.atan2(deltaY, deltaX); // In radians
            this.angle = Math.round(rad * 180 /  Math.PI + 180); 
            if(this.angle > 359)
            {
                this.angle = 0;
            }

            if(this.angle < 0)
            {
                this.angle = 359;
            }
        }
    }
}