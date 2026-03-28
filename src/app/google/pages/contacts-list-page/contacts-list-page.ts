import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactsList } from '../../components/contacts-list/contacts-list';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-contacts-list-page',
  imports: [ContactsList, JsonPipe],
  templateUrl: './contacts-list-page.html',
  styleUrl: './contacts-list-page.scss',
})
export class ContactsListPage {
  private readonly peopleService = inject(PeopleService);
  readonly connectionsRes = this.peopleService.connectionsResource();
}