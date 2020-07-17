import * as mongoose from 'mongoose';

import { ChildResultProps } from './child_result_model';

export interface ChildProps {
  _id: string;
  firstname: string;
  lastname: string;
  sex: string;
  birthYear: number;
  results?: mongoose.Schema.Types.ObjectId[] | ChildResultProps[];
}
