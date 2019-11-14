import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfusionHistoryComponent } from './infusion-history.component';

describe('InfusionHistoryComponent', () => {
  let component: InfusionHistoryComponent;
  let fixture: ComponentFixture<InfusionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfusionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfusionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
