import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';

import { Cell } from '../../models/grid/grid';
import { CanvasService } from '../../services/game/canvas.service';
import { GridService } from '../../services/game/grid.service';
import { MenuService } from '../../services/game/menu.service';

@Component({
  selector: 'app-game-canvas',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-canvas.component.html',
})
export class GameCanvasComponent implements OnInit {
  title = 'TowerDefense';

  private readonly canvasService = inject(CanvasService);
  private readonly menuService = inject(MenuService);
  private readonly gridService = inject(GridService);

  public ngOnInit(): void {
    this.canvasService.initialize();

    this.addTouchStartListener();
    this.addTouchMoveListener();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(): void {
    this.canvasService.calculateSize();
  }

  private addTouchStartListener(): void {
    this.canvasService.mainCanvas.addEventListener('touchstart', e => {
      this.canvasService.mainCanvasYCurrent = e.targetTouches[0].pageY / this.canvasService.scaleToFit;
      this.canvasService.mainCanvasXCurrent = e.targetTouches[0].pageX / this.canvasService.scaleToFit;

      this.gridService.selectedCell = this.getClickedCell();
    });
  }

  private addTouchMoveListener(): void {
    this.canvasService.mainCanvas.addEventListener('touchmove', e => {
      this.canvasService.move(e.targetTouches[0].pageX, e.targetTouches[0].pageY);

      e.preventDefault();
    });
  }

  private getClickedCell(): Cell | null {
    for (const row of this.gridService.grid) {
      for (const cell of row) {
        const startx = cell.drawx + this.canvasService.mainCanvasXOffset;
        const starty = cell.drawy + this.canvasService.mainCanvasYOffset;

        if (
          this.canvasService.mainCanvasXCurrent > startx &&
          this.canvasService.mainCanvasXCurrent < startx + cell.width &&
          this.canvasService.mainCanvasYCurrent > starty &&
          this.canvasService.mainCanvasYCurrent < starty + cell.height
        ) {
          return cell;
        }
      }
    }
    return null;
  }
}
