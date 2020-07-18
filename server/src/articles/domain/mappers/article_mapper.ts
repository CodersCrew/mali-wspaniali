import { Article } from '../models/article_model';
import { ArticleProps } from '../../../articles/domain/models/article_model';
import { Category } from '../models/category';
import { Url } from '../../../shared/domain/url';
import { ReadingTime } from '../models/reading_time';
import { Tags } from '../models/tags';
import { TextLength } from '../../../shared/domain/text_length';
import { Redactor } from '../models/redactor';

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
      header: props.header.value,
      subtitle: props.subtitle.value,
      title: props.title.value,
      redactor: props.redactor.getValue(),
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
    const header = TextLength.create(
      props.header,
      'header',
      200,
      20,
    ).getValue();
    const subtitle = TextLength.create(
      props.subtitle,
      'subtitle',
      100,
      10,
    ).getValue();
    const title = TextLength.create(props.title, 'title', 100, 10).getValue();
    const redactor = Redactor.create(props.redactor);

    const mappedProps = {
      ...props,
      category,
      pictureUrl,
      videoUrl,
      readingTime,
      tags,
      description,
      header,
      subtitle,
      title,
      redactor,
    };

    return Article.recreate(mappedProps);
  }
}
