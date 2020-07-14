import * as mongoose from 'mongoose';

import { ChildResultProps } from './child_result_model';

export interface ChildProps {
  _id: string;
  firstname: string;
  lastname: string;
  results?: mongoose.Schema.Types.ObjectId[] | ChildResultProps[];
}
