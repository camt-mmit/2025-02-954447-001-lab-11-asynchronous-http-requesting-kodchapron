import { Component, output, signal } from '@angular/core';
import { CreatePersonBody } from '../../services/people.service';

interface EmailEntry { value: string; type: string; }
interface PhoneEntry { value: string; type: string; }

@Component({
  selector: 'app-contact-field-tree',
  templateUrl: './contact-field-tree.html',
  styleUrl: './contact-field-tree.scss',
})
export class ContactFieldTree {
  readonly save = output<CreatePersonBody>();
  readonly cancel = output<void>();

  readonly givenName = signal('');
  readonly familyName = signal('');
  readonly emails = signal<EmailEntry[]>([{ value: '', type: '' }]);
  readonly phones = signal<PhoneEntry[]>([{ value: '', type: '' }]);
  readonly dirty = signal(false);

  addEmail(): void {
    this.emails.update((arr) => [...arr, { value: '', type: '' }]);
  }

  removeEmail(i: number): void {
    if (this.emails().length <= 1) return;
    this.emails.update((arr) => arr.filter((_, idx) => idx !== i));
  }

  updateEmail(i: number, field: keyof EmailEntry, value: string): void {
    this.dirty.set(true);
    this.emails.update((arr) =>
      arr.map((e, idx) => (idx === i ? { ...e, [field]: value } : e)),
    );
  }

  addPhone(): void {
    this.phones.update((arr) => [...arr, { value: '', type: '' }]);
  }

  removePhone(i: number): void {
    if (this.phones().length <= 1) return;
    this.phones.update((arr) => arr.filter((_, idx) => idx !== i));
  }

  updatePhone(i: number, field: keyof PhoneEntry, value: string): void {
    this.dirty.set(true);
    this.phones.update((arr) =>
      arr.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)),
    );
  }

  onSave(): void {
    const body: CreatePersonBody = {
      names: [{ givenName: this.givenName(), familyName: this.familyName() }],
      emailAddresses: this.emails()
        .filter((e) => e.value)
        .map((e) => ({ value: e.value, type: e.type })),
      phoneNumbers: this.phones()
        .filter((p) => p.value)
        .map((p) => ({ value: p.value, type: p.type })),
    };
    this.dirty.set(false);
    this.save.emit(body);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}