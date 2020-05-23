import React from 'react';
import { Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationAgreementProps } from './types';

export const RegistrationAgreement = ({
    handleBack,
    handleNext,
    activeStep,
    classButton,
    classNextBtn,
    classPrevBtn,
}: RegistrationAgreementProps) => {
    const { t } = useTranslation();

    return (
        <>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum et dicta at saepe facilis rerum maxime
                odio architecto sequi totam.
            </p>
            <div className={classButton}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classPrevBtn}>
                    {t('back')}
                </Button>
                <Button variant="contained" onClick={handleNext} className={classNextBtn} color="secondary">
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
