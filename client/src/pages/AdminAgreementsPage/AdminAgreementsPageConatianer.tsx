import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Kindergarten, KindergartenWithUsers } from '../../graphql/types';
import { KINDERGARTEN_WITH_USERS } from '../../graphql/kindergartensRepository';
import { AdminAgreementsPage } from './AdminAgreementsPage';
import { AgreementsTypeFilterMutations } from '../../operations/mutations/agreementsTypeFilterMutations';
import { AgreementKindergartenFilters } from '../../models/AgreementKindergartenFilters';
import {
    GetAgreementsStatusFilterQuery,
    GET_AGREEMENTS_STATUS_FILTER,
} from '../../operations/queries/Agreements/getAgreementsStatusFilter';
import {
    GetAgreementsTypeFilterQuery,
    GET_AGREEMENTS_TYPE_FILTER,
} from '../../operations/queries/Agreements/getAgreementsTypeFilter';
import {
    GetAgreementsKindergartenFilterQuery,
    GET_AGREEMENTS_KINDERGARTEN_FILTER,
} from '../../operations/queries/Agreements/getAgreementsKindergartenFilter';
import { GET_AGREEMENTS_SORT_STATUS } from '../../operations/queries/Agreements/getAgreementsSortStatus';
import { AgreementTypeFilters } from '../../models/AgreementTypeFilters';
import { AgreementStatusFilters } from '../../models/AgreementStatusFilter';
import { agreementSortStatusVar } from '../../apollo_client';
import { AgreementSortStatus } from '../../models/AgreementSortStatus';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';

export default function AdminAgreementsPageContainer() {
    const { kindergartenList, isKindergartenListLoading } = useKindergartens();

    const [getSpecificKindergartens, { data: kindergartens, loading: isKindergartenLoading }] = useLazyQuery<{
        kindergartenWithUsers: KindergartenWithUsers[];
    }>(KINDERGARTEN_WITH_USERS);

    const agreementsStatusFilterQuery = useQuery<GetAgreementsStatusFilterQuery>(GET_AGREEMENTS_STATUS_FILTER);
    const { agreementsStatusFilter } = agreementsStatusFilterQuery.data!;

    const agreementsTypeFilterQuery = useQuery<GetAgreementsTypeFilterQuery>(GET_AGREEMENTS_TYPE_FILTER);
    const { agreementsTypeFilter } = agreementsTypeFilterQuery.data!;

    const agreementsKindergartenFilterQuery = useQuery<GetAgreementsKindergartenFilterQuery>(
        GET_AGREEMENTS_KINDERGARTEN_FILTER,
    );

    const agreementsKindergartenFilter = agreementsKindergartenFilterQuery.data?.agreementsKindergartenFilter!;

    const sortStatusQuery = useQuery(GET_AGREEMENTS_SORT_STATUS);
    const { agreementsSortStatus } = sortStatusQuery.data;

    React.useEffect(() => {
        if (kindergartenList) {
            AgreementsTypeFilterMutations.addAgreementsKindergartenFilters([
                AgreementKindergartenFilters.SHOW_ALL,
                ...kindergartenList.map(mapToFilter),
            ]);

            getSpecificKindergartens({ variables: { ids: kindergartenList.map((k) => k._id) } });
        }
    }, [kindergartenList, getSpecificKindergartens]);

    if (isKindergartenListLoading) return <div>Loading...</div>;

    if (!kindergartenList) return null;

    return (
        <AdminAgreementsPage
            kindergartens={mapWithFilters([...(kindergartens?.kindergartenWithUsers || [])])}
            agreementsStatusFilter={agreementsStatusFilter}
            agreementsTypeFilter={agreementsTypeFilter}
            agreementsKindergartenFilter={agreementsKindergartenFilter}
            agreementsSortStatus={agreementsSortStatus}
            isKindergartenLoading={isKindergartenLoading}
            actions={{
                setSortStatus,
                setAgreementFilter,
                sendFilterChanges,
            }}
        />
    );
}

function mapToFilter({ _id, name }: Kindergarten) {
    return { id: _id, displayName: name, displayNameKey: '', selected: false };
}

function setSortStatus(value: string) {
    AgreementsTypeFilterMutations.setAgreementsSortStatus({ id: value });
}

function setAgreementFilter(type: string, value: string | string[]) {
    if (Array.isArray(value)) {
        if (type === 'KINDERGARTEN') {
            AgreementsTypeFilterMutations.setAgreementsKindergartenFilter(value);
        }
    } else {
        if (type === 'TYPE') {
            AgreementsTypeFilterMutations.setAgreementsTypeFilter(AgreementTypeFilters[value]);
        }

        if (type === 'STATUS') {
            AgreementsTypeFilterMutations.setAgreementsStatusFilter(AgreementStatusFilters[value]);
        }
    }
}

function sendFilterChanges() {
    console.log('sent');
}

function mapWithFilters(kindergartens: KindergartenWithUsers[]) {
    return mapWithSorting(kindergartens);
}

function mapWithSorting(kindergartens: KindergartenWithUsers[]) {
    const { id: sortBy } = agreementSortStatusVar();

    if (sortBy === AgreementSortStatus.BY_NAME_RISING.id) {
        return kindergartens.sort((kA, kB) => {
            return kA.number - kB.number;
        });
    }

    if (sortBy === AgreementSortStatus.BY_NAME_FALLING.id) {
        return kindergartens.sort((kA, kB) => {
            return kB.number - kA.number;
        });
    }

    return kindergartens;
}
