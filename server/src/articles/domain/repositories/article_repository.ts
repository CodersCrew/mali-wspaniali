import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateArticleInput,
  UpdateArticleInput,
} from '../../inputs/article_input';
import { Article } from '../models/article_model';
import { ArticleDocument } from '../../interfaces/article.interface';
import { ArticleMapper } from '../mappers/article_mapper';
import { LoggedUser } from '../../../users/params/current_user_param';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel('Article')
    private articleModel: Model<ArticleDocument>,
  ) {}

  create(createArticleDTO: CreateArticleInput): Promise<Article> {
    const article = ArticleMapper.toDomain(createArticleDTO);
    const createdArticle = new this.articleModel(
      ArticleMapper.toPlain(article),
    );

    return createdArticle
      .save()
      .then(article =>
        ArticleMapper.toDomain(article.toObject(), { isNew: true }),
      );
  }

  update(id: string, updates: Partial<UpdateArticleInput>) {
    this.articleModel
      .findOneAndUpdate(
        { _id: id.toString() },
        updates as Partial<ArticleDocument>,
        {
          useFindAndModify: false,
        },
      )
      .exec();
  }

  async getPage(
    page: number,
    perPage: number,
    user: LoggedUser,
    category?: string,
  ): Promise<Article[]> {
    const query: { [index: string]: unknown } = {};

    if (['parent', 'instructor'].includes(user.role)) {
      query.isPublished = true;
      query.isDeleted = { $ne: true };
    }

    if (category) query.category = category;

    if (page < 1) return [];

    return await this.articleModel
      .find(query, {}, { sort: { date: -1 } })
      .skip((page - 1) * perPage)
      .limit(perPage + 1)
      .exec()
      .then(articles => {
        const validArticles: Article[] = [];

        articles.forEach(article => {
          try {
            validArticles.push(ArticleMapper.toDomain(article.toObject()));
          } catch (e) {
            console.log(e);
          }
        });

        return validArticles;
      });
  }

  async getLast(count: number): Promise<Article[]> {
    if (count < 1) return [];

    return await this.articleModel
      .find({}, {}, { sort: { date: -1 } })
      .limit(count)
      .exec()
      .then(articles => {
        const validArticles: Article[] = [];

        articles.forEach(article => {
          try {
            validArticles.push(ArticleMapper.toDomain(article.toObject()));
          } catch (e) {
            console.log(e);
          }
        });

        return validArticles;
      });
  }

  get(id: string): Promise<Article> {
    return this.articleModel
      .findOne({ _id: id })
      .exec()
      .then(article => article && ArticleMapper.toDomain(article.toObject()));
  }

  async countArticles(category?: string): Promise<number> {
    const query = category
      ? {
          category,
        }
      : {};

    return await this.articleModel.countDocuments(query);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.articleModel.deleteMany({});
  }
}
