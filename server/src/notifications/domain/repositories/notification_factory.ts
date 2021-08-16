import { Notification } from '../models/notification_model';
import { NotificationMapper } from '../mappers/notification_mapper';

export function createArticleCreatedNotification(
  users: string[],
  title: string,
): Notification[] {
  return NotificationMapper.toDomainMany(
    users.map(user => ({
      user,
      templateId: 'new_article',
      values: [title],
    })),
  );
}

export function createUserCreatedNotification(
  users: string[],
  values: string[],
): Notification[] {
  return NotificationMapper.toDomainMany(
    users.map(user => ({
      user,
      templateId: 'new_user',
      values,
    })),
  );
}

export function createChildNotification(users: string[]): Notification[] {
  return NotificationMapper.toDomainMany(
    users.map(user => ({
      user,
      templateId: 'child_created',
      values: [],
    })),
  );
}

export function createAssessmentCreatedNotification(
  users: string[],
  values: string[],
): Notification[] {
  return NotificationMapper.toDomainMany(
    users.map(user => ({
      user,
      templateId: 'new_assessment',
      values,
    })),
  );
}

export function createKindergartenCreatedNotification(
  users: string[],
  name: string,
): Notification[] {
  return NotificationMapper.toDomainMany(
    users.map(user => ({
      user,
      templateId: 'kindergarten_created',
      values: [name],
    })),
  );
}
