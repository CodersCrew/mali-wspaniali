export function createArticleCreatedNotification(user: string) {
  return {
    user,
    templateId: 'new_article',
    values: [],
  };
}

export function createUserCreatedNotification(user: string, values: string[]) {
  return {
    user,
    templateId: 'new_user',
    values,
  };
}
