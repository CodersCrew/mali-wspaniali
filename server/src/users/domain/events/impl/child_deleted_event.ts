import { ObjectId } from '../../models/object_id_value_object';

export class ChildDeletedEvent {
  constructor(
    public readonly userId: ObjectId,
    public readonly childId: ObjectId,
  ) {}
}
