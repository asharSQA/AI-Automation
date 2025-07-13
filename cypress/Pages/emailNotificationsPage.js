import { Interaction } from './interaction/interaction';

const interaction = new Interaction();

export class emailNotificationsPage {
  constructor() {
    before(() => {
      cy.fixture('interactionTexts.json').then(data => {
        this.testData = data;
      });
    });
  }

  callsEmailNotifications() {
    interaction.loaderShouldDisappear();
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddEmailByPosition('first');
    cy.task('createInbox').then(({ emailAddress: registerEmail }) => {
      interaction.fields.addemailfield().click().type(registerEmail, { delay: 0 });
    });
    interaction.button.create.click();
    interaction.button.submitButton.click();
  }

  assertcaller() {
    cy.get('body').should('contain.text', 'Caller');
  }

  assertCallSummary() {
    cy.get('body').should('contain.text', 'Call Summary');
  }

  assertFullTranscript() {
    cy.get('body').should('contain.text', 'Full Transcript');
  }

  callsEmailNotificationsCheck() {
    cy.wrap(null).then(() => {
      const emailAddress = Cypress.env('emailAddress');
      cy.task('waitForEmail', {
        email: emailAddress,
        subject: 'My AI Front Desk | Notification: A Call interaction with',
        timeout: 240000,
      }).then(email => {
        expect(email).to.exist;
        cy.document().invoke('write', email.html.body);
        this.assertcaller();
        this.assertFullTranscript();
      });
    });
  }

  voicemailEmailNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddEmailByPosition('second');
    cy.task('createInbox').then(({ emailAddress: registerEmail }) => {
      interaction.fields.addemailfield().click().type(registerEmail, { delay: 0 });
    });
    interaction.button.create.click();
    interaction.button.submitButton.click();
  }

  voicemailEmailNotificationsCheck() {
    cy.wrap(null).then(() => {
      const emailAddress = Cypress.env('emailAddress');
      cy.task('waitForEmail', {
        email: emailAddress,
        subject: '',
        timeout: 240000,
      }).then(email => {
        expect(email).to.exist;
        cy.document().invoke('write', email.html.body);
      });
    });
  }

  assertSender() {
    cy.get('body').should('contain.text', 'Sender');
  }

  assertVoicemail() {
    cy.get('body').should('contain.text', 'Voicemail');
  }

  robocallEmailNotifications() {
    interaction.button.configure.click();
    interaction.button.notifications.click();
    cy.wait(10000);
    interaction.button.clickAddEmailByPosition('last');
    cy.task('createInbox').then(({ emailAddress: registerEmail }) => {
      interaction.fields.addemailfield().click().type(registerEmail, { delay: 0 });
    });
    interaction.button.create.click();
    interaction.button.submitButton.click();
  }

  robocallEmailNotificationsCheck() {
    cy.wrap(null).then(() => {
      const emailAddress = Cypress.env('emailAddress');
      cy.task('waitForEmail', {
        email: emailAddress,
        subject: '',
        timeout: 240000,
      }).then(email => {
        expect(email).to.exist;
        cy.document().invoke('write', email.html.body);
      });
    });
  }

  customScenarioEmailNotifications() {
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
    interaction.button.customNotificationAddEmailButton.click();
    cy.task('createInbox').then(({ emailAddress: registerEmail }) => {
      interaction.fields.notificationCustomScenarioEmailField().click({ force: true });
      cy.wait(2000);
      interaction.fields.notificationCustomScenarioEmailField().type(registerEmail, { delay: 20 });
    });
    interaction.button.create.click();
    interaction.button.submitButton.click();
  }

  assertWorkflow() {
    cy.get('body').should('contain.text', 'Workflow Triggered');
    cy.get('body').should('contain.text', `Scenario: ${this.testData.customNotificationScenario}`);
  }

  customScenarioCallsEmailNotificationsCheck() {
    cy.wrap(null).then(() => {
      const emailAddress = Cypress.env('emailAddress');
      cy.task('waitForEmail', {
        email: emailAddress,
        subject: 'My AI Front Desk | Notification: A Custom Scenario Triggered on Call',
        timeout: 240000,
      }).then(email => {
        expect(email).to.exist;
        cy.document().invoke('write', email.html.body);
        this.assertcaller();
        this.assertFullTranscript();
        this.assertWorkflow();
      });
    });
  }
}
