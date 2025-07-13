import { Interaction } from './interaction/interaction';

const interaction = new Interaction();
const accountSid = Cypress.env('TWILIO_ACCOUNT_SID');
const authToken = Cypress.env('TWILIO_AUTH_TOKEN');
const expectedFrom = Cypress.env('AI_RECEPTIONIST_NUMBER');
const authHeader = 'Basic ' + btoa(`${accountSid}:${authToken}`);

export class textNotificationsPage {
  constructor() {
    before(() => {
      cy.fixture('interactionTexts.json').then(data => {
        this.testData = data;
      });
    });
  }

  callsTextNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddPhoneByPosition('first');
    interaction.button.notificationAddScenario().click();
    interaction.fields.getaddPhonefield().click({ force: true }).clear().type('+19402914946', { delay: 0 });
    interaction.button.submitButton.click();
  }

  voicemailTextNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddPhoneByPosition('second');
    interaction.fields.getaddPhonefield().click({ force: true }).clear().type('+19402914946', { delay: 0 });
    interaction.button.submitButton.click();
  }

  robocallTextNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddPhoneByPosition('last');
    interaction.fields.getaddPhonefield().click({ force: true }).clear().type('+19402914946', { delay: 0 });
    interaction.button.submitButton.click();
  }

  textNotificationsCheck() {
    const timeout = 240000;
    const interval = 5000;
    const startTime = Date.now();

    const checkMessages = () => {
      cy.request({
        method: 'GET',
        url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        headers: { Authorization: authHeader },
      }).then(response => {
        expect(response.status).to.eq(200);

        const messages = response.body.messages;

        const matchingMessage = messages.find(msg => {
          const messageTime = new Date(msg.date_created).getTime();
          return msg.from === expectedFrom && messageTime >= startTime;
        });

        if (matchingMessage) {
          cy.log(`✅ New message sent from expected number: ${expectedFrom}`);
          cy.log(`📩 Message Body: ${matchingMessage.body}`);
        } else {
          if (Date.now() - startTime < timeout) {
            cy.wait(interval);
            checkMessages();
          } else {
            throw new Error(`❌ New message not received from expected number (${expectedFrom}) within timeout`);
          }
        }
      });
    };

    checkMessages();
  }

  customScenarioTextNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(5000);
    interaction.button.notificationCustomScenarioTab().click();
    interaction.button.saveandRemoveButton('Add Scenario').click();
    interaction.button.notificationAddScenario().click();
    interaction.fields.notificationCustomScenarioField().click({ force: true });
    interaction.fields.notificationCustomScenarioField().type(this.testData.customNotificationScenario, { delay: 0 });
    interaction.button.submitButton.click();
    interaction.button.closeWindow.eq(0).click();
    interaction.button.customNotificationAddPhoneButton.click();
    interaction.button.notificationAddScenario().eq(1).click();
    interaction.fields.getaddPhonefield().click({ force: true });
    cy.wait(500);
    interaction.fields.getaddPhonefield().clear().type('+19402914946', { delay: 0 });
    interaction.button.submitButton.click();
  }

  assertCustomTwilioMessageBody(messageBody) {
    const expectedScenario = this.testData.customNotificationScenario;
    const expectedText = `A custom scenario "${expectedScenario}" triggered`;
    expect(messageBody).to.contain(expectedText);
  }

  assertCustomTextNotificationCheck() {
    const expectedText = `A custom scenario "${this.testData.customNotificationScenario}" triggered`;
    this.textNotificationsCheck();
    cy.request({
      method: 'GET',
      url: `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      headers: { Authorization: authHeader },
    }).then(response => {
      const messages = response.body.messages;
      const matchingMessage = messages.find(msg => msg.from === expectedFrom && msg.body.includes(expectedText));
      cy.wrap(matchingMessage?.body || '').should('contain', expectedText);
    });
  }
}
