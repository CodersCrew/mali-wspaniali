export class GetAllArticlesQuery {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly category?: string,
  ) {}
}
