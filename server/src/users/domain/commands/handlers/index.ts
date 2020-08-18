import { CreateUserHandler } from './create_user_handler';
import { LoginUserHandler } from './login_user_handler';
import { AddChildHandler } from './add_child_handler';
import { AddChildResultHandler } from './add_child_result_handler';
import { ChangePasswordHandler } from './change_password_handler';
import { ResetPasswordHandler } from './reset_password_handler';
import { AddAgreementToUserHandler } from './add_agreement_to_user_handler';

export const CommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  AddChildHandler,
  AddChildResultHandler,
  ChangePasswordHandler,
  ResetPasswordHandler,
  AddAgreementToUserHandler,
];
