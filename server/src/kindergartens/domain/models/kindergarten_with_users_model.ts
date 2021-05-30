import { UserProps } from '../../../users/domain/models/user_model';
import { KindergartenProps } from './kindergarten_model';

export interface KindergartenWithUsersProps extends KindergartenProps {
  readonly users: UserProps[];
}
