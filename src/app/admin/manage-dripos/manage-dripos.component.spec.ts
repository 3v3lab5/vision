import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDriposComponent } from './manage-dripos.component';

describe('ManageDriposComponent', () => {
  let component: ManageDriposComponent;
  let fixture: ComponentFixture<ManageDriposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDriposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDriposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
