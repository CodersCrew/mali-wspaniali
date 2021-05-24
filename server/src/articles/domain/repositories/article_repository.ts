import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleInput } from '../../inputs/article_input';
import { Article } from '../models/article_model';
import { ArticleDocument } from '../../interfaces/article.interface';
import { ArticleMapper } from '../mappers/article_mapper';
import { CategoryProps } from '../models/category';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel('Article')
    private readonly articleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDTO: ArticleInput): Promise<Article> {
    const article = ArticleMapper.toDomain(createArticleDTO);
    const createdArticle = new this.articleModel(ArticleMapper.toRaw(article));

    return await createdArticle
      .save()
      .then(article => ArticleMapper.toDomain(article.toObject()));
  }

  update(id: string, updates: Partial<ArticleInput>) {
    this.articleModel.findByIdAndUpdate(
      id,
      updates as Partial<ArticleDocument>,
    );
  }

  async getPage(
    page: number,
    perPage: number,
    category?: string,
  ): Promise<Article[]> {
    const query: { [index: string]: unknown } = {};

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

  async get(id: string): Promise<Article> {
    return await this.articleModel
      .findById(id)
      .exec()
      .then(article => article && ArticleMapper.toDomain(article.toObject()));
  }

  async countArticles(category?: CategoryProps): Promise<number> {
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
