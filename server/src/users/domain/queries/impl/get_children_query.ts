import * as mongoose from 'mongoose';

export class GetChildrenQuery {
  constructor(public readonly ids: mongoose.Schema.Types.ObjectId[]) {}
}
