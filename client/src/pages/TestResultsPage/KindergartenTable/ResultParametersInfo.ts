import { Assessment } from '@app/graphql/types';
import { MeasurementType } from '../TestToggleButton';

export interface ResultParametersInfo {
    measurementType: MeasurementType;
    assessmentId: string;
    kindergartenId: string;
    assessment: Assessment;
}
