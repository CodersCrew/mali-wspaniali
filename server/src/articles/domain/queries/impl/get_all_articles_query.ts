import { LoggedUser } from '../../../../users/params/current_user_param';

export class GetAllArticlesQuery {
  constructor(
    public page: number,
    public perPage: number,
    public user: LoggedUser,
    public category?: string,
  ) {}
}
