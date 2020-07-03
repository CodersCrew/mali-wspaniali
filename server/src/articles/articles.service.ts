import { Injectable } from '@nestjs/common';
import { Article } from './interfaces/article.interface';
import { ArticleInput } from './inputs/article_input';
import { ArticlesRepository } from './domain/repositories/article_repository';

@Injectable()
export class ArticleService {
  constructor(private articlesRepository: ArticlesRepository) {}

  async create(createArticleDTO: ArticleInput): Promise<Article> {
    return this.articlesRepository.create(createArticleDTO);
  }

  async findPage(page: number, category?: string): Promise<Article[]> {
    return this.articlesRepository.getPage(page, category);
  }

  async findLast(count: number): Promise<Article[]> {
    return this.articlesRepository.getLast(count);
  }

  async find(articleId: string): Promise<Article> {
    return this.articlesRepository.get(articleId);
  }
}
