import { CategoryProps } from '../../models/category';

export class GetArticlesCountQuery {
  constructor(public readonly category?: CategoryProps) {}
}
