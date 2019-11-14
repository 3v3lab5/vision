import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have the title Dripo care', () => {
    //page.navigateTo();
    browser.get('http://localhost:4200/guest/login');
    expect(browser.getTitle()).toContain('Dripo Care');
  });
  it('should be able to navigate to register,forgotpassword and login', () => {
    element(by.buttonText('Login')).click();
    element(by.buttonText('Register')).click();
    element(by.buttonText('Login')).click();
    element(by.buttonText('Forgot Password')).click();
    element(by.buttonText('Login')).click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/guest/login");  
  });

  it('should have the url guest/login', () => {
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/guest/login");  
  });

  it('should be able to fill username and password', () => {
    element(by.css("input[formControlName=userName]")).sendKeys('nurse@evelabs.care');
    element(by.css("input[formControlName=password]")).sendKeys('password');
    element(by.id('loginButton')).click();
    expect(browser.getCurrentUrl()).toEqual("http://localhost:4200/nurse/selectstation");  

  });



  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
