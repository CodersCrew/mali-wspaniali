import React from 'react';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';

export function TestInformation() {
    const { t } = useTranslation();

    return <LabeledContainer title={t('add-test-view.test-trials.title')}></LabeledContainer>;
}
