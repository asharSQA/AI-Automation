import commands from '../support/Commands/list';
import { Interaction } from '../Pages/interaction/interaction';
import { TwilioCall } from '../Pages/twilioCallPage';

describe('AI Receptionist Interaction via Twilio Call', () => {
  const interaction = new Interaction();
  const twilioCall = new TwilioCall();

  it(`Initiate Twilio call after Login`, () => {
    const [validUser] = Cypress.env('Credentials').filter(user => user.Role === 'Valid Credentials');
    cy[commands.navigate.login.call](1400, 1080);
    cy[commands.actions.login.call](validUser.username, validUser.Password);
    interaction.loadingScreenShouldDisappear();
    interaction.loaderShouldDisappear();
    cy.wait(8000);
    twilioCall.initiateTwilioCall();
    twilioCall.verifyCallStatus();
  });
});
