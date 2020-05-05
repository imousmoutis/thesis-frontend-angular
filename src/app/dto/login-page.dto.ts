import {LoginUserDto} from './login-user.dto';

export interface LoginPageDto extends LoginUserDto {
  loginPage: boolean;
}
