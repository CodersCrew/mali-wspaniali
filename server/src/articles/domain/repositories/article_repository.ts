import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../../interfaces/article.interface';
import { ArticleInput } from '../../inputs/article_input';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async create(createArticleDTO: ArticleInput): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDTO);

    return await createdArticle.save();
  }

  async all(page: number, category?: string): Promise<Article[]> {
    const query: { [index: string]: unknown } = {};

    if (category) query.category = category;

    return await this.articleModel
      .find(query, {}, { sort: { date: -1 } })
      .skip(page * 6)
      .limit(7)
      .exec();
  }

  async get(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }
}
