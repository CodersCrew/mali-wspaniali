import { Article, ArticleInnerProps } from '../models/article_model';
import { ArticleProps } from '../../../articles/domain/models/article_model';
import { Category } from '../models/category';
import { Url } from '../../../shared/domain/url';
import { Tags } from '../models/tags';
import { TextLength } from '../../../shared/domain/text_length';
import { RedactorMapper } from './redactor_mapper';
import { ArticleInput } from '../../inputs/article_input';
import { RedactorProps } from '../models/redactor';

export class ArticleMapper {
  static toRaw(article: Article): ArticleProps {
    const props = article.getProps();

    const mappedProps = {
      ...props,
      category: props.category.value,
      pictureUrl: props.pictureUrl.value,
      videoUrl: props.videoUrl.value,
      tags: props.tags.value,
      description: props.description.value,
      title: props.title.value,
      redactor: RedactorMapper.toPersistence(props.redactor),
    };

    return mappedProps;
  }

  static toPartialRaw(
    updates: Partial<ArticleInnerProps>,
  ): Partial<ArticleInput> {
    const data: Partial<ArticleInput> = {};

    if (updates.category) {
      data.category = updates.category.value;
    }

    if (updates.pictureUrl) {
      data.pictureUrl = updates.pictureUrl.value;
    }

    if (updates.videoUrl) {
      data.videoUrl = updates.videoUrl.value;
    }

    if (updates.tags) {
      data.tags = updates.tags.value;
    }

    if (updates.description) {
      data.description = updates.description.value;
    }

    if (updates.title) {
      data.title = updates.title.value;
    }

    if (updates.redactor) {
      data.redactor = RedactorMapper.toPersistence(updates.redactor!);
    }

    return data;
  }

  static toPartialDomain(
    updates: Partial<ArticleInput>,
  ): Partial<ArticleInnerProps> {
    const data: Partial<ArticleInnerProps> = {};

    if (updates.category) {
      const category = Category.create(updates.category).getValue();

      data.category = category;
    }

    if (updates.pictureUrl) {
      const pictureUrl = Url.create(updates.pictureUrl).getValue();

      data.pictureUrl = pictureUrl;
    }

    if (updates.videoUrl) {
      const videoUrl = Url.create(updates.videoUrl).getValue();

      data.videoUrl = videoUrl;
    }

    if (updates.contentHTML) {
      data.contentHTML = updates.contentHTML;
    }

    if (updates.tags) {
      const tags = Tags.create(updates.tags).getValue();

      data.tags = tags;
    }

    if (updates.description) {
      const description = TextLength.create(
        updates.description,
        'description',
        300,
        30,
      ).getValue();

      data.description = description;
    }

    if (updates.title) {
      const title = TextLength.create(
        updates.title,
        'title',
        100,
        10,
      ).getValue();

      data.title = title;
    }

    if (updates.redactor) {
      const redactor = RedactorMapper.toDomain(
        updates.redactor as RedactorProps,
      ).getValue();

      data.redactor = redactor;
    }

    return data;
  }

  static toDomain(props: ArticleInput): Article {
    const category = Category.create(props.category).getValue();
    const pictureUrl = Url.create(props.pictureUrl).getValue();
    const videoUrl = Url.create(props.videoUrl).getValue();
    const tags = Tags.create(props.tags).getValue();
    const description = TextLength.create(
      props.description,
      'description',
      300,
      30,
    ).getValue();
    const title = TextLength.create(props.title, 'title', 100, 10).getValue();
    const redactor = RedactorMapper.toDomain(props.redactor).getValue();

    const mappedProps = {
      ...props,
      category,
      pictureUrl,
      videoUrl,
      tags,
      description,
      title,
      redactor,
    };

    return Article.recreate(mappedProps);
  }
}
