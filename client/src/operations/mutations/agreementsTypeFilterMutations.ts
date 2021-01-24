import {
    agreementTypeFilterVar,
    agreementStatusFilterVar,
    agreementKindergartenFilterVar,
    agreementSortStatusVar,
} from '../../apollo_client';

import { createSetAgreementTypeFilter } from './Agreements/setAgreementTypeFilter';
import { createSetAgreementStatusFilter } from './Agreements/setAgreementStatusFilter';
import { createSetAgreementKindergartenFilter } from './Agreements/setAgreementKindergartenFilter';
import { createAddAgreementKindergartenFilters } from './Agreements/addAgreementKindergartenFilters';
import { createSetAgreementSortStatus } from './Agreements/setAgreementSortStatus';

export const AgreementsTypeFilterMutations = {
    setAgreementsTypeFilter: createSetAgreementTypeFilter(agreementTypeFilterVar),
    setAgreementsStatusFilter: createSetAgreementStatusFilter(agreementStatusFilterVar),
    setAgreementsSortStatus: createSetAgreementSortStatus(agreementSortStatusVar),
    setAgreementsKindergartenFilter: createSetAgreementKindergartenFilter(agreementKindergartenFilterVar),
    addAgreementsKindergartenFilters: createAddAgreementKindergartenFilters(agreementKindergartenFilterVar),
};
