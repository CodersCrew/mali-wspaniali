import { GetUserHandler } from './get_user_handler';
import { GetChildrenHandler } from './get_children_handler';
import { GetChildrenFromKindergartenHandler } from './get_children_from_kindergarten_handler';
import { GetAllChildrenHandler } from './get_all_children_handler';
import { GetAllUsersHandler } from './get_all_users_handler';
import { GetUsersHandler } from './get_users_handler';
import { GetKindergartenResultsHandler } from './get_kindergarten_results_handler';
import { GetChildResultHandler } from './get_child_results_handler';
import { GetUserByChildIdHandler } from './get_user_by_child_id_handler';

export { GetUserHandler } from './get_user_handler';
export { GetChildrenHandler } from './get_children_handler';
export { GetChildrenFromKindergartenHandler } from './get_children_from_kindergarten_handler';
export { GetAllChildrenHandler } from './get_all_children_handler';
export { GetAllUsersHandler } from './get_all_users_handler';
export { GetUsersHandler } from './get_users_handler';
export { GetKindergartenResultsHandler } from './get_kindergarten_results_handler';

export const QueryHandlers = [
  GetUserHandler,
  GetUserByChildIdHandler,
  GetUsersHandler,
  GetAllUsersHandler,
  GetChildrenHandler,
  GetChildrenFromKindergartenHandler,
  GetKindergartenResultsHandler,
  GetChildResultHandler,
  GetAllChildrenHandler,
];
