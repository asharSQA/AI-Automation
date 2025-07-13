import { Interaction } from './interaction/interaction';

const interaction = new Interaction();
export class smartCallAnalysisPage {
  SmartCallAnalysissetting() {
    interaction.button.configure.click();
    interaction.button.receptionist.click();
    interaction.button.detailSetting.click();
    interaction.button.collapseHeader(9).click();
    interaction.button.collapseHeader(12).click();
    interaction.button.removeButton(0).click();
    interaction.button.smartCallTemplate.click();
    interaction.fields.DropdownItem('Call Outcome');
    interaction.button.saveandRemoveButton('Save Setup').click();
  }

  SmartCallAnalysisSettingSuccessMessage() {
    cy.contains('.ant-notification-notice-message', 'Call analysis saved successfully!', {
      timeout: 100000,
    }).should('be.visible');
  }

  SmartCallAnalysisSettingAssertion() {
    cy.get('.ant-modal-body')
      .contains(/true|false/)
      .should('be.visible');
  }
}
