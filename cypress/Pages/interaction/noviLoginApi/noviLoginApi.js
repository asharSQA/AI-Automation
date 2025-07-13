export class LoginApi {
  constructor(endpoint = 'https://api.test-environment.com/api/login') {
    if (typeof endpoint !== 'string') {
      throw new Error('Invalid parameter: endpoint must be a string');
    }
    this.endpoint = endpoint;
    this.authToken = null;
  }

  login() {
    const credentials = Cypress.env('noviCredentials')[0];
    const email = credentials.Email;
    const password = credentials.Password;

    return cy
      .request({
        method: 'POST',
        url: this.endpoint,
        body: {
          email_address: email,
          password: password,
        },
      })
      .then(response => {
        if (response.status === 200 && response.body.auth_token) {
          this.authToken = response.body.auth_token;
          cy.log('Auth token received:', this.authToken);
        } else {
          throw new Error('Failed to retrieve auth token');
        }
      });
  }

  getAuthToken() {
    if (!this.authToken) {
      throw new Error('Auth token is not set. Please login first.');
    }
    return this.authToken;
  }
}
