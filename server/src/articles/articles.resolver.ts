import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateArticleDTO } from './dto/create_article_dto';
import { ArticleInput } from './inputs/article_input';
import { Article, ArticleProps } from './domain/models/article_model';
import { CreateArticleCommand } from './domain/commands/impl/create_article_command';
import { GetAllArticlesQuery } from './domain/queries/impl';
import { GetArticleByIdQuery } from './domain/queries/impl/get_article_by_id_query';

@Resolver()
export class ArticlesResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [CreateArticleDTO])
  async articles(@Args('page') page: number): Promise<ArticleProps[]> {
    const articles: Article[] = await this.queryBus.execute(
      new GetAllArticlesQuery(page),
    );

    return articles.map(article => article.getProps());
  }

  @Query(() => CreateArticleDTO)
  async article(@Args('articleId') id: string): Promise<ArticleProps> {
    const article: Article = await this.queryBus.execute(
      new GetArticleByIdQuery(id),
    );

    return article.getProps();
  }

  @Mutation(() => CreateArticleDTO)
  async createArticle(
    @Args('article') article: ArticleInput,
  ): Promise<ArticleProps> {
    const newArticle: Article = await this.commandBus.execute(
      new CreateArticleCommand(article),
    );

    return newArticle.getProps();
  }
}
