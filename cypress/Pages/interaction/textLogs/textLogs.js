export class textLogs {
  constructor(endpoint = '/api/v2/receptionist-dashboard/text-logs', method = 'GET') {
    if (typeof endpoint !== 'string') {
      throw new Error('Invalid parameter: endpoint must be a string');
    }
    this.endpoint = endpoint;
    this.method = method;
    this.alias = 'textLogs';
  }

  intercept() {
    cy.intercept(this.method, this.endpoint).as(this.alias);
  }

  wait() {
    cy.wait(`@${this.alias}`, { timeout: 200000 }).its('response.statusCode').should('eq', 200);
    cy.wait(`@${this.alias}`, { timeout: 200000 }).its('response.statusCode').should('eq', 200);
  }
}
