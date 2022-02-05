import { CreateKeyCodeHandler } from '../../key_codes/domain/commands/handlers/create_key_code_handler';
import { CreateUserHandler } from '../../users/domain/commands/handlers/create_user_handler';
import { UserInput } from '../../users/inputs/user_input';
import { User } from '../../users/domain/models/user_model';
import { CreateUserCommand } from '../../users/domain/commands/impl/create_user_command';
import { AnonymizeUserHandler } from '../../users/domain/commands/handlers/anonymize_user_handler';
import { AnonymizeUserCommand } from '../../users/domain/commands/impl/anonymize_user_command';
import { AddChildHandler } from '../../users/domain/commands/handlers/add_child_handler';
import { AddChildCommand } from '../../users/domain/commands/impl/add_child_command';
import { CreateKindergartenHandler } from '../../kindergartens/domain/commands/handlers/create_kindergarten_handler';
import { CreateKindergartenCommand } from '../../kindergartens/domain/commands/impl/create_kindergarten_command';
import { GetAllChildrenHandler } from '../../users/domain/queries/handlers/get_all_children_handler';
import { GetKindergartenHandler } from '../../kindergartens/domain/queries/handlers/get_kindergarten_handler';
import { GetKindergartenQuery } from '../../kindergartens/domain/queries/impl/get_kindergarten_query';
import { GetNotificationsByUserHandler } from '../../notifications/domain/queries/handlers/get_notifications_by_user_handler';
import { GetNotificationsByUserQuery } from '../../notifications/domain/queries/impl/get_notifications_by_user_query';
import { GetAllUsersHandler } from '../../users/domain/queries/handlers/get_all_users_handler';
import { GetAllUsersQuery } from '../../users/domain/queries/impl/get_all_users_query';
import { GetAllArticlesHandler } from '../../articles/domain/queries/handlers/get_all_articles_handler';
import { GetAllArticlesQuery } from '../../articles/domain/queries/impl/get_all_articles_query';
import { CreateKeyCodeCommand } from '../../key_codes/domain/commands/impl';
import { UserRepository } from '../../users/domain/repositories/user_repository';
import { CreateAssessmentHandler } from '../../assessment/domain/commands/handlers/create_assessment_handler';
import { CreateAssessmentCommand } from '../../assessment/domain/commands/impl/create_assessment_command';
import { AssessmentInput } from '../../assessment/inputs/assessment_input';
import { GetAssessmentHandler } from '../../assessment/domain/queries/handlers/get_assessments_handler';
import { GetAssessmentsQuery } from '../../assessment/domain/queries/impl/get_assessment_query';
import { getApp } from '../../../setupTests';

export async function createParent(
  options: Partial<UserInput> = {},
): Promise<User> {
  const keyCodeResult = await getApp()
    .get(CreateKeyCodeHandler)
    .execute(new CreateKeyCodeCommand('admin', 'parent'));

  const parent = await getApp()
    .get(CreateUserHandler)
    .execute(
      new CreateUserCommand({
        mail: 'my-mail@mail.com',
        password: 'my-password',
        keyCode: keyCodeResult.keyCode,
        ...options,
      }),
    );

  await confirmUser(parent.mail);

  return parent;
}

export async function anonymizeUser(id: string) {
  return getApp()
    .get(AnonymizeUserHandler)
    .execute(new AnonymizeUserCommand(id));
}

export async function confirmUser(mail: string) {
  return getApp()
    .get(UserRepository)
    .confirmUser(mail);
}

export async function addChild(
  options: {
    firstname?: string;
    kindergartenId?: string;
    birthYear?: number;
  } = {},
  parentId: string,
) {
  const validChildOptions = {
    birthYear: 2000,
    birthQuarter: 1,
    firstname: 'my-name',
    lastname: 'my-lastname',
    sex: 'male',
    kindergartenId: 'my-kindergartenId',
  };

  return getApp()
    .resolve(AddChildHandler)
    .then(handler => {
      return handler.execute(
        new AddChildCommand({ ...validChildOptions, ...options }, parentId),
      );
    });
}

export async function createKindergartenWith(options: { name?: string } = {}) {
  const validKindergartenOptions = {
    number: 1,
    name: 'my-name',
    address: 'my-address',
    city: 'my-city',
  };

  return getApp()
    .resolve(CreateKindergartenHandler)
    .then(handler =>
      handler.execute(
        new CreateKindergartenCommand({
          ...validKindergartenOptions,
          ...options,
        }),
      ),
    );
}

export async function getKindergarten(id: string) {
  return getApp()
    .resolve(GetKindergartenHandler)
    .then(handler => handler.execute(new GetKindergartenQuery(id)));
}

export async function getAllChildren() {
  return getApp()
    .resolve(GetAllChildrenHandler)
    .then(handler => {
      return handler.execute();
    });
}

export async function getNotificationsForUser(user: string) {
  return getApp()
    .resolve(GetNotificationsByUserHandler)
    .then(handler => {
      return handler.execute(new GetNotificationsByUserQuery(user));
    });
}

export async function getUsers(role = 'parent') {
  return getApp()
    .resolve(GetAllUsersHandler)
    .then(handler => {
      return handler.execute(new GetAllUsersQuery({ role }));
    });
}

export async function getAllArticles(page = 1, perPage = 6) {
  return getApp()
    .resolve(GetAllArticlesHandler)
    .then(handler => {
      return handler.execute(
        new GetAllArticlesQuery(page, perPage, {
          mail: 'admin@admin.com',
          role: 'admin',
          userId: '',
        }),
      );
    });
}

export async function createAssessment(options: AssessmentInput) {
  return getApp()
    .resolve(CreateAssessmentHandler)
    .then(handler => {
      return handler.execute(new CreateAssessmentCommand(options));
    });
}

export async function getAssessment(id: string) {
  return getApp()
    .resolve(GetAssessmentHandler)
    .then(handler => {
      return handler.execute(new GetAssessmentsQuery(id));
    });
}
