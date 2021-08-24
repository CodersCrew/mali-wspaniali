import { ReactiveVar } from '@apollo/client';

import { AgreementStatusFilter, AgreementStatusFilters } from '../../../models/AgreementStatusFilter';

export function createSetAgreementStatusFilter(agreementStatusFilterVar: ReactiveVar<AgreementStatusFilter[]>) {
    return (filter: string[]) => {
        const options = agreementStatusFilterVar();

        return agreementStatusFilterVar(selectStatusFilters(options, filter));
    };
}

function selectStatusFilters(options: AgreementStatusFilter[], selectedIds: string[]) {
    if (selectedIds.length === 0) {
        return options.map((o) => ({ ...o, selected: o.id === AgreementStatusFilters.GIVEN_AGREEMENT.id }));
    }

    return options.map((o) => {
        if (o.id === AgreementStatusFilters.GIVEN.id) return { ...o, selected: false };

        return {
            ...o,
            selected: selectedIds.includes(o.id),
        };
    });
}
