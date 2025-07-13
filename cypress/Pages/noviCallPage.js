import { LoginApi } from '../Pages/interaction/noviLoginApi/noviLoginApi';
import { CallInitiation } from '../Pages/interaction/makeaCall/makeCall';

const callApi = new CallInitiation();
const loginApi = new LoginApi();

export class callUsingNovi {
  noviCall() {
    loginApi.login().then(() => {
      const token = loginApi.getAuthToken();
      callApi.initiateCall(token);
    });
  }
}
