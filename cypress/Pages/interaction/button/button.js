export class Button {
  get logout() {
    return cy.get('.ant-menu-item-danger');
  }

  get accountMenu() {
    return cy.get('.ant-menu-submenu-title').contains('Account');
  }

  get accountPassword() {
    return cy.contains('.ant-menu-item', 'Password');
  }

  get submitButton() {
    return cy.get('[data-testid="form-submit-button"]');
  }

  get cancelButton() {
    return cy.get('[data-testid="form-cancel-button"]');
  }

  get openCampaign() {
    return cy.contains('.flex-wrap > .ant-btn', 'Open Campaign');
  }

  get configureNoviPortal() {
    return cy.contains('.ant-menu-title-content', 'Configure');
  }
  get collapseHeader() {
    return (index = 0) => cy.get('.ant-collapse-header').eq(index);
  }
  get editIcon() {
    return cy.get('[data-testid="EditOutlinedIcon"]');
  }

  get leads() {
    return cy.contains('.ant-menu-title-content', 'Leads');
  }

  getPhoneIconByNumber(phoneNumber) {
    return cy
      .get('div.ant-card-body')
      .contains(phoneNumber)
      .parents('div.ant-card-body')
      .find('button span[role="img"][aria-label="phone"]');
  }

  get makeCall() {
    return cy.contains('.ant-btn', 'Make a call');
  }

  get addText() {
    return cy.contains('.flex-wrap > :nth-child(1)', 'Add Text');
  }

  get addWebsiteUrl() {
    return cy.contains('.flex-wrap > :nth-child(2)', 'Add Website URL');
  }

  uploadDocument(fileName) {
    cy.contains('.ant-upload > .ant-btn', 'Upload Document');
    cy.get('.ant-upload input[type="file"]').should('exist').attachFile(fileName);
  }

  get add() {
    return cy.get('.ant-btn-primary');
  }
  get dropdowniconLanguageReceptionist() {
    return cy.get('.ant-select-selection-item');
  }

  get dropdownSelection() {
    return (index = 0) => cy.get('.ant-select-item-option-content').eq(index);
  }

  get accountSettings() {
    return cy.contains('.ant-menu-item', 'Settings');
  }

  get accountIcon() {
    return cy.get('.mb-8 > .ant-btn');
  }

  get dropdownIcon() {
    return cy.get('.ant-btn>.anticon');
  }

  get translatorButton() {
    return cy.get('.ant-btn-icon [aria-label="translation"]');
  }

  get resetLanguage() {
    return cy.get('.anticon.anticon-sync');
  }

  get configure() {
    return cy.get('.ant-menu-submenu-title').contains('Configure');
  }

  get receptionist() {
    return cy.contains('.ant-menu-item', 'Receptionist');
  }
  get detailSetting() {
    return cy.get('.tab-group > :nth-child(1)');
  }
  get addcallflow() {
    return cy.get('.justify-end > :nth-child(1)');
  }

  get phoneNumberField() {
    return cy.get('.form-control');
  }

  get logs() {
    return cy.get('.ant-menu-submenu-title').contains('Logs');
  }

  get callLogs() {
    return cy.contains('.ant-menu-item', 'Call Logs');
  }

  get transcriptButton() {
    return (index = 0) => cy.contains('button.ant-btn span', 'Transcript').eq(index);
  }

  get urlToggle() {
    return (index = 0) => cy.get('button.ant-switch.ant-switch-small').eq(index);
  }
  get closeWindow() {
    return cy.get('.ant-modal-close-x');
  }

  get crossIcon() {
    return (index = 0) => cy.get('span.anticon.anticon-close').eq(index);
  }

  languageDropdown() {
    return cy.get('.ant-select-selection-overflow');
  }

  get textAgent() {
    return cy.contains('.ant-menu-title-content', 'Texting Agent');
  }

  get addQuestion() {
    return cy.contains('button.ant-btn.ant-btn-dashed.ant-btn-block', 'Add Questions');
  }

  get deleteButton() {
    return (index = 0) => cy.get('.ant-btn-dangerous').eq(index);
  }

  get notifications() {
    return cy.contains('.ant-menu-item', 'Notifications');
  }

  get callNotifications() {
    return cy.contains('.ant-menu-item', 'Call Notifications');
  }

  getCustomize(index = 0) {
    return cy.get('button.ant-btn-default').contains('Customize').eq(index);
  }
  getcheckbox(index = 0) {
    return cy.get('.ant-checkbox-wrapper').eq(index);
  }

  get discardChanges() {
    return cy.get('.discard-button');
  }

  get saveChanges() {
    return cy.get('.save-button');
  }

  get modalCloseCross() {
    return cy.get('.ant-modal-close-x');
  }

  get refreshLogs() {
    return cy.contains('button.ant-btn-primary', 'Refresh Logs');
  }

  get NoviTextingAgent() {
    return cy.contains('.ant-menu-submenu-title', 'Texting Agent');
  }

  get Novitextlogs() {
    return cy.contains('.ant-menu-item', 'Text Logs');
  }

  get create() {
    return cy.get('div[class*="-menu"]').contains('Create');
  }

  RemoveSvgPath(index = 0) {
    return cy.get('div[aria-label^="Remove"] svg path').eq(index);
  }

  clickAddEmailByPosition(position = 'first') {
    const buttons = cy.get('button').filter(':contains("Add Email")');

    if (position === 'first') {
      buttons.first().click();
    } else if (position === 'second') {
      buttons.eq(1).click();
    } else if (position === 'last') {
      buttons.last().click();
    }
  }

  clickAddPhoneByPosition(position = 'first') {
    const buttons = cy.get('button').filter(':contains("Add Phone")');

    if (position === 'first') {
      buttons.first().click();
    } else if (position === 'second') {
      buttons.eq(1).click();
    } else if (position === 'last') {
      buttons.last().click();
    }
  }

  addKnowledgebaseText(buttonText) {
    return cy.contains('.ant-btn-primary', buttonText);
  }

  saveandRemoveButton(buttonText) {
    return cy.contains('.ant-btn-primary', buttonText);
  }

  get deleteKnowledgeBase() {
    return (index = 0) => cy.get(':nth-child(5) > .gap-2 > .ant-btn-text').eq(index);
  }

  get toggleImmidiate() {
    return cy.get('#overview-form_scenarios_0_intake_beginning_natural > :nth-child(2) > :nth-child(2)');
  }

  get morebutton() {
    return cy.get('button.ant-btn-icon-only.ant-dropdown-trigger span[role="img"][aria-label="more"]');
  }
  get moreContentViewIntakeResponse() {
    return cy.contains('li.ant-dropdown-menu-item', 'View Intake Response');
  }

  get smartCallTemplate() {
    return cy.contains('.ant-btn-default > :nth-child(1)', 'Select Template');
  }

  get viewButton() {
    return (index = 0) => cy.contains('button.ant-btn span', 'View').eq(index);
  }

  get removeButton() {
    return (index = 0) => cy.contains('button.ant-btn span', 'Remove').eq(index);
  }

  get editButton() {
    return cy.contains('.ant-btn', 'Edit');
  }

  cross() {
    return cy.get('.ant-select-selection-item-remove');
  }

  get removePhoneNumber() {
    return cy.get('span[data-testid="remove-phone"]');
  }

  notificationAddScenario() {
    return cy.get('.ant-form-item-control-input-content > .ant-btn');
  }

  notificationCustomScenarioTab() {
    return cy.get('[data-node-key="Scenario Based"]');
  }

  notificationAddScenario() {
    return cy.get('.ant-form-item-control-input-content > .ant-btn');
  }

  get customNotificationAddEmailButton() {
    return cy.get('button.ant-btn.ant-btn-default > span').contains('Add Email');
  }

  get customNotificationAddPhoneButton() {
    return cy.get('button.ant-btn.ant-btn-default > span').contains('Add Phone');
  }
  removeScenarioIcon(index) {
    return cy.get(`[data-testid="remove-scenario-${index}"]`);
  }
}
