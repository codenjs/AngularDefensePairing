import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartListComponent } from './depth-chart-list.component';
import { DepthChartAddComponent } from '../depth-chart-add/depth-chart-add.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DepthChartListComponent', () => {
  let component: DepthChartListComponent;
  let fixture: ComponentFixture<DepthChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepthChartListComponent, DepthChartAddComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
