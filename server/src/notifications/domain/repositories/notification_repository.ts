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

  async getAll(
    user: string | mongoose.Schema.Types.ObjectId,
  ): Promise<NotificationProps[]> {
    const query: { [index: string]: unknown } = {};

    if (isObjectId(user)) {
      query.user = user;
    } else {
      query.user = new mongoose.Schema.Types.ObjectId(user);
    }

    return await this.repository
      .find(query, {}, { sort: { date: -1 } })
      .lean()
      .exec();
  }

  async create(
    createNotificationDTO: CreateNotificationProps,
  ): Promise<NotificationDocument> {
    const createdNotification = new this.repository(createNotificationDTO);

    return await createdNotification.save();
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

function isObjectId(
  v: string | mongoose.Schema.Types.ObjectId,
): v is mongoose.Schema.Types.ObjectId {
  return typeof v !== 'string';
}
