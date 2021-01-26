import { ReactiveVar } from '@apollo/client';
import { AgreementKindergartenFilter } from '../../../models/AgreementKindergartenFilters';

export function createAddAgreementKindergartenFilters(
    agreementKindergartenFilterVar: ReactiveVar<AgreementKindergartenFilter[]>,
) {
    return (filter: AgreementKindergartenFilter[]) => agreementKindergartenFilterVar([...filter]);
}
