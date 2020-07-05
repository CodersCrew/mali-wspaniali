import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateArticleDTO } from './dto/create_article_dto';
import { ArticleInput } from './inputs/article_input';
import { Article, ArticleProps } from './domain/models/article_model';
import { CreateArticleCommand } from './domain/commands/impl/create_article_command';
import { GetAllArticlesQuery } from './domain/queries/impl';
import { GetArticleByIdQuery } from './domain/queries/impl/get_article_by_id_query';
import { GetLastArticlesQuery } from './domain/queries/impl/get_last_articles_query';
import { ReturnedStatusDTO } from '../shared/returned_status';

@Resolver()
export class ArticlesResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [CreateArticleDTO])
  async articles(
    @Args('page') page: number,
    @Args('category', { nullable: true }) category?: string,
  ): Promise<ArticleProps[]> {
    const articles: Article[] = await this.queryBus.execute(
      new GetAllArticlesQuery(page, category),
    );

    return articles.map(article => article.getProps());
  }

  @Query(() => [CreateArticleDTO])
  async lastArticles(@Args('count') count: number): Promise<ArticleProps[]> {
    const articles: Article[] = await this.queryBus.execute(
      new GetLastArticlesQuery(count),
    );

    return articles.map(article => article.getProps());
  }

  @Query(() => CreateArticleDTO)
  async article(@Args('id') id: string): Promise<ArticleProps> {
    const article: Article = await this.queryBus.execute(
      new GetArticleByIdQuery(id),
    );

    return article.getProps();
  }

  @Mutation(() => ReturnedStatusDTO)
  async createArticle(
    @Args('article') article: ArticleInput,
  ): Promise<{ status: boolean }> {
    const newArticle: Article = await this.commandBus.execute(
      new CreateArticleCommand(article),
    );

    return { status: !!newArticle };
  }
}
