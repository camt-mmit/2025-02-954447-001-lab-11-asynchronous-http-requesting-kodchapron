import { AsyncPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // เพิ่ม
import { inject } from '@angular/core'; // เพิ่ม
import { fetchResource } from '../../helpers';
import { ExtractIdPipe } from '../../pipes/extract-id-pipe';
import { Film, Person, Planet } from '../../types';

const EPISODE_TRAILERS: Record<number, string> = {
  1: 'bD7bpG-zDJQ',
  2: 'gYbW1F_c9eM',
  3: 'yEXWiXzS7xE',
  4: 'vZ734NWnAHA',
  5: 'JNwNXF9Y6kY',
  6: 'Ride-tFNh83A',
  7: 'sGbxmsDFVnE',
};

@Component({
  selector: 'app-film-view',
  imports: [RouterLink, AsyncPipe, DatePipe, ExtractIdPipe],
  templateUrl: './film-view.html',
  styleUrl: './film-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmView {
  readonly data = input.required<Film>();
  readonly moduleRoute = input.required<ActivatedRoute>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly trailerUrl = computed<SafeResourceUrl | null>(() => {
    const id = EPISODE_TRAILERS[this.data().episode_id];
    return id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
      : null;
  });

  protected readonly asyncData = computed(() => ({
    characters: this.data().characters.map((url) => fetchResource<Person>(url)),
    planets: this.data().planets.map((url) => fetchResource<Planet>(url)),
  }));
}
