import { Article } from '../models/article_model';
import { ArticleProps } from '../../../articles/domain/models/article_model';
import { Category } from '../models/category';
import { Url } from '../../../shared/domain/url';
import { ReadingTime } from '../models/reading_time';
import { Tags } from '../models/tags';
import { TextLength } from '../../../shared/domain/text_length';
import { RedactorMapper } from './redactor_mapper';

export class ArticleMapper {
  static toRaw(article: Article): ArticleProps {
    const props = article.getProps();

    const mappedProps = {
      ...props,
      category: props.category.value,
      pictureUrl: props.pictureUrl.value,
      videoUrl: props.videoUrl.value,
      readingTime: props.readingTime.value,
      tags: props.tags.value,
      description: props.description.value,
      title: props.title.value,
      redactor: RedactorMapper.toPersistence(props.redactor),
    };

    return mappedProps;
  }

  static toDomain(props: ArticleProps): Article {
    const category = Category.create(props.category).getValue();
    const pictureUrl = Url.create(props.pictureUrl).getValue();
    const videoUrl = Url.create(props.videoUrl).getValue();
    const readingTime = ReadingTime.create(props.readingTime).getValue();
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
      readingTime,
      tags,
      description,
      title,
      redactor,
    };

    return Article.recreate(mappedProps);
  }
}
