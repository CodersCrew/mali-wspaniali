import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import waitForExpect from 'wait-for-expect';

import { NewslettersModule } from '../../../../newsletters_module';
import { CreateNewsletterHandler } from '../create_newsletter_handler';
import { CreateNewsletterCommand } from '../../impl/create_newsletter_command';
import { NewsletterInput } from '../../../../inputs/newsletter_input';
import { UsersModule } from '../../../../../users/users_module';

import * as dbHandler from '@app/db_handler';
import { KeyCodesModule } from '../../../../../key_codes/key_codes_module';
import { CreateKeyCodeHandler } from '../../../../../key_codes/domain/commands/handlers/create_key_code_handler';
import { AgreementsModule } from '../../../../../agreements/agreements_module';
import { KindergartenModule } from '../../../../../kindergartens/kindergarten_module';
import { CreateUserHandler } from '../../../../../users/domain/commands/handlers/create_user_handler';
import { GetAllNewsletterHandler } from '../../../queries/handlars/get_all_newsletters_handler';
import { SendMail } from '../../../../../shared/services/send_mail/send_mail';

describe('CreateNewsletterHandler', () => {
  let app: TestingModule;
  let sendMail: SendMail;

  afterAll(async () => {
    await app.close();
  });

  beforeAll(async () => {
    app = await setup();
  });

  beforeEach(async () => {
    await dbHandler.clearDatabase();
  });

  describe('when executed', () => {
    beforeEach(async () => {
      sendMail = app.get(SendMail);
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
      });

      await awaitForResponse();

      expect(sendSpy).toBeCalledWith(
        expect.objectContaining({
          bcc: [],
          from: 'izabela.demczuk@mali-wspaniali.pl',
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

    await app
      .get(CreateNewsletterHandler)
      .execute(new CreateNewsletterCommand({ ...defaultOptions, ...options }));
  }

  async function getNewsletterWith(options: Partial<NewsletterInput> = {}) {
    return await app.get(GetAllNewsletterHandler).execute();
  }
});

async function setup() {
  const module = await Test.createTestingModule({
    imports: [
      dbHandler.rootMongooseTestModule(),
      CqrsModule,
      UsersModule,
      AgreementsModule,
      KeyCodesModule,
      KindergartenModule,
      NewslettersModule,
    ],
    providers: [CreateKeyCodeHandler, CreateUserHandler],
  }).compile();

  await module.init();

  return module;
}

function awaitForResponse(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
