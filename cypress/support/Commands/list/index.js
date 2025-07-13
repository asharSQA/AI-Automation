import navigate, { navigateList } from './navigate';
import actions, { actionsList } from './actions';

const commmands = {
  navigate,
  actions,
};

export default commmands;

export const commandList = [...navigateList, ...actionsList];
