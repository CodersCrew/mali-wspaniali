import { Query, Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/minimal';

import { CreateArticleInput } from './inputs/article_input';
import { Article } from './domain/models/article_model';
import { CreateArticleCommand } from './domain/commands/impl/create_article_command';
import { GetAllArticlesQuery } from './domain/queries/impl';
import { GetArticleByIdQuery } from './domain/queries/impl/get_article_by_id_query';
import { GetLastArticlesQuery } from './domain/queries/impl/get_last_articles_query';
import { ReturnedStatusDTO } from '../shared/returned_status';
import {
  HttpException,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { ArticleMapper } from './domain/mappers/article_mapper';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { ArticleDTO } from './dto/article_dto';
import { PaginatedArticlesDTO } from './dto/paginated_article_dto';
import { GetArticlesCountQuery } from './domain/queries/impl/get_article_count_query';
import { classToPlain } from 'class-transformer';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';

const ARTICLE_PER_PAGE = 6;

@UseInterceptors(SentryInterceptor)
@Resolver()
export class ArticlesResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => PaginatedArticlesDTO)
  @UseGuards(GqlAuthGuard)
  async paginatedArticles(
    @CurrentUser() user: LoggedUser,
    @Args('page', { type: () => Int }) page: number,
    @Args('category', { nullable: true }) category?: string,
    @Args('perPage', { nullable: true, type: () => Int }) perPage?: number,
  ): Promise<PaginatedArticlesDTO> {
    const articles: Article[] = await this.queryBus.execute(
      new GetAllArticlesQuery(
        page,
        perPage || ARTICLE_PER_PAGE,
        user,
        category,
      ),
    );

    const articleCount: number = await this.queryBus.execute(
      new GetArticlesCountQuery(category),
    );

    const result = {
      articles: articles
        .slice(0, perPage || ARTICLE_PER_PAGE)
        .map(article => ArticleMapper.toRaw(article)),
      count: articleCount,
      hasNext: articles.length === (perPage || ARTICLE_PER_PAGE) + 1,
    };

    return result;
  }

  @Query(() => [ArticleDTO])
  @UseGuards(GqlAuthGuard)
  async lastArticles(
    @Args('count', { type: () => Int }) count: number,
  ): Promise<Record<string, any>[]> {
    const articles: Article[] = await this.queryBus.execute(
      new GetLastArticlesQuery(count),
    );

    return articles.map(article => ArticleMapper.toRaw(article));
  }

  @Query(() => ArticleDTO)
  @UseGuards(GqlAuthGuard)
  async article(@Args('id') id: string): Promise<Record<string, any>> {
    const article: Article = await this.queryBus.execute(
      new GetArticleByIdQuery(id),
    );

    if (classToPlain(article.getProps())) {
      return ArticleMapper.toRaw(article);
    }

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createArticle(
    @Args('article') article: CreateArticleInput,
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
