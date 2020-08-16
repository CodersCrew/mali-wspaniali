import React, { useState } from 'react';
import { Checkbox, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { AgreementModal } from './AgreementModal';
import { ButtonSecondary } from '../../../components/Button';
import { Aggrement } from '../../../graphql/types';

const T_PREFIX = 'registration-page.agreements';

export interface Props {
    handleBack(): void;
    handleNext(): void;
    classButton: string;
    classNextBtn: string;
    agreements: Aggrement[];
    agreementMoreBtn: string;
    agreementContainer: string;
    agreementCheckboxHeader: string;
    agreementCheckboxWrapper: string;
    agreementText: string;
    agreementLink: string;
    agreementHeader: string;
    agreementModal: string;
    agreementPanel: string;
    agreementCheckbox: string;
    checkboxContent: string;
}

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
}: Props) => {
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
                <ButtonSecondary
                    className={agreementMoreBtn}
                    onClick={toggleModal}
                    variant="text"
                    innerText={t(`${T_PREFIX}.show-more-content-modal`)}
                />
                <p className={agreementCheckboxHeader}>{t(`${T_PREFIX}.sub-title`)}</p>
                <span>{t(`${T_PREFIX}.sub-title-description`)}</span>
                {agreements.map((agreement, idx) => (
                    <div
                        key={agreement._id}
                        className={clsx({ [agreementCheckboxWrapper]: true, lastAgreement: idx === 2 })}
                    >
                        <div className={checkboxContent}>
                            <Checkbox
                                color="default"
                                className={agreementCheckbox}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                            <p className={agreementText}>{(agreement as any).title}</p>
                        </div>
                        {idx !== 0 && (
                            <Accordion className={agreementPanel} onClick={handleMoreContent}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={agreementMoreBtn}>{expansionText}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{agreement.text}</Typography>
                                </AccordionDetails>
                            </Accordion>
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
                <ButtonSecondary
                    onClick={handleNext}
                    variant="contained"
                    className={classNextBtn}
                    innerText={t('next')}
                />
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
