import register from '../navigate/register';
import forgotPassword from './forgotPassword';
import login from './login';
const navigate = {
  login,
  register,
  forgotPassword,
};

export default navigate;

export const navigateList = [login, register, forgotPassword];
