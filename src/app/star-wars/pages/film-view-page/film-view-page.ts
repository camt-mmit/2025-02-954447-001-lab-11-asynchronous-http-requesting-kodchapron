import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FilmView } from '../../components/film-view/film-view';
import { filmResource } from '../../helpers';
import { ModuleActivatedRoute } from '../../tokens';

@Component({
  selector: 'app-film-view-page',
  imports: [FilmView],
  templateUrl: './film-view-page.html',
  styleUrl: './film-view-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmViewPage {
  readonly id = input.required<string>();

  protected readonly resource = filmResource(() => this.id()).asReadonly();
  protected readonly moduleRoute = inject(ModuleActivatedRoute);

  private readonly location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }
}
