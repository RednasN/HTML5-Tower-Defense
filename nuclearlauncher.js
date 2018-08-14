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
}