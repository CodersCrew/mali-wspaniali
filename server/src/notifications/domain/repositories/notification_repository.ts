import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { NotificationDocument } from '../../schemas/notifications_schema';
import {
  CreateNotificationProps,
  NotificationCore,
} from '../models/notification_model';
import { Model } from 'mongoose';
import { transformAndValidateSync } from 'class-transformer-validator';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel('Notifications')
    private repository: Model<NotificationDocument>,
  ) {}

  async getAll(userId: string): Promise<NotificationCore[]> {
    return await this.repository
      .find({ user: userId }, {}, { sort: { createdAt: -1 } })
      .lean()
      .exec();
  }

  async create(
    createNotificationDTO: CreateNotificationProps,
  ): Promise<NotificationDocument> {
    if (Array.isArray(createNotificationDTO.userId)) {
      this.repository.insertMany(
        createNotificationDTO.userId.map(u => {
          return { ...createNotificationDTO, user: u };
        }),
      );
    } else {
      const createdNotification = new this.repository(
        transformAndValidateSync(
          NotificationCore,
          { ...createNotificationDTO, user: createNotificationDTO.userId },
          {
            transformer: { excludeExtraneousValues: true },
            validator: { validationError: { target: false, value: false } },
          },
        ),
      );

      return await createdNotification.save();
    }
  }

  async read(id: string): Promise<NotificationCore> {
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
        createdAt: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.repository.deleteMany({});
  }
}
