import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  let initialDepthChart: string[];

  beforeAll(() => {
    page = new AppPage();
    page.navigateTo();

    const preloadDepthChart: string[] = ['Claude', 'John', 'Jake'];
    page.addNamesToDepthChart(preloadDepthChart);
    expect(page.depthChart()).toEqual(preloadDepthChart);
  });

  beforeEach(async () => {
    initialDepthChart = await page.depthChart();
    page.newName().clear();
  });

  it('should add a valid name to existing depth chart then show an error message when the name is added again', () => {
    expect(page.getTitleText()).toEqual(`Depth Chart (${initialDepthChart.length})`);

    const testName = 'NewName1';
    page.addNameToDepthChart(testName);

    const expectedResultDepthChart = [...initialDepthChart]; // clone
    expectedResultDepthChart.push(testName);

    expect(page.depthChart()).toEqual(expectedResultDepthChart);
    expect(page.newName().getAttribute('value')).toBe('');

    page.addNameToDepthChart(testName);

    expect(page.depthChart()).toEqual(expectedResultDepthChart);
    expect(page.newName().getAttribute('value')).toBe(testName);
    expect(page.errorMessageText()).toBe(`${testName} already exists`);
  });

  it('should show an error message when name already exists', () => {
    const testName = 'John';
    page.addNameToDepthChart(testName);

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
