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

  async all(page: number): Promise<Article[]> {
    return await this.articleModel
      .find()
      .skip(page * 10)
      .limit(10)
      .exec();
  }

  async get(id: string): Promise<Article> {
    return await this.articleModel.findById(id).exec();
  }
}
