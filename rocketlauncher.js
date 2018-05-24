class RocketLauncher extends Weapon {    

    constructor(x, y, imageIndex)
    {
      super(x, y, imageIndex);
      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);
    
      //Default values for rocketlauncher
      this.range = 200;
      this.damage = 10;
      this.speed = 2000;    

      this.canons = [0, 90, 180, 270];
    }
    //Weapon.call(this, x, y , imageIndex);   

    draw() {
        twdGrid.render(twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx, this.starty);
    }

    shoot() {
        var item = this.canons[Math.floor(Math.random()*this.canons.length)];
        twdGrid.bullets.push(new Rocket(this.gridX, this.gridY, this.focusedIndex, 1, item, this.damage));
    }

    calculate() {      

      this.startx = twdGrid.grid[this.gridX][this.gridY].drawx + mainCanvasXOffset;
      this.starty = twdGrid.grid[this.gridX][this.gridY].drawy + mainCanvasYOffset;

      this.angle += 35 * twdGameLoop.delta;
      if(this.angle > 359)
      {
        this.angle = 0;
      }

      for(var i = 0; i < this.canons.length; i++)
      {
          this.canons[i]++;
          if(this.canons[i] == 359)
          {
              this.canons[i] = 0;
          }
      }

      this.findClosest();

      if(this.focusedIndex != -1 && !this.isInRange(this.focusedIndex))
      {
          this.focusedIndex = -1;
      }

      this.canShoot();
    }
}
