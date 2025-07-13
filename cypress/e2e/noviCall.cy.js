import { LoginApi } from '../Pages/interaction/noviLoginApi/noviLoginApi';
import { CallInitiation } from '../Pages/interaction/makeaCall/makeCall';

describe('Verify that a user is able to login and make a call using Novi API', () => {
  const callApi = new CallInitiation();
  const loginApi = new LoginApi();

  it(`Login with Novi User`, () => {
    loginApi.login().then(() => {
      const token = loginApi.getAuthToken();
      callApi.initiateCall(token);
    });
  });
});
