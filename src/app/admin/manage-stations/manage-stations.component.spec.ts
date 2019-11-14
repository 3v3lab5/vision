import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStationsComponent } from './manage-stations.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatDialogModule } from '@angular/material';


describe('ManageStationsComponent', () => {
  let component: ManageStationsComponent;
  let fixture: ComponentFixture<ManageStationsComponent>;

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
      declarations: [ ManageStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
