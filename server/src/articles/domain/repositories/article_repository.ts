import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleInput } from '../../inputs/article_input';
import { Article } from '../models/article_model';
import { ArticleDocument } from '../../interfaces/article.interface';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel('Article')
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDTO: ArticleInput): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDTO);

    return await createdArticle.save().then(article => new Article(article));
  }

  async getPage(page: number, category?: string): Promise<Article[]> {
    const query: { [index: string]: unknown } = {};

    if (category) query.category = category;

    if (page < 1) return [];

    return await this.articleModel
      .find(query, {}, { sort: { date: -1 } })
      .skip((page - 1) * 6)
      .limit(7)
      .exec()
      .then(articles => articles.map(article => new Article(article)));
  }

  async getLast(count: number): Promise<Article[]> {
    if (count < 1) return [];

    return await this.articleModel
      .find({}, {}, { sort: { date: -1 } })
      .limit(count)
      .exec()
      .then(articles => articles.map(article => new Article(article)));
  }

  async get(id: string): Promise<Article> {
    return await this.articleModel
      .findById(id)
      .exec()
      .then(article => new Article(article));
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.articleModel.deleteMany({});
  }
}
