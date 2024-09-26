import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Task Management App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display task list', async () => {
    await page.navigateTo('/tasks');
    expect(await page.getPageTitle()).toEqual('Tasks');    
  });

  it('should create a new task', async () => {
    await page.navigateTo('/tasks/new');
    await page.fillTaskForm('New E2E Task', 'This is a task created by E2E test', 'pending');
    await page.submitTaskForm();
    expect(await page.getSuccessMessage()).toContain('Task created successfully');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

