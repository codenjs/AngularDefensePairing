import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const initialDepthChart: string[] = ['Claude', 'John', 'Jake', 'Deckard', 'Logan', 'Braeden'];

  beforeEach(() => {
    page = new AppPage();
  });

  it('should add a valid name to existing depth chart then show an error message when the name is added again', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Depth Chart (6)');
    expect(page.depthChart()).toEqual(initialDepthChart);

    const testName = 'NewName1';
    page.newName().sendKeys(testName);
    page.addButton().click();

    const expectedResultDepthChart = [...initialDepthChart]; // clone
    expectedResultDepthChart.push(testName);

    expect(page.depthChart()).toEqual(expectedResultDepthChart);
    expect(page.newName().getAttribute('value')).toBe('');

    page.newName().sendKeys(testName);
    page.addButton().click();

    expect(page.depthChart()).toEqual(expectedResultDepthChart);
    expect(page.newName().getAttribute('value')).toBe(testName);
    expect(page.errorMessageText()).toBe(`${testName} already exists`);
  });

  it('should show an error message when name already exists', () => {
    page.navigateTo();
    expect(page.depthChart()).toEqual(initialDepthChart);

    const testName = 'John';
    page.newName().sendKeys(testName);
    page.addButton().click();

    expect(page.depthChart()).toEqual(initialDepthChart);
    expect(page.newName().getAttribute('value')).toBe(testName);
    expect(page.errorMessageText()).toBe(`${testName} already exists`);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
