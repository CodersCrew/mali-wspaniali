import { KindergartenCore } from './kindergarten_model';
import { UserCore } from '../../../users/domain/models/user_model';

export interface KindergartenWithUsersProps extends KindergartenCore {
  users: UserCore[];
}
