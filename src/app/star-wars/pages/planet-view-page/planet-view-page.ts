import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';
import { PlanetView } from '../../components/planet-view/planet-view';
import { planetResource } from '../../helpers';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-planet-view-page',
  imports: [PlanetView],
  templateUrl: './planet-view-page.html',
  styleUrl: './planet-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetViewPage {
  readonly id = input.required<string>();

  protected readonly resource = planetResource(() => this.id()).asReadonly();
  protected readonly moduleRoute = inject(ModuleActivatedRoute);

  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
