import { Injectable, inject } from '@angular/core';

import { Explosion, ExplosionType } from '../../models/side-effects/explosion.model';
import { ImageService } from '../game/image.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultExplosionService {
  private readonly imageService = inject(ImageService);

  public create(x: number, y: number, explosionIndex: number): Explosion {
    return {
      type: ExplosionType.Default,
      explosionLength: this.imageService.explosions[explosionIndex].images.length,
      ticsPerFrame: 5,
      currentTick: 20,
      explosionIndex: 0,
      explosionListIndex: explosionIndex,
      drawx: x,
      drawy: y,
    };
  }

  public calculate(explosion: Explosion): void {
    if (explosion.explosionIndex < explosion.explosionLength) {
      explosion.currentTick--;

      if (explosion.currentTick === 0) {
        explosion.explosionIndex++;
        explosion.currentTick = explosion.ticsPerFrame;
      }
    }
  }
}
