import { RedactorProps, Redactor } from '../models/redactor';
import { Firstname, Lastname } from '../../../users/domain/models';
import { Result } from '../../../shared/domain/result';
import { Url } from '../../../shared/domain/url';

export class RedactorMapper {
  static toDomain(props: RedactorProps): Result<Redactor> {
    const avatarUrl = Url.create(props.avatarUrl);
    const firstname = Firstname.create(props.firstName);
    const lastname = Lastname.create(props.lastName);

    const result = Result.combine([avatarUrl, firstname, lastname]);

    if (result.isSuccess) {
      const mappedProps = {
        ...props,
        avatarUrl: avatarUrl.getValue(),
        firstName: firstname.getValue(),
        lastName: lastname.getValue(),
      };

      return Result.ok(Redactor.create(mappedProps));
    } else {
      return Result.fail('"Redactor" props should be valid');
    }
  }

  static toPersistence(props: Redactor): RedactorProps {
    return {
      ...props,
      avatarUrl: props.value.avatarUrl.value,
      firstName: props.value.firstName.value,
      lastName: props.value.lastName.value,
    };
  }
}
