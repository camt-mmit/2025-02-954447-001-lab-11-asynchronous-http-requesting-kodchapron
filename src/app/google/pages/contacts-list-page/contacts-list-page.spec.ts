import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsListPage } from './contacts-list-page';

describe('ContactsListPage', () => {
  let component: ContactsListPage;
  let fixture: ComponentFixture<ContactsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
