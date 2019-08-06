import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { DepthChartAddComponent } from './depth-chart-add.component';
import { DepthChartModule } from '../depth-chart.module';
import { DepthChartService } from '../depth-chart.service';
import { SharedModule } from 'src/app/shared/shared.module';

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
      imports: [ DepthChartModule, SharedModule ],
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

describe('DepthChartAddComponent invalidCharacterValidator', () => {
  let component: DepthChartAddComponent;
  let fixture: ComponentFixture<DepthChartAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DepthChartModule, SharedModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const validate = (inputName: string) => {
    return component.invalidCharacterValidator()(new FormControl(inputName));
  };

  it('should return null when all characters in the name are valid', () => {
    const result = validate('Name1');
    expect(result).toBeNull();
  });

  it('should return an error message when the name contains a slash', () => {
    const result = validate('Name/1');
    expect(result.invalidCharacter.value).toBe('Invalid character: /');
  });
});

class Page {
  // getter properties wait to query the DOM until called.
  get nameInput() { return this.query<HTMLInputElement>('input'); }
  get addButton() { return this.query<HTMLButtonElement>('button'); }

  get errorMessageElement() { return this.query<HTMLElement>('.validation-alert'); }
  get errorMessage() { return this.errorMessageElement.textContent.trim(); }
  get errorMessageVisible() { return this.errorMessageElement; }

  constructor(private fixture: ComponentFixture<DepthChartAddComponent>) {
  }

  setName(input: string): void {
    const nameInput = this.nameInput;
    nameInput.value = input;
    nameInput.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }

  clickAdd(): void {
    this.addButton.click();
    this.fixture.detectChanges();
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }
}

describe('DepthChartAddComponent onSubmit', () => {
  let component: DepthChartAddComponent;
  let fixture: ComponentFixture<DepthChartAddComponent>;
  let page: Page;
  let spyDepthChartService: jasmine.SpyObj<DepthChartService>;

  beforeEach(async(() => {
    const testPlayers = [
      { name: 'Name1' },
      { name: 'Name2' }
    ];
    spyDepthChartService = jasmine.createSpyObj('DepthChartService', ['getPlayers', 'addPlayer']);
    spyDepthChartService.getPlayers.and.returnValue(testPlayers);

    TestBed.configureTestingModule({
      imports: [ DepthChartModule ],
      providers: [ { provide: DepthChartService, useValue: spyDepthChartService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthChartAddComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  const assertNameWasAdded = (name: string) => {
    expect(page.nameInput.value).toBe('');
    expect(spyDepthChartService.addPlayer).toHaveBeenCalledTimes(1);
    expect(spyDepthChartService.addPlayer).toHaveBeenCalledWith(name);
    expect(page.errorMessageVisible).toBeFalsy();
  };

  const assertValidationError = (name: string, errorMessage: string) => {
    expect(page.nameInput.value).toBe(name);
    expect(spyDepthChartService.addPlayer).not.toHaveBeenCalled();
    expect(page.errorMessage).toBe(errorMessage);
  };

  it('should add valid name to depth chart', () => {
    const testName = 'Name3';
    page.setName(testName);
    page.clickAdd();

    assertNameWasAdded(testName);
  });

  it('should add trimmed name to depth chart when name has whitespace', () => {
    const testName = ' Name3 ';
    page.setName(testName);
    page.clickAdd();

    assertNameWasAdded(testName.trim());
  });

  it('should show an error message when name already exists', () => {
    const testName = 'Name1';
    page.setName(testName);
    page.clickAdd();

    assertValidationError(testName, 'Name1 already exists');
  });

  it('should show an error message when name has whitespace but trimmed name already exists', () => {
    const testName = ' Name1 ';
    page.setName(testName);
    page.clickAdd();

    assertValidationError(testName, 'Name1 already exists');
  });

  it('should show an error message when name contains a slash', () => {
    const testName = 'Name/1';
    page.setName(testName);
    page.clickAdd();

    assertValidationError(testName, 'Invalid character: /');
  });

  it('should not do anything when name is empty', () => {
    const testName = '';
    page.setName(testName);
    page.clickAdd();

    expect(page.nameInput.value).toBe(testName);
    expect(spyDepthChartService.addPlayer).not.toHaveBeenCalled();
  });

  it('should not do anything when name is whitespace', () => {
    const testName = ' ';
    page.setName(testName);
    page.clickAdd();

    expect(page.nameInput.value).toBe(testName);
    expect(spyDepthChartService.addPlayer).not.toHaveBeenCalled();
  });
});
