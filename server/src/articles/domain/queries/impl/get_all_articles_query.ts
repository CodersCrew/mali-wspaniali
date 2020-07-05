export class GetAllArticlesQuery {
  constructor(
    public readonly page: number,
    public readonly category?: string,
  ) {}
}
