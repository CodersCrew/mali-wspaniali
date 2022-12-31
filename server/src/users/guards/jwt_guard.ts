import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  private options: { role?: string | string[] };

  getRequest(context: ExecutionContext): Request {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest();
    }

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return req;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const role = Array.isArray(this.options.role)
      ? this.options.role.find((r) => r === user.role)
      : this.options.role === user.role;

    if (this.options.role && !role) {
      throw (
        err || new UnauthorizedException(`You need to be logged as "${role}"`)
      );
    }

    return user;
  }
}
