export class CaptchaBypass {
  constructor(endpoint = '/api/v2/receptionist-dashboard/captcha/verify', response = { success: true }) {
    if (typeof endpoint !== 'string' || typeof response !== 'object' || Array.isArray(response)) {
      throw new Error('Invalid parameters: endpoint must be a string and response must be an object');
    }
    this.endpoint = endpoint;
    this.response = response;
  }

  intercept() {
    cy.intercept('POST', this.endpoint, {
      statusCode: 200,
      body: this.response,
    }).as('captchaBypass');
  }

  wait() {
    cy.wait('@captchaBypass');
  }
}
