export class TwilioCall {
  callSid;

  initiateTwilioCall() {
    const twilioAccountSid = Cypress.env('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Cypress.env('TWILIO_AUTH_TOKEN');
    const fromNumber = Cypress.env('TWILIO_NUMBER');
    const aiNumber = Cypress.env('AI_RECEPTIONIST_NUMBER');
    const twimlUrl = Cypress.env('TWIML_URL');

    cy.request({
      method: 'POST',
      url: `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Calls.json`,
      auth: { username: twilioAccountSid, password: twilioAuthToken },
      form: true,
      body: {
        From: fromNumber,
        To: aiNumber,
        Url: twimlUrl,
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      this.callSid = response.body.sid;
    });
  }

  verifyCallStatus() {
    const twilioAccountSid = Cypress.env('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Cypress.env('TWILIO_AUTH_TOKEN');

    cy.wait(10000).then(() => {
      cy.request({
        method: 'GET',
        url: `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Calls/${this.callSid}.json`,
        auth: { username: twilioAccountSid, password: twilioAuthToken },
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.be.oneOf(['completed', 'in-progress']);
      });
    });
  }
  callusingtwilio() {
    this.initiateTwilioCall();
    this.verifyCallStatus();
  }
}
