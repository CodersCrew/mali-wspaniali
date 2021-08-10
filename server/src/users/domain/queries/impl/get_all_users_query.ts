import { UserPagination } from '../../../params/user_pagination';

export class GetAllUsersQuery {
  constructor(public options: UserPagination) {}
}
