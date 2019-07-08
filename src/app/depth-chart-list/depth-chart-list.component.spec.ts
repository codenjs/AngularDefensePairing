import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthChartListComponent } from './depth-chart-list.component';

describe('DepthChartListComponent', () => {
  let component: DepthChartListComponent;
  let fixture: ComponentFixture<DepthChartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepthChartListComponent ]
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
