import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFieldTree } from '../../components/contact-field-tree/contact-field-tree';
import { CreatePersonBody, PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-contact-create-page',
  imports: [ContactFieldTree],
  templateUrl: './contact-create-page.html',
  styleUrl: './contact-create-page.scss',
})
export class ContactCreatePage {
  private readonly peopleService = inject(PeopleService);
  private readonly router = inject(Router);

  readonly dirty = signal(false);

  async onSave(body: CreatePersonBody): Promise<void> {
    await this.peopleService.createContact(body);
    this.dirty.set(false);
    this.router.navigate(['/google/people']);
  }

  onCancel(): void {
    this.router.navigate(['/google/people']);
  }
}