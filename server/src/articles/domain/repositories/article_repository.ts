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

  increeseAttribute(id: string, field: string) {
    this.update(id, { $inc: { [field]: 1 } });
  }

  update(
    id: string,
    updates: Partial<UpdateArticleInput> | { [key: string]: unknown },
  ) {
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
    const query: { [index: string]: unknown } = { isDeleted: false };

    if (['parent', 'instructor'].includes(user.role)) {
      query.isPublished = true;
      query.isDeleted = { $ne: true };
    }

    if (category) query.category = category;

    if (page < 1) return [];

    return await this.articleModel
      .find(query, {}, { sort: { createdAt: -1 } })
      .skip((page - 1) * perPage)
      .limit(perPage + 1)
      .exec()
      .then(mapArticles);
  }

  async getLast(count: number): Promise<Article[]> {
    if (count < 1) return [];

    return await this.articleModel
      .find(
        { isDeleted: false, isPublished: true },
        {},
        { sort: { createdAt: -1 } },
      )
      .limit(count)
      .exec()
      .then(mapArticles);
  }

  get(id: string): Promise<Article> {
    return this.articleModel
      .findOne({ _id: id, isDeleted: false })
      .exec()
      .then(article => article && ArticleMapper.toDomain(article.toObject()));
  }

  async countArticles(category?: string): Promise<number> {
    const query = category
      ? {
          category,
          isDeleted: false,
        }
      : {};

    return await this.articleModel.countDocuments(query);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.articleModel.deleteMany({});
  }

  // for e2e purpose only
  async publishArticle(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { isPublished: true });
  }
}

function mapArticles(plainArticles: ArticleDocument[]): Article[] {
  const validArticles: Article[] = [];

  plainArticles.forEach(article => {
    try {
      validArticles.push(ArticleMapper.toDomain(article.toObject()));
    } catch (e) {
      console.log(e);
    }
  });

  return validArticles;
}
