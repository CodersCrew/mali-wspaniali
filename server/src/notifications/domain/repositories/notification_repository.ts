import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotificationMapper } from '../mappers/notification_mapper';
import { NotificationDocument } from '../../schemas/notifications_schema';
import { Notification } from '../models/notification_model';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notifications')
    private repository: Model<NotificationDocument>,
  ) {}

  async getAll(userId: string): Promise<Notification[]> {
    const notifications = await this.repository.find(
      { user: userId },
      {},
      { sort: { createdAt: -1 } },
    );

    return notifications.map(NotificationMapper.toDomain);
  }

  async create(notifications: Notification[]): Promise<Notification[]> {
    this.repository.insertMany(notifications.map(NotificationMapper.toPlain));

    return notifications;
  }

  async read(id: string): Promise<Notification> {
    return await this.repository
      .findByIdAndUpdate(
        id,
        {
          isRead: true,
        },
        { new: true },
      )
      .then(NotificationMapper.toDomain);
  }

  async removeOlderThan(days: number): Promise<void> {
    this.repository
      .deleteMany({
        createdAt: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.repository.deleteMany({});
  }
}
