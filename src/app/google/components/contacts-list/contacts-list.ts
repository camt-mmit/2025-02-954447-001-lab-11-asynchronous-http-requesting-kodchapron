import { Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Person } from '../../types/google/people';

@Component({
  selector: 'app-contacts-list',
  imports: [RouterLink],
  templateUrl: './contacts-list.html',
  styleUrl: './contacts-list.scss',
})
export class ContactsList {
  readonly connections = input.required<readonly Person[]>();

  readonly searchQuery = signal('');

  readonly filtered = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.connections();

    return this.connections().filter((p) => {
      const name = p.names?.[0]?.displayName?.toLowerCase() ?? '';
      const emails = p.emailAddresses?.map((e) => e.value?.toLowerCase()).join(' ') ?? '';
      const phones = p.phoneNumbers?.map((p) => p.value).join(' ') ?? '';
      return name.includes(q) || emails.includes(q) || phones.includes(q);
    });
  });

  clearSearch(): void {
    this.searchQuery.set('');
  }
}