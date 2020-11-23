interface NotificationFactoryResult {
  user: string | string[];
  templateId: string;
  values: string[];
}

export function createArticleCreatedNotification(
  user: string,
): NotificationFactoryResult {
  return {
    user,
    templateId: 'new_article',
    values: [],
  };
}

export function createUserCreatedNotification(
  user: string,
  values: string[],
): NotificationFactoryResult {
  return {
    user,
    templateId: 'new_user',
    values,
  };
}

export function createChildNotification(
  user: string,
): NotificationFactoryResult {
  return {
    user,
    templateId: 'child_created',
    values: [],
  };
}

export function createAssessmentCreatedNotification(
  users: string | string[],
  values: string[],
): NotificationFactoryResult {
  return {
    user: users,
    templateId: 'new_assessment',
    values,
  };
}

export function createKindergartenCreatedNotification(
  user: string[],
  name: string,
): NotificationFactoryResult {
  return {
    user,
    templateId: 'kindergarten_created',
    values: [name],
  };
}
