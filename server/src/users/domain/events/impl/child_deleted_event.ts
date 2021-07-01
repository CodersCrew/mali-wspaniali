import { ObjectId } from '../../models/object_id_value_object';

export class ChildDeletedEvent {
  constructor(public childId: ObjectId) {}
}
