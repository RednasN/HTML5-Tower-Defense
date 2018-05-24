function TurretBullet(x, y, enemyIndex, bulletIndex, damage, callback) {
    this.gridY = y;
    this.gridX = x;
    this.x = 0;
    this.y = 0;
    this.enemyIndex = enemyIndex;
    this.firstTime = true;
    this.bulletIndex = bulletIndex;

    this.needdraw = true;

    this.damage = damage;

    var cellHeight = twdGrid.grid[this.gridX][this.gridY].height / 2;
    var cellWidth = twdGrid.grid[this.gridX][this.gridY].width / 2;

    var centerTurretX = twdGrid.grid[this.gridX][this.gridY].drawx + cellWidth;
    var centerTurretY = twdGrid.grid[this.gridX][this.gridY].drawy + cellWidth;

    var centerEnemyX = twdGrid.enemies[this.enemyIndex].drawx + cellWidth;
    var centerEnemyY = twdGrid.enemies[this.enemyIndex].drawy + cellWidth;

    var deltaX = centerTurretX - centerEnemyX;
    var deltaY = centerTurretY - centerEnemyY;

    var rad = Math.atan2(deltaY, deltaX); // In radians
    
    //var dest = Math.atan2(centerTurretX - centerEnemyX, centerTurretY - centerEnemyY) * 180 / Math.PI + 180
    var dest = rad * 180 /  Math.PI + 180;

    //var angleDest = 360 - Math.round(rad * (180 / Math.PI));

    this.x = centerTurretX - 25  * Math.cos(rad);
    this.y = centerTurretY - 25  * Math.sin(rad);
    this.angle = null;

    this.draw = function() {
      if (this.needdraw) {
            twdGrid.render(twdImages.bullets[this.bulletIndex].images[this.angle], this.x + mainCanvasXOffset - 25, this.y + mainCanvasYOffset - 25);

      }
    }


    this.calculate = function() {
      if (this.needdraw) {

          var centerEnemyX = twdGrid.enemies[this.enemyIndex].drawx + 25;
          var centerEnemyY = twdGrid.enemies[this.enemyIndex].drawy + 25;

          var deltaX = (this.x) - centerEnemyX;
          var deltaY = (this.y) - centerEnemyY;

          var rad = Math.atan2(deltaY, deltaX); // In radians
          this.angle = Math.round(rad * 180 /  Math.PI + 180);

		  if(this.angle == 360)
		  {
			  this.angle = 359;
		  }
          //var angleDest = 360 - Math.round(rad * (180 / Math.PI));
          this.x = this.x - (200 * twdGameLoop.delta) * Math.cos(rad);
          this.y = this.y - (200 * twdGameLoop.delta) * Math.sin(rad);

          var drawx = Math.floor(this.x);
          var drawy = Math.floor(this.y);

          if (Math.abs(this.x - centerEnemyX) < 10 && Math.abs(this.y - centerEnemyY) < 10) {
              this.needdraw = false;

              twdGrid.enemies[this.enemyIndex].hit(this.damage);


          }
		  //console.log(angle);
      }
    }
}