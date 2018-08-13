
class Weapon {

    constructor(x, y, imageIndex)
    {     

      this.gridX = x;
      this.gridY = y;
      this.imageIndex = imageIndex;

      this.range = 0;
      this.speed = 0;
      this.damage = 0;

      this.focusedIndex = -1;
      this.focusedIndexes = [];

      this.rangeLevel = 0;
      this.powerLevel = 0;
      this.speedLevel = 0;

      this.startx = null;
      this.starty = null;

      this.lastFired = 0;
    }    

    canShoot()
    {   
        this.lastFired += twdGameLoop.delta * 1000;

        if(this.focusedIndex != -1)
        {
            if (this.lastFired > this.speed - ((this.speedLevel * 10) * (this.speed / 100))) {
                this.shoot();
                this.lastFired = 0;
            }
        }
    }

    findClosests()
    {
        if(this.focusedIndexes.length == 0)
        {
            for(var i = 0; i < twdGrid.enemies.length; i++)
            {
                if(this.isInRange(i))
                {
                    this.focusedIndexes.push(i);
                }
            }
        }
    }

    findClosest()
    {
        if(this.focusedIndex == -1)
        {   
          var shortestRoute = -1;
          var shortestIndex = -1;

          for(var i = 0; i < twdGrid.enemies.length; i++)
          {
              if(this.isInRange(i))
              {
                 if(shortestRoute == -1 && shortestIndex == -1)
                 {
                    shortestRoute = twdGrid.enemies[i].routeindex;
                    shortestIndex = i;
                 }

                 if(twdGrid.enemies[i].routeindex < shortestIndex)
                 {
                    shortestRoute = twdGrid.enemies[i].routeindex;
                    shortestIndex = i;
                 }   
             }         
          }

          if(shortestIndex != -1)
          {
            this.focusedIndex = shortestIndex;
          }
        }
    }

    isInRange(i)
    {     
        //console.log(this.rangeLevel);
        if(twdGrid.enemies[i].lives <= 0)
        {
            return false;
        }

        var startx = twdGrid.grid[this.gridX][this.gridY].drawx + mainCanvasXOffset;
        var starty = twdGrid.grid[this.gridX][this.gridY].drawy + mainCanvasYOffset;

        var cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;
        var cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;

        var x0 = startx + cellWidth;
        var y0 = starty + cellHeight;              

        var x1 = twdGrid.enemies[i].drawx + mainCanvasXOffset + cellWidth;
        var y1 = twdGrid.enemies[i].drawy + mainCanvasYOffset + cellHeight;

        if (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < (this.range + (this.range / 100 * this.rangeLevel * 10))) {
           
           //initiate.
           return true;
        }

        return false;
    }
};