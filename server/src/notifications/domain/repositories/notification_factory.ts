interface NotificationFactoryResult {
  userId: string | string[];
  templateId: string;
  values: string[];
}

export function createArticleCreatedNotification(
  userId: string,
  title: string,
): NotificationFactoryResult {
  return {
    userId,
    templateId: 'new_article',
    values: [title],
  };
}

export function createUserCreatedNotification(
  userId: string,
  values: string[],
): NotificationFactoryResult {
  return {
    userId,
    templateId: 'new_user',
    values,
  };
}

export function createChildNotification(
  userId: string,
): NotificationFactoryResult {
  return {
    userId,
    templateId: 'child_created',
    values: [],
  };
}

export function createAssessmentCreatedNotification(
  users: string | string[],
  values: string[],
): NotificationFactoryResult {
  return {
    userId: users,
    templateId: 'new_assessment',
    values,
  };
}

export function createKindergartenCreatedNotification(
  userId: string[],
  name: string,
): NotificationFactoryResult {
  return {
    userId,
    templateId: 'kindergarten_created',
    values: [name],
  };
}
