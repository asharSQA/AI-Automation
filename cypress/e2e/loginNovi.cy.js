import { LoginApi } from '../Pages/interaction/noviLoginApi/noviLoginApi';

describe('Verify that a user is able to login using Novi credentials Via API', () => {
  const loginApi = new LoginApi();

  it(`Login with Novi User`, () => {
    loginApi.login().then(() => {
      const token = loginApi.getAuthToken();
    });
  });
});
