import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(url: string): Promise<unknown> {
    return browser.get(url);
  }

  async getPageTitle(): Promise<string> {
    return element(by.css('app-root h1')).getText();
  }

  async getTaskListItems() {
    return element.all(by.css('.task-item'));
  }

  async fillTaskForm(title: string, description: string, status: string) {
    await element(by.css('input[formControlName="title"]')).sendKeys(title);
    await element(by.css('textarea[formControlName="description"]')).sendKeys(description);
    await element(by.css('mat-select[formControlName="status"]')).click();
    await element(by.css(`mat-option[value="${status}"]`)).click();
  }

  async submitTaskForm() {
    await element(by.css('button[type="submit"]')).click();
  }

  async getSuccessMessage(): Promise<string> {
    return element(by.css('.success-message')).getText();
  }
}