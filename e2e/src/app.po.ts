import { browser, by, element, $, $$, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return $('app-depth-chart-list h3').getText() as Promise<string>;
  }

  depthChart() {
    return $$('app-depth-chart-list li').map(e => e.getText()) as Promise<string[]>;
  }

  newName() {
    return $('app-depth-chart-list input') as ElementFinder;
  }

  addButton() {
    return $('app-depth-chart-list button') as ElementFinder;
  }

  errorMessageText() {
    return $('.validation-alert').getText() as Promise<string>;
  }
}
