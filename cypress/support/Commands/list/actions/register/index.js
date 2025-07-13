import { CaptchaBypass } from '../../../../../Pages/interaction/captchaVerification/captchaVerification';

const register = {
  name: 'ACTION/REGISTER',
  callback: () => {
    const captcha = new CaptchaBypass();
    captcha.intercept(); // Set up CAPTCHA interception
    cy.get('#businessName').type('Testing');
    cy.get('#businessType').click();
    cy.get('.ant-select-item-option-content').eq(0).click();
    cy.contains('#hasWebsite > :nth-child(1)', 'Yes, we have a website').click();
    cy.get('input[placeholder="e.g. valleyautodealership.com"].ant-input').type('https://example.com', {
      force: true,
    });
    cy.get('.ant-form-item-control-input-content > .ant-btn').click();
    captcha.wait(); // Wait for CAPTCHA bypass before proceeding
    cy.contains('div.flex > span', '100', { timeout: 100000 }).should('be.visible');
  },
  get call() {
    return this.name;
  },
};

export default register;
