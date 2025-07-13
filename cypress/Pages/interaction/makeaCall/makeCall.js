export class CallInitiation {
  // Static properties for campaignId and leadId
  static campaignId = 'test-campaign-id';
  static leadId = 'test-lead-id';

  constructor(endpoint = 'https://api.test-environment.com/api/call') {
    if (typeof endpoint !== 'string') {
      throw new Error('Invalid parameter: endpoint must be a string');
    }
    this.endpoint = endpoint;
  }

  initiateCall(token) {
    const requestPayload = {
      campaign_id: CallInitiation.campaignId,
      lead_id: CallInitiation.leadId,
    };

    return cy
      .request({
        method: 'POST',
        url: this.endpoint,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: requestPayload,
        failOnStatusCode: false,
        timeout: 300000,
      })
      .then(response => {
        cy.log(`API Response Status: ${response.status}`);
        cy.log(`Response Body: ${JSON.stringify(response.body)}`);

        if (response.status === 200) {
          cy.log('Call initiated successfully');
        } else {
          throw new Error(`Failed to initiate call. Status: ${response.status}`);
        }
      });
  }
}
