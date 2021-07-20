import { NewsletterMapper } from '../../mappers/newsletter_mapper';
import { NewsletterCreatedEvent } from '../../events/impl/newsletter_created_event';

describe('Newsletter model', () => {
  it('created instance', () => {
    const newsletter = NewsletterMapper.toDomain({
      message: 'my-message',
      recipients: ['mark@mail.com'],
      title: 'my-title',
      type: 'advice',
    });

    expect(newsletter.id.length).not.toBe(0);
    expect(newsletter.recipients).toEqual(['mark@mail.com']);
    expect(newsletter.title).toBe('my-title');
    expect(newsletter.message).toBe('my-message');
    expect(newsletter.isDone).toBe(false);
    expect(newsletter.isDeleted).toBe(false);
    expect(newsletter.createdAt).toBeInstanceOf(Date);
    expect(newsletter.modifiedAt).toBeNull();
    expect(newsletter.deletedAt).toBeNull();
  });

  describe('if created', () => {
    it('emits events', () => {
      const newsletter = NewsletterMapper.toDomain(
        {
          message: 'my-message',
          recipients: ['mark@mail.com'],
          title: 'my-title',
          type: 'advice',
        },
        { isNew: true },
      );

      expect(newsletter.getUncommittedEvents().length).toBe(1);
      expect(newsletter.getUncommittedEvents()[0]).toBeInstanceOf(
        NewsletterCreatedEvent,
      );
    });
  });

  describe('if recreated', () => {
    it('emits events', () => {
      const newsletter = NewsletterMapper.toDomain({
        message: 'my-message',
        recipients: ['mark@mail.com'],
        title: 'my-title',
        type: 'advice',
      });

      expect(newsletter.getUncommittedEvents()).toEqual([]);
    });
  });

  describe('if created with invalid', () => {
    it('throws an error', () => {
      expect(() =>
        NewsletterMapper.toDomain({
          message: 'my-message',
          recipients: ['wrong-email'],
          title: 'my-title',
          type: 'advice',
        }),
      ).toHaveValidationErrorSync('each value in recipients must be an email');
    });
  });
});
