import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartAddComponent } from './depth-chart-add.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DepthChartAddComponent', () => {
  let component: DepthChartAddComponent;
  let fixture: ComponentFixture<DepthChartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepthChartAddComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
