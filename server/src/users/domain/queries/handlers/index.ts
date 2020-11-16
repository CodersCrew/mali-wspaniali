import { GetUserHandler } from './get_user_handler';
import { GetChildrenHandler } from './get_children_handler';
import { GetAllChildrenHandler } from './get_all_children_handler';
import { GetAllUsersHandler } from './get_all_users_handler';
import { GetUsersHandler } from './get_users_handler';

export const QueryHandlers = [
  GetUserHandler,
  GetUsersHandler,
  GetAllUsersHandler,
  GetChildrenHandler,
  GetAllChildrenHandler,
];
