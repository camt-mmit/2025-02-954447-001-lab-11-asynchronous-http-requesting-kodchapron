import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreatePage } from './contact-create-page';

describe('ContactCreatePage', () => {
  let component: ContactCreatePage;
  let fixture: ComponentFixture<ContactCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
