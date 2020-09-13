import { ReactiveVar } from '@apollo/client';

import { AgreementStatusFilter } from '../../../models/AgreementStatusFilter';

export function createSetAgreementStatusFilter(agreementStatusFilterVar: ReactiveVar<AgreementStatusFilter>) {
    return (filter: AgreementStatusFilter) => agreementStatusFilterVar(filter);
}
