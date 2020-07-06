export class ArticleCreatedEvent {
  constructor(
    public readonly articleId: string,
    public readonly users: string,
  ) {}
}
