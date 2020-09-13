import { agreementTypeFilterVar, agreementStatusFilterVar, agreementKindergartenFilterVar } from '../../apollo_client';
import { createSetAgreementTypeFilter } from './Agreements/setAgreementTypeFilter';
import { createSetAgreementStatusFilter } from './Agreements/setAgreementStatusFilter';
import { createSetAgreementKindergartenFilter } from './Agreements/setAgreementKindergartenFilter';
import { createAddAgreementKindergartenFilters } from './Agreements/addAgreementKindergartenFilters';

export const AgreementsTypeFilterMutations = {
    setAgreementsTypeFilter: createSetAgreementTypeFilter(agreementTypeFilterVar),
    setAgreementsStatusFilter: createSetAgreementStatusFilter(agreementStatusFilterVar),
    setAgreementsKindergartenFilter: createSetAgreementKindergartenFilter(agreementKindergartenFilterVar),
    addAgreementsKindergartenFilters: createAddAgreementKindergartenFilters(agreementKindergartenFilterVar),
};
