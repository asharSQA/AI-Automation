import { commandList } from './list';

const registerCommands = () => {
  Object.values(commandList).forEach(el => {
    Cypress.Commands.add(el.name, el.callback);
  });
};

registerCommands();
