import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-planet-view-page',
  imports: [],
  templateUrl: './planet-view-page.html',
  styleUrl: './planet-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetViewPage {
  protected moduleRoute = inject(ModuleActivatedRoute);
}
