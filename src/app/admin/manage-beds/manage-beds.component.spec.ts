import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBedsComponent } from './manage-beds.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatDialogModule } from '@angular/material';

describe('ManageBedsComponent', () => {
  let component: ManageBedsComponent;
  let fixture: ComponentFixture<ManageBedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule,
        RouterTestingModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        FlexLayoutModule,
        HttpClientModule,
        BrowserAnimationsModule,
        Ng2SearchPipeModule,
        MatDialogModule
      ],
      declarations: [ ManageBedsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
