import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { DepthChartAddComponent } from './depth-chart-add.component';
import { DepthChartModule } from '../depth-chart.module';
import { DepthChartService } from '../depth-chart.service';

describe('DepthChartAddComponent duplicateNameValidator', () => {
  let component: DepthChartAddComponent;
  let fixture: ComponentFixture<DepthChartAddComponent>;
  let mockDepthChartService: Partial<DepthChartService>;

  beforeEach(async(() => {
    const stubDepthChartService = { getPlayers: () => [
      { name: 'Name1' },
      { name: 'Name2' }
    ]};

    TestBed.configureTestingModule({
      imports: [ DepthChartModule ],
      providers: [ { provide: DepthChartService, useValue: stubDepthChartService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockDepthChartService = TestBed.get(DepthChartService);
  });

  const validate = (inputName: string) => {
    return component.duplicateNameValidator()(new FormControl(inputName));
  };

  it('should return null when the name does not already exist', () => {
    const result = validate('Name3');
    expect(result).toBeNull();
  });

  it('should return an error message when the name already exists', () => {
    const result = validate('Name1');
    expect(result.duplicateName.value).toBe('Name1 already exists');
  });

  it('should return an error message when the name has whitespace but trimmed name already exists', () => {
    const result = validate(' Name1 ');
    expect(result.duplicateName.value).toBe('Name1 already exists');
  });

  it('should return null when no names already exist', () => {
    mockDepthChartService.getPlayers = () => [];
    const result = validate('Name1');
    expect(result).toBeNull();
  });
});
