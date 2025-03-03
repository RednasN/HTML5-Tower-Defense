import { Injectable, inject } from '@angular/core';

import { delta } from '../../models/constants';
import { ProjectileType, Rocket } from '../../models/projectiles/projectile.model';
import { EnemyService } from '../enemies/enemy.service';
import { GridService } from '../game/grid.service';

@Injectable({
  providedIn: 'root',
})
export class SlowRocketService {
  private readonly gridServcie = inject(GridService);
  private readonly enemyService = inject(EnemyService);

  public create(x: number, y: number, enemyIndex: number, bulletIndex: number, angle: number, damage: number): Rocket {
    const cellHeight = this.gridServcie.grid[x][y].height / 2;
    const cellWidth = this.gridServcie.grid[x][y].width / 2;

    const centerTurretX = this.gridServcie.grid[x][y].drawx + cellHeight;
    const centerTurretY = this.gridServcie.grid[x][y].drawy + cellWidth;

    const initialX = centerTurretX + 20 * Math.cos((angle * Math.PI) / 180);
    const initialY = centerTurretY + 20 * Math.sin((angle * Math.PI) / 180);

    return {
      type: ProjectileType.Rocket,
      gridX: x,
      gridY: y,
      x: initialX,
      y: initialY,
      enemyIndex,
      bulletIndex,
      angle,
      locked: false,
      needdraw: true,
      damage,
      plusrotation: null,
      steps: 0,
    };
  }

  public calculate(rocket: Rocket): void {
    if (!rocket.needdraw) return;

    const centerEnemyX = this.enemyService.enemies[rocket.enemyIndex].drawx + 25;
    const centerEnemyY = this.enemyService.enemies[rocket.enemyIndex].drawy + 25;

    const deltaX = rocket.x - centerEnemyX;
    const deltaY = rocket.y - centerEnemyY;

    const targetAngle = calculateTargetAngle(deltaX, deltaY);

    if (!rocket.locked) {
      determineRotationDirection(rocket, targetAngle);
      rotateTowardsTarget(rocket, targetAngle);
    } else {
      rocket.angle = targetAngle;
    }

    rocket.angle = normalizeAngle(rocket.angle);

    const speed = rocket.locked ? 200 : 100;
    moveTowardsTarget(rocket, speed);

    if (hasReachedTarget(rocket, centerEnemyX, centerEnemyY)) {
      rocket.needdraw = false;
      this.enemyService.hit(rocket.enemyIndex, rocket.damage);
    }
  }
}

function calculateTargetAngle(deltaX: number, deltaY: number): number {
  const rad = Math.atan2(deltaY, deltaX);
  return Math.round((rad * 180) / Math.PI + 180);
}

function determineRotationDirection(rocket: Rocket, targetAngle: number): void {
  if (rocket.plusrotation === null) {
    const clockwiseSteps = (targetAngle - rocket.angle + 360) % 360;
    const counterClockwiseSteps = (rocket.angle - targetAngle + 360) % 360;
    rocket.plusrotation = clockwiseSteps <= counterClockwiseSteps; // Choose shortest rotation direction
  }

  if (++rocket.steps > 359) {
    rocket.plusrotation = !rocket.plusrotation; // Reverse direction if needed
    rocket.steps = 0;
  }
}

function rotateTowardsTarget(rocket: Rocket, targetAngle: number): void {
  const rotationSpeed = 175 * delta;
  if (rocket.plusrotation) {
    rocket.angle += rotationSpeed;
  } else {
    rocket.angle -= rotationSpeed;
  }

  // Lock angle if close enough
  if (Math.abs(targetAngle - rocket.angle) < 5) {
    rocket.locked = true;
  }
}

function normalizeAngle(angle: number): number {
  return (angle + 360) % 360;
}

function moveTowardsTarget(rocket: Rocket, speed: number): void {
  const radians = (rocket.angle * Math.PI) / 180;
  rocket.x += delta * speed * Math.cos(radians);
  rocket.y += delta * speed * Math.sin(radians);
}

function hasReachedTarget(rocket: Rocket, centerX: number, centerY: number): boolean {
  return Math.abs(rocket.x - centerX) < 10 && Math.abs(rocket.y - centerY) < 10;
}
