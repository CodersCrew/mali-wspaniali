import waitForExpect from 'wait-for-expect';

import { CreateNewsletterHandler } from '../create_newsletter_handler';
import { CreateNewsletterCommand } from '../../impl/create_newsletter_command';
import { NewsletterInput } from '../../../../inputs/newsletter_input';
import { SendMail } from '../../../../../shared/services/send_mail/send_mail';
import { getApp } from '../../../../../../setupTests';
import { createParent } from '@app/test/helpers/app_mock';
import { getNewsletters } from '../../../../../test/helpers/app_mock';

describe.skip('CreateNewsletterHandler', () => {
  let sendMail: SendMail;

  beforeEach(async () => {
    sendMail = getApp().get(SendMail);
  });

  it('sends a message to admin', async () => {
    const newsletterOptions = {
      message: 'My message to admin',
      recipients: ['fundacja@mali-wspaniali.pl'],
      title: 'My title',
      type: 'PRIVATE',
    };

    const sendSpy = jest.spyOn(sendMail, 'send');
    sendSpy.mockImplementation(() => null);
    await createNewsletterWith(newsletterOptions);

    await waitForExpect(async () => {
      const newsletters = await getNewsletters();

      expect(newsletters[0].title).toBe('My title');
      expect(newsletters[0].message).toBe('My message to admin');
      expect(newsletters[0].recipients).toEqual(['fundacja@mali-wspaniali.pl']);

      expect(sendSpy).toBeCalledWith(
        expect.objectContaining({
          bcc: ['fundacja@mali-wspaniali.pl'],
          from: 'my-admin@admin.com',
          subject: 'My title',
        }),
      );

      expect(sendSpy.mock.calls[0][0].html).toMatch('My title');
      expect(sendSpy.mock.calls[0][0].html).toMatch('My message to admin');
    });
  });

  it('sends a newsletter for all parents', async () => {
    await createParent({ mail: 'my-mail@mail.com' });
    await createParent({ mail: 'my-second-mail@mail.com' });
    const newsletterOptions = {
      message: 'My message',
      recipients: [],
      title: 'My title',
      type: 'ALL KINDERGARTENS',
    };

    const sendSpy = jest.spyOn(sendMail, 'send');
    sendSpy.mockImplementation(() => null);
    await createNewsletterWith(newsletterOptions);

    await waitForExpect(async () => {
      const newsletters = await getNewsletters();

      expect(newsletters[0].title).toBe('My title');
      expect(newsletters[0].message).toBe('My message');
      expect(newsletters[0].recipients).toEqual([]);

      expect(sendSpy).toBeCalledWith(
        expect.objectContaining({
          bcc: ['my-mail@mail.com', 'my-second-mail@mail.com'],
          from: 'my-admin@admin.com',
          subject: 'My title',
        }),
      );
      expect(sendSpy.mock.calls[0][0].html).toMatch('My title');
      expect(sendSpy.mock.calls[0][0].html).toMatch('My message');
    });
  });

  async function createNewsletterWith(options: Partial<NewsletterInput> = {}) {
    const defaultOptions = {
      message: 'My message',
      recipients: [],
      title: 'My title',
      type: 'My type',
    };

    await getApp()
      .get(CreateNewsletterHandler)
      .execute(new CreateNewsletterCommand({ ...defaultOptions, ...options }));
  }
});
