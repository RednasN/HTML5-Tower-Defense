class TowerDefenseTower {
    constructor(id, name, type, costs, speed, range, damage, projectilescount, methodCalculate, methodShoot, methodFindEnemies, methodFindEnemy) {
        //Basic properties.
        this.id = id;
        this.name = name;
        this.type = type;
        this.costs = costs;
        this.speed = speed;
        this.range = range;
        this.damage = damage;
        this.projectilescount = projectilescount;

        //Global properties.
        this.projectile = null;
        this.barrels = null;
        this.image = null;

        //Game properties
        this.buildx = null;
        this.buildy = null;

        this.powerLevel = null;
        this.speedLevel = null;
        this.rangeLevel = null;

        this.angle = null;
        this.focusedEnemy = null;
        this.focusedEnemies = [];
        this.lastFired = 0;

        //Game functionnames 
        this.methodCalculate = methodCalculate;
        this.methodShoot = methodShoot;
        this.methodFindEnemy = methodFindEnemy;
        this.methodFindEnemies = methodFindEnemies;
    }

    doShootSingle() {
        var projectile = this.copyInstanceStack(this.projectile);

        projectile.focusedEnemy = this.focusedEnemy;
        projectile.tower = this;
        projectile.init();

        twdGame.projectiles.push(projectile);
    }

    doShootMultiple()
    {
        if(this.methodFindEnemies == null || this.methodFindEnemies == "")
        {
            this.focusedEnemies.push(this.focusedEnemy);
        }
        else
        {
            //find multiple enemies if not already searched.
            this[this.methodFindEnemies]();

            for(var i = 0;i < this.projectilescount; i++)
            {    
                var enemy = this.focusedEnemies[this.randomIntFromInterval(0, this.focusedEnemies.length-1)];
                
                var projectile = this.copyInstanceStack(this.projectile);
                projectile.focusedEnemy = enemy;
                projectile.tower = this;
                projectile.init();

                twdGame.projectiles.push(projectile);
            }

            //Clear enemies for next round.
            this.focusedEnemies = [];

        }
    }

    randomIntFromInterval(min,max)
    {
        max = max-1;
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    copyInstanceStack(original) {
        var copied = Object.assign(
            Object.create(
                Object.getPrototypeOf(original)
            ),
            original
        );
        return copied;
    }

    canShoot() {
        this.lastFired += twdGameLoop.delta * 1000;

        if (this.focusedEnemy != null) {
            if (this.lastFired > this.speed - ((this.speedLevel * 10) * (this.speed / 100))) {
                this[this.methodShoot]();
                this.lastFired = 0;
            }
        }
    }

    doCalculateInfiniteRotate() {

        this.angle += 35 * twdGameLoop.delta;
        if(this.angle > 359)
        {
            this.angle = 0;
        } 
        
        this[this.methodFindEnemy]();

        //this.findClosest();

        //if(this.focusedIndex != -1 && !this.isInRange(this.focusedIndex))
        //{
        //    this.focusedIndex = -1;
        //}

        this.canShoot();
    }

    

    //Default calculate method when 
    doCalculateAngle() {
        this[this.methodFindEnemy]();

        if (this.focusedEnemy != null && !this.isInRange(this.focusedEnemy)) {
            this.focusedEnemy = null;
            this.locked = false;
        }

        if (this.focusedEnemy != null) {
            var cellHeight = twdGraphics.cellHeight / 2;
            var cellWidth = twdGraphics.cellWidth / 2;

            var enemeyCenterX = this.focusedEnemy.drawx + cellWidth;
            var enemeyCenterY = this.focusedEnemy.drawy + cellHeight;

            var turretCenterX = this.buildx * twdGraphics.cellWidth + cellWidth;
            var turretCenterY = this.buildy * twdGraphics.cellHeight + cellHeight;

            var deltaX = turretCenterX - enemeyCenterX;
            var deltaY = turretCenterY - enemeyCenterY;

            var rad = Math.atan2(deltaY, deltaX);

            var angleDest = Math.round(rad * 180 / Math.PI + 180);

            if (!this.locked) {
                //Math.fmod(1,1);
                var diff = angleDest - this.angle;
                if (diff < 0) {
                    diff += 360;
                }
                if (diff > 180) {
                    this.angle += - (100 * twdGameLoop.delta);
                }
                else {
                    this.angle += (100 * twdGameLoop.delta);
                }
            }
            else {
                this.angle = angleDest;
            }

            this.angle = (this.angle > 359) ? 0 : this.angle;
            this.angle = (this.angle < 0) ? 359 : this.angle;

            if (Math.abs(angleDest - this.angle) < 5) {
                this.locked = true;
            }

            if (this.locked) {
                this.canShoot();
            }
        }
    }

    doFindClosests() {
        if (this.focusedEnemies.length == 0) {
            for (var i = 0; i < twdGame.enemies.length; i++) {
                if (this.isInRange(twdGame.enemies[i])) {
                    this.focusedEnemies.push(twdGame.enemies[i]);
                }
            }
        }
    }

    doFindClosest() {
        if (this.focusedEnemy == null) {
            var shortestRoute = -1;
            var shortestIndex = null;

            for (var i = 0; i < twdGame.enemies.length; i++) {
                if (this.isInRange(twdGame.enemies[i])) {
                    if (shortestRoute == -1 && shortestIndex == null) {
                        shortestRoute = twdGame.enemies[i].routeIndex;
                        shortestIndex = twdGame.enemies[i];
                    }

                    if (twdGame.enemies[i].routeIndex > shortestRoute) {
                        shortestRoute = twdGame.enemies[i].routeIndex;
                        shortestIndex = twdGame.enemies[i];
                    }
                }
            }

            if (shortestIndex != null) {
                this.focusedEnemy = shortestIndex;
            }
        }
    }

    isInRange(enemy) {
        //console.log(this.rangeLevel);
        if (enemy.lives <= 0) {
            return false;
        }

        var startx = this.buildx * twdGraphics.cellWidth;
        var starty = this.buildy * twdGraphics.cellHeight;

        var cellWidth = twdGraphics.cellWidth / 2;
        var cellHeight = twdGraphics.cellHeight / 2;

        var x0 = startx + cellWidth;
        var y0 = starty + cellHeight;

        var x1 = enemy.drawx + cellWidth;
        var y1 = enemy.drawy + cellHeight;

        if (Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < (this.range + (this.range / 100 * this.rangeLevel * 10))) {
            return true;
        }
        return false;
    }
}