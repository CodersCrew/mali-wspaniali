import { ReactiveVar } from '@apollo/client';
import {
    AgreementKindergartenFilter,
    AgreementKindergartenFilters,
} from '../../../models/AgreementKindergartenFilters';

export function createSetAgreementKindergartenFilter(
    agreementKindergartenFilterVar: ReactiveVar<AgreementKindergartenFilter[]>,
) {
    return (filter: string[]) => {
        const options = agreementKindergartenFilterVar();

        return agreementKindergartenFilterVar(selectKindergartenFilters(options, filter));
    };
}

function selectKindergartenFilters(options: AgreementKindergartenFilter[], selectedIds: string[]) {
    if (isLastElementDefault(selectedIds) && selectedIds.length > 1) {
        return options.map(o => ({ ...o, selected: o.id === AgreementKindergartenFilters.SHOW_ALL.id }));
    }

    if (isLastElementDefault(selectedIds) && selectedIds.length === 1) {
        return options.map(o => ({ ...o, selected: o.id === AgreementKindergartenFilters.SHOW_ALL.id }));
    }

    if (selectedIds.length === 0) {
        return options.map(o => ({ ...o, selected: o.id === AgreementKindergartenFilters.SHOW_ALL.id }));
    }

    return options.map(o => {
        if (o.id === AgreementKindergartenFilters.SHOW_ALL.id) return { ...o, selected: false };

        return {
            ...o,
            selected: selectedIds.includes(o.id),
        };
    });
}

function isLastElementDefault(selectedIds: string[]) {
    return selectedIds[selectedIds.length - 1] === AgreementKindergartenFilters.SHOW_ALL.id;
}
