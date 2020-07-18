import { Article } from '../models/article_model';
import { ArticleProps } from '../../../articles/domain/models/article_model';
import { Category } from '../models/category';

export class ArticleMapper {
  static toRaw(article: Article): ArticleProps {
    const props = article.getProps();

    const mappedProps = {
      ...props,
      category: props.category.value,
    };

    return mappedProps;
  }

  static toDomain(props: ArticleProps): Article {
    const category = Category.create(props.category).getValue();

    const mappedProps = {
      ...props,
      category,
    };

    return Article.recreate(mappedProps);
  }
}
