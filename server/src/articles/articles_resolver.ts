import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/minimal';

import { ArticleDTO } from './dto/article_dto';
import { ArticleInput } from './inputs/article_input';
import { Article, ArticleProps } from './domain/models/article_model';
import { CreateArticleCommand } from './domain/commands/impl/create_article_command';
import { GetAllArticlesQuery } from './domain/queries/impl';
import { GetArticleByIdQuery } from './domain/queries/impl/get_article_by_id_query';
import { GetLastArticlesQuery } from './domain/queries/impl/get_last_articles_query';
import { ReturnedStatusDTO } from '../shared/returned_status';
import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { ArticleMapper } from './domain/mappers/article_mapper';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { GetArticlesCountQuery } from './domain/queries/impl/get_articles_count_query';
import { PaginatedArticlesDTO } from './dto/paginated_articles_dto';

const ARTICLES_PER_PAGE = 6;

@UseInterceptors(SentryInterceptor)
@Resolver()
export class ArticlesResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => PaginatedArticlesDTO)
  async paginatedArticles(
    @Args('page') page: number,
    @Args('category', { nullable: true }) category?: string,
  ): Promise<PaginatedArticlesDTO> {
    const articles: Article[] = await this.queryBus.execute(
      new GetAllArticlesQuery(page, ARTICLES_PER_PAGE, category),
    );

    const articlesCount: number = await this.queryBus.execute(
      new GetArticlesCountQuery(),
    );

    const result = {
      articles: articles
        .map(article => ArticleMapper.toRaw(article))
        .slice(0, ARTICLES_PER_PAGE),
      count: articlesCount,
      hasNext: articles.length === ARTICLES_PER_PAGE + 1,
    };

    return result;
  }

  @Query(() => [ArticleDTO])
  async lastArticles(@Args('count') count: number): Promise<ArticleProps[]> {
    const articles: Article[] = await this.queryBus.execute(
      new GetLastArticlesQuery(count),
    );

    return articles.map(article => ArticleMapper.toRaw(article));
  }

  @Query(() => ArticleDTO)
  async article(@Args('id') id: string): Promise<ArticleProps> {
    const article: Article = await this.queryBus.execute(
      new GetArticleByIdQuery(id),
    );

    if (article.getProps()) {
      return ArticleMapper.toRaw(article);
    }

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createArticle(
    @Args('article') article: ArticleInput,
  ): Promise<{ status: boolean }> {
    const newArticle: Article = await this.commandBus.execute(
      new CreateArticleCommand(article),
    );

    const articleContent = newArticle.getProps();

    if (articleContent) {
      Sentry.captureMessage(
        `[Mali Wspaniali]: Created a new article ${articleContent.title}`,
      );
    }

    return { status: !!articleContent };
  }
}
