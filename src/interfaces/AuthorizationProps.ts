import { Role } from '../common/roles';

export interface AuthorizationProps {
  children: Array<JSX.Element>,
  roles: Array<Role>
}