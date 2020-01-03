import { browser, $, $$, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return $('app-depth-chart-players h3').getText() as Promise<string>;
  }

  depthChart() {
    return $$('app-depth-chart-players li')
      .map(e => e.getText()
                 .then(t => t.replace('highlight_off', '').trim())
          ) as Promise<string[]>;
  }

  newName() {
    return $('.depth-chart-add-container input') as ElementFinder;
  }

  addButton() {
    return $('.depth-chart-add-container button') as ElementFinder;
  }

  errorMessageText() {
    return $('.app-validation-alert').getText() as Promise<string>;
  }

  addNameToDepthChart(name: string) {
    this.newName().sendKeys(name);
    this.addButton().click();
  }

  addNamesToDepthChart(names: string[]) {
    names.forEach(name => {
      this.addNameToDepthChart(name);
    });
  }
}
