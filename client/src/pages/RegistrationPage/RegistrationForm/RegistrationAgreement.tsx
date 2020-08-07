import React, { useState } from 'react';
import {
    Checkbox,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { RegistrationAgreementProps } from './types';
import { AgreementModal } from './AgreementModal';
import { ButtonSecondary } from '../../../components/Button';

const T_PREFIX = 'registration-page.agreements';

export const RegistrationAgreement = ({
    handleBack,
    handleNext,
    classButton,
    classNextBtn,
    agreements,
    agreementMoreBtn,
    agreementContainer,
    agreementHeader,
    agreementCheckboxHeader,
    agreementCheckboxWrapper,
    agreementText,
    agreementLink,
    agreementModal,
    agreementPanel,
    agreementCheckbox,
    checkboxContent,
}: RegistrationAgreementProps) => {
    const { t } = useTranslation();
    const [isMoreContent, setIsMoreContent] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const expansionText = isMoreContent ? t(`${T_PREFIX}.show-less`) : t(`${T_PREFIX}.show-more`);

    const handleMoreContent = () => setIsMoreContent(!isMoreContent);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            <div className={agreementContainer}>
                <h3 className={agreementHeader}>{t(`${T_PREFIX}.main-title`)}</h3>
                <p>
                    <b>{t(`${T_PREFIX}.clausule-header`)}</b>
                </p>
                <span>{t(`${T_PREFIX}.clausule`)}</span>
                <ButtonSecondary className={agreementMoreBtn} onClick={toggleModal} variant="text" innerText={t(`${T_PREFIX}.show-more-content-modal`)} />
                <p className={agreementCheckboxHeader}>{t(`${T_PREFIX}.sub-title`)}</p>
                <span>{t(`${T_PREFIX}.sub-title-description`)}</span>
                {agreements.map((agreement, idx) => (
                    <div className={clsx(agreementCheckboxWrapper, idx === 2 && 'lastAgreement')} key={agreement.id}>
                        <div className={checkboxContent}>
                            <Checkbox
                                color="default"
                                className={agreementCheckbox}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                            <p className={agreementText}>{agreement.title}</p>
                        </div>
                        {idx !== 0 && (
                            <ExpansionPanel className={agreementPanel} onClick={handleMoreContent}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={agreementMoreBtn}>{expansionText}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>{agreement.content}</Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )}
                    </div>
                ))}
                <div className={checkboxContent}>
                    <Checkbox
                        className={agreementCheckbox}
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    <div>
                        <p>
                            {t(`${T_PREFIX}.statement`)}{' '}
                            <span className={agreementLink}>{t(`${T_PREFIX}.privacy-policy`)} </span>
                        </p>
                        <span>{t(`${T_PREFIX}.required-field`)} </span>
                    </div>
                </div>
            </div>
            <div className={classButton}>
                <ButtonSecondary onClick={handleBack} variant="text" innerText={t('back')} />
                <ButtonSecondary onClick={handleNext} variant="contained" className={classNextBtn} innerText={t('next')} />
            </div>
            <AgreementModal
                open={isOpen}
                toggleModal={toggleModal}
                agreementModal={agreementModal}
                agreementHeader={agreementHeader}
            />
        </>
    );
};
