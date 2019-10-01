import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NursehomeComponent } from './nursehome.component';

describe('NursehomeComponent', () => {
  let component: NursehomeComponent;
  let fixture: ComponentFixture<NursehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NursehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NursehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
