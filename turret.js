class Turret extends Weapon {

    //Weapon.call(this, x, y , imageIndex);   
    constructor(x, y, imageIndex)
    {
      super(x, y, imageIndex);

      this.angle = Math.floor(Math.random() * (359 - 0 + 1) + 0);

      this.range = 200;
      this.damage = 10;
      this.speed = 2000;
      this.locked = false;
    }

    shoot() {
        twdGrid.bullets.push(new TurretBullet(this.gridX, this.gridY, this.focusedIndex, 0, this.damage));
    }

    draw() {
        twdGrid.render(twdImages.towers[this.imageIndex].images[Math.round(this.angle)], this.startx, this.starty);
    }
}
