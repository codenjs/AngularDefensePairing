import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DepthChartListComponent } from './depth-chart/depth-chart-list/depth-chart-list.component';
import { DepthChartAddComponent } from './depth-chart/depth-chart-add/depth-chart-add.component';
import { DepthChartPlayersComponent } from './depth-chart/depth-chart-players/depth-chart-players.component';
import { DepthChartPairingsComponent } from './depth-chart/depth-chart-pairings/depth-chart-pairings.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        DepthChartListComponent,
        DepthChartAddComponent,
        DepthChartPlayersComponent,
        DepthChartPairingsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AngularDefensePairing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AngularDefensePairing');
  });
});
