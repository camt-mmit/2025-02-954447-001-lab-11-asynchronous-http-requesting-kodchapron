import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fetchResource } from '../../helpers';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';

@Component({
  selector: 'app-planet-view',
  imports: [RouterLink, AsyncPipe, DatePipe, DecimalPipe, ExtractIdPipe],
  templateUrl: './planet-view.html',
  styleUrl: './planet-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetView {
  readonly data = input.required<Planet>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  protected readonly asyncData = computed(() => ({
    residents: this.data().residents.map((url) => fetchResource<Person>(url)),
    films: this.data().films.map((url) => fetchResource<Film>(url)),
  }));
}
