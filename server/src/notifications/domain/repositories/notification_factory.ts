interface NotificationFactoryResult {
  user: string;
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
