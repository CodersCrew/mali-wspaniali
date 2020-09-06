import { GetAllArticlesHandler } from './get_all_articles_handler';
import { GetArticleByIdHandler } from './get_article_by_id_handler';
import { GetLastArticlesHandler } from './get_last_articles_handler';
import { GetArticlesCountHandler } from './get_article_count_handler';

export const QueryHandlers = [
  GetAllArticlesHandler,
  GetLastArticlesHandler,
  GetArticleByIdHandler,
  GetArticlesCountHandler,
];
