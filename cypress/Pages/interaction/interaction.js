import { CaptchaBypass } from './captchaVerification/captchaVerification';
import RandomNameGenerator from './randomName/randomNames';
import { Button } from './button/button';
import { fields } from './fields/fields';
import { CallInitiation } from './makeaCall/makeCall';
import { LoginApi } from './noviLoginApi/noviLoginApi';
export class Interaction {
  constructor() {
    this.captcha = new CaptchaBypass();
    this.RandomNameGenerator = new RandomNameGenerator();
    this.button = new Button();
    this.fields = new fields();
    this.CallInitiation = new CallInitiation();
    this.LoginApi = new LoginApi();
  }

  loaderShouldDisappear() {
    return cy.get('.ant-spin-dot.ant-spin-dot-spin', { timeout: 100000 }).should('not.exist').wait(200);
  }
  loadingScreenShouldDisappear() {
    cy.get('.loading-screen', { timeout: 100000 }).should('not.exist').wait(200);
  }
}
