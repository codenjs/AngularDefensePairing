import { browser, $, $$, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return $('app-depth-chart-players h3').getText() as Promise<string>;
  }

  depthChart() {
    return $$('app-depth-chart-players li').map(e => e.getText()) as Promise<string[]>;
  }

  newName() {
    return $('app-depth-chart-players input') as ElementFinder;
  }

  addButton() {
    return $('app-depth-chart-players button') as ElementFinder;
  }

  errorMessageText() {
    return $('.validation-alert').getText() as Promise<string>;
  }
}
