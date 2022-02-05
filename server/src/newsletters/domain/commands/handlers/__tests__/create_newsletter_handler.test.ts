import waitForExpect from 'wait-for-expect';

import { CreateNewsletterHandler } from '../create_newsletter_handler';
import { CreateNewsletterCommand } from '../../impl/create_newsletter_command';
import { NewsletterInput } from '../../../../inputs/newsletter_input';

import { GetAllNewsletterHandler } from '../../../queries/handlars/get_all_newsletters_handler';
import { SendMail } from '../../../../../shared/services/send_mail/send_mail';
import { getApp } from '../../../../../../setupTests';

describe('CreateNewsletterHandler', () => {
  let sendMail: SendMail;

  describe('when executed', () => {
    beforeEach(async () => {
      sendMail = getApp().get(SendMail);
    });

    it('sends a newsletter', async () => {
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
        const newsletters = await getNewsletterWith();

        expect(newsletters[0].title).toBe('My title');
        expect(newsletters[0].message).toBe('My message');
        expect(newsletters[0].recipients).toEqual([]);

        await awaitForResponse();

        expect(sendSpy).toBeCalledWith(
          expect.objectContaining({
            bcc: [],
            from: 'my-admin@admin.com',
            subject: 'My title',
          }),
        );
        expect(sendSpy.mock.calls[0][0].html).toMatch('My title');
        expect(sendSpy.mock.calls[0][0].html).toMatch('My message');
      });
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

  async function getNewsletterWith(options: Partial<NewsletterInput> = {}) {
    return await getApp()
      .get(GetAllNewsletterHandler)
      .execute();
  }
});

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
