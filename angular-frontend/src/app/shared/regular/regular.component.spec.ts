import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularComponent } from './regular.component';

describe('RegularComponent', () => {
  let component: RegularComponent;
  let fixture: ComponentFixture<RegularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularComponent]
    });
    fixture = TestBed.createComponent(RegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
