import * as mongoose from 'mongoose';

export interface ChildResultProps {
  readonly _id: string;
  readonly date?: Date;
  readonly childId: string | mongoose.Schema.Types.ObjectId;
  readonly test: {
    readonly type: string;
    readonly childAge: number;
    readonly agilityPoints: number;
    readonly agilitySeconds: number;
    readonly powerCentimeters: number;
    readonly powerPoints: number;
    readonly schoolYearStart: number;
    readonly speedPoints: number;
    readonly speedSeconds: number;
    readonly strengthCentimeters: number;
    readonly strengthPoints: number;
    readonly testPeriod: string;
  };
  readonly rootResultId?: string | mongoose.Schema.Types.ObjectId;
}
