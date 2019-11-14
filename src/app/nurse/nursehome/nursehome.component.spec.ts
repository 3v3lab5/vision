import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NursehomeComponent } from './nursehome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, MatGridListModule, MatProgressBarModule, MatExpansionModule } from '@angular/material';
import { RoundPipe } from 'src/app/pipes/round.pipe';

describe('NursehomeComponent', () => {
  let component: NursehomeComponent;
  let fixture: ComponentFixture<NursehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule,
        MatGridListModule,
        MatExpansionModule,
        MatProgressBarModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        FlexLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      declarations: [ NursehomeComponent,RoundPipe ]
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
