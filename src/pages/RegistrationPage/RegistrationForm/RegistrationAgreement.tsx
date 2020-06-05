import React from 'react';
import { Button } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { RegistrationAgreementProps } from './types';

export const RegistrationAgreement = ({
    handleBack,
    handleNext,
    classButton,
    classNextBtn,
    classPrevBtn,
    agreements,
}: RegistrationAgreementProps) => {
    const { t } = useTranslation();

    return (
        <>
            <div>
                {agreements.map((agreement) => (
                    <p key={agreement.agreementId}>{agreement.content}</p>
                ))}
            </div>
            <div className={classButton}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classPrevBtn}
                >
                    {t('back')}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classNextBtn}
                    color="secondary"
                >
                    {t('next')}
                </Button>
            </div>
        </>
    );
};
