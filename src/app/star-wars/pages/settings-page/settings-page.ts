import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormField, form, submit } from '@angular/forms/signals';

@Component({
  selector: 'app-settings-page',
  imports: [FormField],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  protected readonly form = form(signal({ songUrl: '', startingTime: 0 }));

  protected save(): void {
    submit(this.form, async (form) => {
      localStorage.setItem('sw-settings', JSON.stringify(form().value()));
    });
  }

  protected reset(): void {
    this.form.songUrl().value.set('');
    this.form.startingTime().value.set(0);
  }
}
