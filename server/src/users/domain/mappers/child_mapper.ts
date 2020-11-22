import { Child, ChildProps, Firstname, Lastname, Sex } from '../models';
import { Result } from '../../../shared/domain/result';
import { BirthYear } from '../models/birth_year_value_object';
import { ObjectId } from '../models/object_id_value_object';
import { BirthQuarter } from '../models/birth_quarter_value_object';

interface DomainMapperOptions {
  isNew: boolean;
}

export class ChildMapper {
  static toDomain(props: ChildProps, options?: DomainMapperOptions): Child {
    const _id = ObjectId.create(props._id);
    const firstname = Firstname.create(props.firstname);
    const lastname = Lastname.create(props.lastname);
    const sex = Sex.create(props.sex);
    const birthYear = BirthYear.create(props.birthYear);
    const birthQuarter = BirthQuarter.create(props.birthQuarter);
    const kindergarten = ObjectId.create(props.kindergarten);

    const result = Result.combine([
      _id,
      firstname,
      lastname,
      sex,
      birthYear,
      birthQuarter,
      kindergarten,
    ]);

    if (result.isSuccess) {
      const createChild =
        options && options.isNew ? Child.create : Child.recreate;

      return createChild({
        _id: _id.getValue(),
        firstname: firstname.getValue(),
        lastname: lastname.getValue(),
        sex: sex.getValue(),
        isDeleted: props.isDeleted,
        birthYear: birthYear.getValue(),
        birthQuarter: birthQuarter.getValue(),
        kindergarten: kindergarten.getValue(),
      });
    } else {
      throw new Error(result.error);
    }
  }

  static toPersistence(child: Child): ChildProps {
    const childOptions = {
      _id: child.id.value,
      firstname: child.firstname.value,
      lastname: child.lastname.value,
      sex: child.sex.value,
      isDeleted: child.isDeleted,
      birthYear: child.birthYear.value,
      birthQuarter: child.birthQuarter.value,
      kindergarten: child.kindergarten.value,
    };

    return childOptions;
  }
}
