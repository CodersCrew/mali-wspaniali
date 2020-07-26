import { isProduction } from './utils/is_production';

export function allowHost(context: { res: { header: Function } }) {
  context.res.header(
    'Access-Control-Allow-Origin',
    isProduction()
      ? 'https://mali-wspaniali.netlify.app'
      : 'http://localhost:3000',
  );
}
