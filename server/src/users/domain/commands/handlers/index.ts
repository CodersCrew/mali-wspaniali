import { CreateUserHandler } from './create_user_handler';
import { LoginUserHandler } from './login_user_handler';
import { AddChildHandler } from './add_child_handler';
import { AddChildResultHandler } from './add_child_result_handler';

export const CommandHandlers = [
  CreateUserHandler,
  LoginUserHandler,
  AddChildHandler,
  AddChildResultHandler,
];
