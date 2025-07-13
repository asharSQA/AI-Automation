import { Interaction } from '../interaction';

const interaction = new Interaction();
export class callLogs {
  constructor(endpoint = '/api/v2/receptionist-dashboard/call-logs?limit=50', method = 'GET') {
    if (typeof endpoint !== 'string') {
      throw new Error('Invalid parameter: endpoint must be a string');
    }
    this.endpoint = endpoint;
    this.method = method;
    this.alias = 'callLogs';
  }

  intercept() {
    cy.intercept(this.method, this.endpoint).as(this.alias);
  }

  wait() {
    cy.wait(`@${this.alias}`, { timeout: 200000 }).its('response.statusCode').should('eq', 200);
    cy.wait(180000);
    interaction.button.refreshLogs.click();
    cy.wait(`@${this.alias}`, { timeout: 200000 }).its('response.statusCode').should('eq', 200);
  }
}
