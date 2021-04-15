import { KindergartenProps } from '../../../kindergartens/domain/models/kindergarten_model';
import { Kindergarten } from '../models/kindergarten_model';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { KindergartenTitle } from '../models/kindergarten_title_value_object';
import { IsDeleted } from '../models/is_deleted_value_object';
import { KindergartenInput } from '@kindergartens/inputs/kindergarten_input';
import { Result } from '../../../shared/domain/result';

interface DomainMapperOptions {
  isNew?: boolean;
}

export class KindergartenMapper {
  static toDomainFrom(
    props: KindergartenInput | KindergartenProps,
    options: DomainMapperOptions = {},
  ): Kindergarten {
    const create = options.isNew ? Kindergarten.create : Kindergarten.recreate;

    if (isKindergartenProps(props)) {
      const _id = ObjectId.create(props._id);
      const kindergartenTitle = KindergartenTitle.create(props.name);
      const isDeleted = IsDeleted.create(props.isDeleted);

      const result = Result.combine([_id, kindergartenTitle, isDeleted as any]);

      if (result.isSuccess) {
        return create({
          _id: _id.getValue(),
          date: props.date,
          number: props.number,
          name: kindergartenTitle.getValue(),
          address: props.address,
          city: props.city,
          isDeleted: isDeleted.getValue(),
        });
      } else {
        throw new Error(result.error as string);
      }
    } else {
      const _id = ObjectId.create();

      const kindergartenTitle = KindergartenTitle.create(props.name);

      const result = Result.combine([_id, kindergartenTitle]);

      if (result.isSuccess) {
        return create({
          _id: _id.getValue(),
          date: new Date(Date.now()),
          number: props.number,
          name: kindergartenTitle.getValue(),
          address: props.address,
          city: props.city,
          isDeleted: IsDeleted.create().getValue(),
        });
      } else {
        throw new Error(result.error as string);
      }
    }
  }

  static toPersistant(
    kindergarten: Kindergarten,
  ): KindergartenProps | Omit<KindergartenProps, '_id'> {
    if (kindergarten.id.isEmpty()) {
      return {
        date: kindergarten.date,
        number: kindergarten.number,
        name: kindergarten.name.value,
        address: kindergarten.address,
        city: kindergarten.city,
        isDeleted: kindergarten.isDeleted.value,
      };
    }

    return {
      _id: kindergarten.id.value,
      date: kindergarten.date,
      number: kindergarten.number,
      name: kindergarten.name.value,
      address: kindergarten.address,
      city: kindergarten.city,
      isDeleted: kindergarten.isDeleted.value,
    };
  }

  static toRaw(kindergarten: Kindergarten): KindergartenProps {
    return {
      _id: kindergarten.id.value.toString(),
      date: kindergarten.date,
      number: kindergarten.number,
      name: kindergarten.name.value,
      address: kindergarten.address,
      city: kindergarten.city,
      isDeleted: kindergarten.isDeleted.value,
    };
  }
}

function isKindergartenProps(
  value: KindergartenInput | KindergartenProps,
): value is KindergartenProps {
  return '_id' in value;
}
