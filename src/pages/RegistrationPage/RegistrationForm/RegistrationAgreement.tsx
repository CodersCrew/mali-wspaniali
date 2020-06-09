import React, { useState } from 'react';
import {
    Button,
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

const T_PREFIX = 'registration-page.agreements';

export const RegistrationAgreement = ({
    handleBack,
    handleNext,
    classButton,
    classNextBtn,
    classPrevBtn,
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
    const [open, setOpen] = useState(false);

    const expansionText = isMoreContent
        ? t(`${T_PREFIX}.show-less`)
        : t(`${T_PREFIX}.show-more`);

    const handleMoreContent = () => setIsMoreContent(!isMoreContent);
    const toggleModal = () => setOpen(!open);

    return (
        <>
            <div className={agreementContainer}>
                <h3 className={agreementHeader}>
                    {t(`${T_PREFIX}.main-title`)}
                </h3>
                <p>
                    <b>{t(`${T_PREFIX}.clausule-header`)}</b>
                </p>
                <span>{t(`${T_PREFIX}.clausule`)}</span>
                <Button className={agreementMoreBtn} onClick={toggleModal}>
                    {t(`${T_PREFIX}.show-more-content-modal`)}
                </Button>
                <p className={agreementCheckboxHeader}>
                    {t(`${T_PREFIX}.sub-title`)}
                </p>
                <span>{t(`${T_PREFIX}.sub-title-description`)}</span>
                {agreements.map((agreement, i) => (
                    <div
                        className={clsx(
                            agreementCheckboxWrapper,
                            i === 2 && 'lastAgreement'
                        )}
                    >
                        <div className={checkboxContent}>
                            <Checkbox
                                color="default"
                                className={agreementCheckbox}
                                inputProps={{
                                    'aria-label': 'checkbox with default color',
                                }}
                            />
                            <p className={agreementText} key={agreement.id}>
                                {agreement.title}
                            </p>
                        </div>
                        {i !== 0 && (
                            <ExpansionPanel
                                className={agreementPanel}
                                onClick={handleMoreContent}
                            >
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography className={agreementMoreBtn}>
                                        {expansionText}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>{agreement.content}</Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )}
                    </div>
                ))}
                <div className={checkboxContent} style={{ marginTop: 20 }}>
                    <Checkbox
                        className={agreementCheckbox}
                        color="default"
                        inputProps={{
                            'aria-label': 'checkbox with default color',
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ margin: 0 }}>
                            {t(`${T_PREFIX}.statement`)}{' '}
                            <span className={agreementLink}>
                                {t(`${T_PREFIX}.privacy-policy`)}{' '}
                            </span>
                        </p>
                        <span>{t(`${T_PREFIX}.required-field`)} </span>
                    </div>
                </div>
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
            <AgreementModal
                open={open}
                toggleModal={toggleModal}
                agreementModal={agreementModal}
                agreementHeader={agreementHeader}
            />
        </>
    );
};
