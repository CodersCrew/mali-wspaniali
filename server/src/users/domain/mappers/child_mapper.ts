import {
  Child,
  ChildProps,
  NotCreatedChildProps,
  Firstname,
  Lastname,
  Sex,
} from '../models';
import { Result } from '../../../shared/domain/result';
import { BirthYear } from '../models/birth_year_value_object';
import { ObjectId } from '../models/object_id_value_object';
import { BirthQuarter } from '../models/birth_quarter_value_object';
import { ChildDTO } from '../../dto/children_dto';

interface DomainMapperOptions {
  isNew: boolean;
}

type ChildTypes =
  | Firstname
  | Lastname
  | Sex
  | BirthYear
  | BirthQuarter
  | ObjectId;

export class ChildMapper {
  static toDomain(
    props: ChildProps | NotCreatedChildProps,
    options?: DomainMapperOptions,
  ): Child {
    const _id = '_id' in props ? ObjectId.create(props._id) : ObjectId.create();
    const firstname = Firstname.create(props.firstname);
    const lastname = Lastname.create(props.lastname);
    const sex = Sex.create(props.sex);
    const birthYear = BirthYear.create(props.birthYear);
    const birthQuarter = BirthQuarter.create(props.birthQuarter);
    const kindergarten = ObjectId.create(props.kindergarten);
    const results = props.results.map(result => ObjectId.create(result));

    const areChildResultsValid = (Result.combine(
      props.results.map(result => ObjectId.create(result)),
    ) as unknown) as Result<Result<ObjectId>[]>;

    const result = Result.combine<ChildTypes>([
      _id,
      firstname,
      lastname,
      sex,
      birthYear,
      birthQuarter,
      kindergarten,
    ]);

    if (result.isSuccess && areChildResultsValid.isSuccess) {
      const createChild = options?.isNew ? Child.create : Child.recreate;

      return createChild({
        _id: _id.getValue(),
        firstname: firstname.getValue(),
        lastname: lastname.getValue(),
        sex: sex.getValue(),
        isDeleted: props.isDeleted,
        birthYear: birthYear.getValue(),
        date: options?.isNew
          ? new Date()
          : ((props as ChildProps).date as Date),
        birthQuarter: birthQuarter.getValue(),
        kindergarten: kindergarten.getValue(),
        results: results.map(result => result.getValue()),
      });
    } else {
      throw new Error(result.error as string);
    }
  }

  static toPersistence(child: Child): ChildProps | NotCreatedChildProps {
    if (child.id.isEmpty()) {
      return {
        firstname: child.firstname.value,
        lastname: child.lastname.value,
        sex: child.sex.value,
        isDeleted: child.isDeleted,
        birthYear: child.birthYear.value,
        birthQuarter: child.birthQuarter.value,
        kindergarten: child.kindergarten.value,
        results: child.results.map(result => result.value),
      };
    }

    return {
      _id: child.id.value,
      firstname: child.firstname.value,
      lastname: child.lastname.value,
      sex: child.sex.value,
      isDeleted: child.isDeleted,
      birthYear: child.birthYear.value,
      birthQuarter: child.birthQuarter.value,
      date: child.date,
      kindergarten: child.kindergarten.value,
      results: child.results.map(result => result.value),
    };
  }

  static toDTO(child: Child): ChildDTO {
    return {
      _id: child.id.value,
      firstname: child.firstname.value,
      lastname: child.lastname.value,
      sex: child.sex.value,
      isDeleted: child.isDeleted,
      birthYear: child.birthYear.value,
      birthQuarter: child.birthQuarter.value,
      date: child.date,
      kindergarten: child.kindergarten.value,
      results: child.results.map(result => result.value),
    };
  }
}
