function EnemyTank(imageIndex, lives, reward) {
  //Cell indexes.

  this.reward = reward;
  //this.gridY = y;
  //this.gridX = x;
  this.drawx = -1;
  this.drawy = -1;
  this.routeindex = -1;
  this.imageIndex = imageIndex;

  this.curveStartx = null;
  this.curveStarty = null;

  this.curveEndy = null;
  this.curveEndy = null;

  this.bezierx = null;
  this.beziery = null;
  this.t = 0.0;

  this.angle = 0;

  this.died = false;

  this.lives = lives;

  this.isRight = true;

  this.speed = 100;

  this.docurve = false;

  this.init = function () {
    //console.log(twdGrid.route);
    this.routeindex = twdGrid.route.length - 1;
    this.drawx = twdGrid.route[this.routeindex].drawx;
    this.drawy = twdGrid.route[this.routeindex].drawy;

    //console.log(twdImages.enemies[this.imageIndex].images[1]);
  };

  this.hit = function (hit) {
    //console.log(hit);
    if (this.lives >= 0) {
      this.lives += -hit;

      if (this.lives < 0) {
        twdGrid.money += this.reward;
      }
    }
  };

  this.draw = function () {
    if (this.lives <= 0) {
      //Died

      if (!this.died) {
        twdGrid.explosions.push(new Explosion(this.drawx, this.drawy, 0));
        this.died = true;
      }

      return false;
    }

    twdGrid.render(
      twdImages.enemies[this.imageIndex].images[this.angle],
      Math.round(this.drawx) + mainCanvasXOffset,
      Math.round(this.drawy) + mainCanvasYOffset,
    );
  };

  this.calculate = function () {
    if (this.lives <= 0) {
      return false;
    }

    var oldDrawx = this.drawx;
    var oldDrawy = this.drawy;

    if (
      Math.abs(this.drawx - twdGrid.route[this.routeindex].drawx) < 5 &&
      Math.abs(twdGrid.route[this.routeindex].drawy - this.drawy) < 5
    ) {
      if (this.routeindex != 0) {
        this.routeindex += -1;
      }

      if (this.routeindex - 1 >= 0) {
        if (
          twdGrid.route[this.routeindex - 1].y !=
            twdGrid.route[this.routeindex + 1].y &&
          twdGrid.route[this.routeindex - 1].x !=
            twdGrid.route[this.routeindex + 1].x
        ) {
          this.docurve = true;
          this.isRight = true;
          this.curveStartx = twdGrid.route[this.routeindex + 1].drawx;
          this.curveStarty = twdGrid.route[this.routeindex + 1].drawy;

          this.curveEndx = twdGrid.route[this.routeindex - 1].drawx;
          this.curveEndy = twdGrid.route[this.routeindex - 1].drawy;

          this.bezierx = twdGrid.route[this.routeindex].drawx;
          this.beziery = twdGrid.route[this.routeindex].drawy;

          var startx = twdGrid.route[this.routeindex + 1].x;
          var starty = twdGrid.route[this.routeindex + 1].y;

          var endx = twdGrid.route[this.routeindex - 1].x;
          var endy = twdGrid.route[this.routeindex - 1].y;

          var bezierx = twdGrid.route[this.routeindex].x;
          var beziery = twdGrid.route[this.routeindex].y;

          if (
            startx > endx &&
            starty > endy &&
            starty > beziery &&
            startx == bezierx
          ) {
            this.isRight = false;
          }

          if (
            startx < endx &&
            starty < endy &&
            starty < beziery &&
            startx == bezierx
          ) {
            this.isRight = false;
          }

          if (
            startx < endx &&
            starty > endy &&
            starty > beziery &&
            startx == bezierx
          ) {
            this.isRight = false;
          }

          if (
            startx > endx &&
            starty < endy &&
            starty < beziery &&
            startx == bezierx
          ) {
            this.isRight = false;
          }
        }
      }
    }

    if (this.docurve) {
      this.drawx = Math.round(
        (1 - this.t) * (1 - this.t) * this.curveStartx +
          2 * (1 - this.t) * this.t * this.bezierx +
          this.t * this.t * this.curveEndx,
      );
      this.drawy = Math.round(
        (1 - this.t) * (1 - this.t) * this.curveStarty +
          2 * (1 - this.t) * this.t * this.beziery +
          this.t * this.t * this.curveEndy,
      );

      this.t += (this.speed / 100) * twdGameLoop.delta;
      if (this.t > 1) {
        this.routeindex += -1;
        this.docurve = false;
        this.t = 0;
      }

      var deltaX = 0;
      var deltaY = 0;

      if (this.isRight) {
        deltaX = this.drawx - this.bezierx;
        deltaY = this.drawy - this.beziery;
      } else {
        deltaX = this.bezierx - this.drawx;
        deltaY = this.beziery - this.drawy;
      }

      var rad = Math.atan2(deltaY, deltaX); // In radians
      this.angle = Math.round((rad * 180) / Math.PI + 180);

      this.angle = 360 - this.angle;
      if (this.angle > 359) {
        this.angle = 0;
      }

      if (this.angle < 0) {
        this.angle = 359;
      }

      //console.log(this.angle);
    }
    if (!this.docurve) {
      if (
        this.drawx + mainCanvasXOffset >
        twdGrid.route[this.routeindex].drawx + mainCanvasXOffset
      ) {
        this.drawx += -this.speed * twdGameLoop.delta;
      }

      if (
        this.drawx + mainCanvasXOffset <
        twdGrid.route[this.routeindex].drawx + mainCanvasXOffset
      ) {
        this.drawx += this.speed * twdGameLoop.delta;
      }

      if (
        this.drawy + mainCanvasYOffset >
        twdGrid.route[this.routeindex].drawy + mainCanvasYOffset
      ) {
        this.drawy += -this.speed * twdGameLoop.delta;
      }

      if (
        this.drawy + mainCanvasYOffset <
        twdGrid.route[this.routeindex].drawy + mainCanvasYOffset
      ) {
        this.drawy += this.speed * twdGameLoop.delta;
      }

      var deltaX = oldDrawx - this.drawx;
      var deltaY = oldDrawy - this.drawy;

      var rad = Math.atan2(deltaY, deltaX); // In radians
      this.angle = Math.round((rad * 180) / Math.PI + 180);
      if (this.angle > 359) {
        this.angle = 0;
      }

      if (this.angle < 0) {
        this.angle = 359;
      }
    }

    //if(angle !=)
    //console.log(angle);
  };

  this.init();
}
