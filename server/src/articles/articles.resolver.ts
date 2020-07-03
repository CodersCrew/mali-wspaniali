import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';

import { ArticleService } from './articles.service';
import { Article } from './interfaces/article.interface';
import { CreateArticleDTO } from './dto/create_article_dto';
import { ArticleInput } from './inputs/article_input';

@Resolver()
export class ArticlesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [CreateArticleDTO])
  articles(
    @Args('page') page: number,
    @Args('category', { nullable: true }) category?: string,
  ): Promise<Article[]> {
    return this.articleService.findPage(page, category);
  }

  @Query(() => [CreateArticleDTO])
  lastArticles(@Args('count') count: number): Promise<Article[]> {
    return this.articleService.findLast(count);
  }

  @Query(() => CreateArticleDTO)
  article(@Args('articleId') article: string): Promise<Article> {
    return this.articleService.find(article);
  }

  @Mutation(() => CreateArticleDTO)
  async createArticle(
    @Args('article') article: ArticleInput,
  ): Promise<Article> {
    return this.articleService.create(article);
  }
}
