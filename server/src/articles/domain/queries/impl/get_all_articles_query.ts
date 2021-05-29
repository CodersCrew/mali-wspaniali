import { LoggedUser } from '../../../../users/params/current_user_param';

export class GetAllArticlesQuery {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly user: LoggedUser,
    public readonly category?: string,
  ) {}
}
