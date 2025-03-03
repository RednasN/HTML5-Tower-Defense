import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progression-circle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './progression-circle.component.scss',
  templateUrl: './progression-circle.component.html',
})
export class ProgressionCircleComponent implements OnInit {
  @Input({ required: true }) progression = 20;
  @Input() image: string | null = null;

  public ngOnInit(): void {
    console.log('show dialog');
  }
}
