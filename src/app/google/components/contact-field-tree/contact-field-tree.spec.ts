import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFieldTree } from './contact-field-tree';

describe('ContactFieldTree', () => {
  let component: ContactFieldTree;
  let fixture: ComponentFixture<ContactFieldTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactFieldTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFieldTree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
