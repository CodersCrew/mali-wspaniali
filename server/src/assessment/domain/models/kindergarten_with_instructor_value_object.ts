import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';

type Value = Props<KindergartenWithInstructorProps>;

export interface KindergartenWithInstructorProps {
  kindergartenId: ObjectId;
  instructorId: ObjectId | null;
}

export class KindergartenWithInstructor extends ValueObject<
  KindergartenWithInstructorProps
> {
  private constructor(props: Value) {
    super(props);
  }

  public static create(
    value: KindergartenWithInstructorProps,
  ): Result<KindergartenWithInstructor> {
    const isNull = Guard.againstNullOrUndefined(
      value.kindergartenId,
      'kindergartenId',
    );

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (!(value.kindergartenId instanceof ObjectId)) {
      return Result.fail('KindergartenWithInstructor must be valid');
    }

    return Result.ok(new KindergartenWithInstructor({ value }));
  }
}
