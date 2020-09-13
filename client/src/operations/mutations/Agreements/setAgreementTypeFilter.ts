import { ReactiveVar } from '@apollo/client';

import { AgreementTypeFilter } from '../../../models/AgreementTypeFilters';

export function createSetAgreementTypeFilter(agreementTypeFilterVar: ReactiveVar<AgreementTypeFilter>) {
    return (filter: AgreementTypeFilter) => agreementTypeFilterVar(filter);
}
