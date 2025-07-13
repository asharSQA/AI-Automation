import { LoginApi } from '../Pages/interaction/noviLoginApi/noviLoginApi';

const loginApi = new LoginApi();
export class loginNoviPortal {
  loginNovi() {
    loginApi.login().then(() => {
      const token = loginApi.getAuthToken();
    });
  }
}
