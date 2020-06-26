import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ArticlesResolver {
  @Query(() => String)
  articles(): string {
    return 'all articles';
  }
}
