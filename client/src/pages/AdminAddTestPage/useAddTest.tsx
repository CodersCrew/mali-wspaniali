import { useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useCreateNewTest } from '../../operations/mutations/Test/createNewTest';

export interface AddTestState {
    testInformation: {
        testName: string;
    };
}

interface ErrorState {
    errors: string;
}

export function useAddTest(onSubmit: (state: AddTestState | ErrorState) => void) {
    const [testInformation, setTestInformation] = useState({
        testName: '',
    });
    const { t } = useTranslation();
    const { createTest, error } = useCreateNewTest();

    async function submit() {
        const state = { testInformation };

        const valid = validate(state);

        valid
            .then(() => {
                createTest(testInformation.testName).then(() => {
                    if (!error) {
                        onSubmit(state);
                    }
                });
            })
            .catch(e => {
                onSubmit({ errors: t(e.message) });
            });
    }

    return {
        setTestInformation,
        submit,
    };
}

async function validate(state: AddTestState) {
    const newTestSchema = yup.object().shape({
        testInformation: yup.object().shape({
            testName: yup.string().min(5, 'add-test-view.errors.name-too-short'),
        }),
    });

    return newTestSchema.validateSync(state);
}
