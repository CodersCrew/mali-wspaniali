import {
  RedactorProps,
  Redactor,
  RedactorInnerProps,
} from '../models/redactor';
import { Firstname, Lastname } from '../../../users/domain/models';
import { Result } from '../../../shared/domain/result';
import { Url } from '../../../shared/domain/url';

export class RedactorMapper {
  static toDomain(props: RedactorProps): Result<Redactor> {
    const firstname = Firstname.create(props.firstName);
    const lastname = Lastname.create(props.lastName);

    const result = Result.combine([firstname, lastname]);

    if (result.isFailure) {
      return createInvalidPropsResult();
    }

    const options: RedactorInnerProps = {
      firstName: firstname.getValue(),
      lastName: lastname.getValue(),
    };

    if (props.avatarUrl) {
      const avatarUrl = Url.create(props.avatarUrl);

      if (avatarUrl.isFailure) {
        return createInvalidPropsResult();
      }

      options.avatarUrl = avatarUrl.getValue();
    }

    if (props.biography) {
      options.biography = props.biography;
    }

    if (props.profession) {
      options.profession = props.profession;
    }

    if (props.shortDescription) {
      options.shortDescription = props.shortDescription;
    }

    return Result.ok(Redactor.create(options));
  }

  static toPersistence(props: Redactor): RedactorProps {
    const options: RedactorProps = {
      firstName: props.firstName.value,
      lastName: props.lastName.value,
    };

    if (props.avatarUrl) {
      options.avatarUrl = props.avatarUrl.value;
    }

    if (props.biography) {
      options.biography = props.biography;
    }

    if (props.profession) {
      options.profession = props.profession;
    }

    if (props.shortDescription) {
      options.shortDescription = props.shortDescription;
    }

    return options;
  }
}

function createInvalidPropsResult() {
  return Result.fail<Redactor>('"Redactor" props should be valid');
}
