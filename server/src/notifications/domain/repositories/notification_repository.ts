import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { NotificationDocument } from '../../schemas/notifications_schema';
import { CreateNotificationProps } from '../models/notification_model';
import { Model } from 'mongoose';
import { NotificationProps } from '../../../notifications/domain/models/notification_model';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notifications')
    private readonly repository: Model<NotificationDocument>,
  ) {}

  async getAll(userId: string): Promise<NotificationProps[]> {
    return await this.repository
      .find({ user: userId }, {}, { sort: { date: -1 } })
      .lean()
      .exec()
      .then(results =>
        results.map(result => ({
          ...result,
          user: result.user.toString(),
          _id: result._id.toString(),
        })),
      );
  }

  async create(
    createNotificationDTO: CreateNotificationProps,
  ): Promise<NotificationDocument> {
    if (Array.isArray(createNotificationDTO.user)) {
      this.repository.insertMany(
        createNotificationDTO.user.map(u => {
          return { ...createNotificationDTO, user: u };
        }),
      );
    } else {
      const createdNotification = new this.repository(createNotificationDTO);

      return await createdNotification.save();
    }
  }

  async read(id: string): Promise<NotificationProps> {
    return await this.repository.findByIdAndUpdate(
      id,
      {
        isRead: true,
      },
      { new: true },
    );
  }

  async removeOlderThan(days: number): Promise<void> {
    this.repository
      .deleteMany({
        date: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.repository.deleteMany({});
  }
}
