const { defineConfig } = require('cypress');
const MailosaurClient = require('mailosaur');
module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 180000,
    setupNodeEvents(on, config) {
      const env = require('./cypress.env.json');
      config.env = {
        ...config.env,
        ...env,
        sensitiveKeys: ['MAILOSAUR_API_KEY', 'MAILOSAUR_SERVER_ID', 'Password'],
      };
      const mailosaur = new MailosaurClient(config.env.MAILOSAUR_API_KEY);
      const serverId = config.env.MAILOSAUR_SERVER_ID;
      on('task', {
        createInbox: () => ({
          emailAddress: `${Math.random().toString(36).substring(2, 10)}.${serverId}@mailosaur.net`,
        }),
        waitForEmail: async ({ email, subject }) => {
          try {
            return await mailosaur.messages.get(
              serverId,
              {
                sentTo: email,
                subject: subject,
              },
              {
                timeout: 120000,
                pollInterval: 5000,
              }
            );
          } catch (error) {
            if (error.message.includes('No matching messages found')) {
              throw new Error(`Email not found: ${error.message}`);
            }
            throw error;
          }
        },
        getEmails: async ({ email }) => {
          const result = await mailosaur.messages.list(serverId);
          return result.items.filter(msg => msg.to.some(recipient => recipient.email === email));
        },
      });
      return config;
    },
    experimentalRunAllSpecs: true,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
  },
  video: false,
  screenshotOnRunFailure: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
