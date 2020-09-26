import { ReactiveVar } from '@apollo/client';

import { AgreementSortType } from '../../../models/AgreementSortStatus';

export function createSetAgreementSortStatus(agreementSortStatusVar: ReactiveVar<AgreementSortType>) {
    return (filter: AgreementSortType) => agreementSortStatusVar(filter);
}
