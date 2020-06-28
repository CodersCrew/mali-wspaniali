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

  async findAll(page: number): Promise<Article[]> {
    return this.articlesRepository.all(page);
  }

  async find(articleId: string): Promise<Article> {
    return this.articlesRepository.get(articleId);
  }
}
