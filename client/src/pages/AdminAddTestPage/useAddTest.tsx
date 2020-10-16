import { useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { TestInformation, useCreateNewTest } from '../../operations/mutations/Test/createNewTest';
import { useKindergartens } from '../../operations/queries/Kindergartens/getKindergartens';
import { formatDate } from '../../utils/formatDate';

const TWO_MONTHS = 60 * 24 * 60 * 60 * 1000;

const dateDefaultNow = new Date();
const dateDefaultFuture = new Date(dateDefaultNow.getTime() + TWO_MONTHS);

export interface AddTestState {
    testInformation: TestInformation;
}

interface ErrorState {
    errors: string;
}

const initialTestInformation = {
    testName: '',
    startDate: formatDate(dateDefaultNow),
    endDate: formatDate(dateDefaultFuture),
};

export function useAddTest(onSubmit: (state: AddTestState | ErrorState) => void) {
    const [testInformation, setTestInformation] = useState(initialTestInformation);
    const [selected, setSelected] = useState<string[]>([]);
    const { kindergartenList } = useKindergartens();
    const { t } = useTranslation();
    const { createTest, error } = useCreateNewTest();

    function submit() {
        const state = { testInformation };

        const valid = validate(state);

        valid
            .then(() => {
                createTest(testInformation, selected).then(() => {
                    if (!error) {
                        onSubmit(state);
                    }
                });
            })
            .catch(e => {
                onSubmit({ errors: t(e.message) });
            });
    }

    function selectKindergarten(ids: string[]) {
        setSelected(ids);
    }

    const kindergartens = kindergartenList || [];

    return {
        setTestInformation,
        testInformation,
        submit,
        kindergartens,
        selectKindergarten,
        selected,
    };
}

async function validate(state: AddTestState) {
    const newTestSchema = yup.object().shape({
        testInformation: yup.object().shape({
            testName: yup.string().min(5, 'add-test-view.errors.name-too-short'),
            startDate: yup.string().required(),
            endDate: yup.string().required(),
        }),
    });

    return newTestSchema.validateSync(state);
}
