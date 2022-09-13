import { transformAndValidateSync } from 'class-transformer-validator';
import { classToPlain } from 'class-transformer';

import { NewsletterCore, Newsletter } from '../models/newsletter_model';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

export class NewsletterMapper {
  static toDomain(
    value: NewsletterCore,
    options: { isNew: boolean } = { isNew: false },
  ): Newsletter {
    const createNewsletter = options.isNew
      ? Newsletter.create
      : Newsletter.recreate;

    return createNewsletter(
      transformAndValidateSync(
        NewsletterCore,
        value,
        getCoreValidationConfig(),
      ),
    );
  }

  static toDomainMany(
    values: NewsletterCore[],
    options: { isNew: boolean } = { isNew: false },
  ): Newsletter[] {
    return values.map(value => NewsletterMapper.toDomain(value, options));
  }

  static toPlain(value: Newsletter): NewsletterCore {
    const props = value.getProps();

    return classToPlain(props, {
      excludeExtraneousValues: true,
    }) as NewsletterCore;
  }

  static toPlainMany(values: Newsletter[]): NewsletterCore[] {
    return values.map(value => NewsletterMapper.toPlain(value));
  }
}
