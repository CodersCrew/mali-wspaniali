import React, { useState } from 'react';
import { Checkbox, Accordion, AccordionSummary, AccordionDetails, Typography, Box, Link } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';

import { ButtonSecondary } from '../../../components/Button';
import { Agreement } from '../../../graphql/types';

import { AgreementModal } from './AgreementModal';
import { useStyles } from './styles';

// TODO: remove after determine schema
interface AgreementExtended extends Agreement {
    extraContent?: string;
    isRequired?: boolean;
    checked?: boolean;
}

const T_PREFIX = 'registration-page.agreements';

export interface Props {
    handleBack(): void;
    handleNext(): void;
    classButton: string;
    classNextBtn: string;
    agreements: AgreementExtended[];
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
    const classes = useStyles();

    const [isMoreContent, setIsMoreContent] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [boxChecked, setBoxChecked] = useState(new Array(agreements.length));

    const expansionText = isMoreContent ? t(`${T_PREFIX}.show-less`) : t(`${T_PREFIX}.show-more`);

    const handleMoreContent = () => setIsMoreContent(!isMoreContent);
    const toggleModal = () => setIsOpen(!isOpen);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = target;
        if (id === '0' && checked) {
            console.log('jestem');
            const checks = new Array(agreements.length);
            boxChecked.map((item, key) => {
                checks[key] = true;

                return item;
            });
            setBoxChecked(checks);
        }
    };

    /*
    useEffect(() => {
        const checks = new Array(agreements.length);
        agreements.map((agreement, key) => (checks[key] = agreement.checked));
        setBoxChecked(checks);
    }, []);
*/

    return (
        <>
            <div className={agreementContainer}>
                <Typography variant="h4">{t(`${T_PREFIX}.main-title`)}</Typography>
                <Box mb={1.5} />
                <Typography variant="subtitle2">{t(`${T_PREFIX}.clausule-header`)}</Typography>
                <Box mb={1} />
                <Typography variant="body2">{t(`${T_PREFIX}.clausule`)}</Typography>
                <Box mb={2} />
                <Link href="#" onClick={toggleModal}>
                    <Typography variant="body2">{t(`${T_PREFIX}.show-more-content-modal`)}</Typography>
                </Link>
                <Box mb={3} />
                <Typography variant="h4">{t(`${T_PREFIX}.sub-title`)}</Typography>
                <Box mb={1.5} />
                <Typography variant="body2">{t(`${T_PREFIX}.sub-title-description`)}</Typography>
                <Box mb={1.5} />
                <div className={classes.agreementRequired}>
                    <Typography variant="body2" className={classes.agreementRequiredAsterix}>
                        *&nbsp;
                    </Typography>
                    <Typography variant="caption">{t('registration-page.agreements.required-agreements')}</Typography>
                </div>
                <Box mb={3} />
                {agreements.map((agreement, idx) => (
                    <div
                        key={agreement._id}
                        className={clsx({ [agreementCheckboxWrapper]: true, lastAgreement: idx === 2 })}
                    >
                        <div className={checkboxContent}>
                            <Checkbox
                                color="default"
                                id={`${idx}`}
                                className={agreementCheckbox}
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                /*
                                checked={agreement.isRequired}
                                disabled={agreement.isRequired}
*/
                                checked={boxChecked[idx]}
                                onChange={handleChange}
                            />
                            {agreement.isRequired && (
                                <div className={classes.agreementRequired}>
                                    <Typography variant="body2" className={classes.agreementRequiredAsterix}>
                                        *&nbsp;
                                    </Typography>
                                </div>
                            )}
                            <Typography variant="body2" className={classes.agreementText}>
                                {(agreement as any).text}
                            </Typography>
                        </div>
                        <Box mb={2} />
                        {/* {idx !== 0 && ( */}
                        {agreement.extraContent && (
                            <>
                                <Accordion className={agreementPanel} onClick={handleMoreContent}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={agreementMoreBtn}>{expansionText}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>{agreement.extraContent}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Box mb={2} />
                            </>
                        )}
                    </div>
                ))}
                {/*
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
*/}
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
