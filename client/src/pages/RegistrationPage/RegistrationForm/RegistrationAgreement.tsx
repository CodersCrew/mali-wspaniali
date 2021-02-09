import React, { useState } from 'react';
import {
    Checkbox,
    AccordionDetails,
    Typography,
    Box,
    Link,
    Divider,
    withStyles,
    createStyles,
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

import { ButtonSecondary } from '../../../components/Button';
import { Agreement } from '../../../graphql/types';
import { Theme } from '../../../theme';

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

const Accordion = withStyles(() =>
    createStyles({
        root: {
            boxShadow: 'none',
            '&:before': {
                top: 0,
            },
            '&$expanded': {
                marginTop: 0,
            },
        },
        expanded: {},
    }),
)(MuiAccordion);

const AccordionSummary = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
            padding: 0,
            minHeight: 0,
            justifyContent: 'flex-start',
            '&$expanded': {
                minHeight: 0,
            },
        },
        content: {
            margin: 0,
            flexGrow: 0,
            '&$expanded': {
                margin: 0,
            },
        },
        expandIcon: {
            padding: 0,
            color: theme.palette.primary.main,
        },
        expanded: {
            margin: 0,
            minHeight: 0,
        },
    }),
)(MuiAccordionSummary);

export const RegistrationAgreement = ({
    handleBack,
    handleNext,
    classButton,
    classNextBtn,
    agreements,
    agreementMoreBtn,
    agreementContainer,
    agreementHeader,
    // agreementCheckboxHeader,
    agreementCheckboxWrapper,
    // agreementText,
    // agreementLink,
    agreementModal,
    agreementPanel,
    agreementCheckbox,
    checkboxContent,
}: Props) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);
    const [boxChecked, setBoxChecked] = useState(new Array(agreements.length));
    const [expanded, setExpanded] = useState('panel1');

    const toggleModal = () => setIsOpen(!isOpen);
    const handleMoreContent = (panel: string) => (
        event: React.ChangeEvent<Record<string, unknown>>,
        newExpanded: boolean,
    ) => {
        setExpanded(newExpanded ? panel : '');
    };

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
                    <>
                        {idx === 1 && (
                            <>
                                <Divider />
                                <Box mb={2} />
                            </>
                        )}
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
                                    {agreement.text}
                                </Typography>
                            </div>
                            <Box mb={2} />
                            {agreement.extraContent && (
                                <>
                                    <Accordion
                                        className={agreementPanel}
                                        expanded={expanded === `panel${idx}`}
                                        onChange={handleMoreContent(`panel${idx}`)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${idx}-content`}
                                            id={`panel${idx}-header`}
                                        >
                                            <Typography className={agreementMoreBtn}>
                                                {expanded === `panel${idx}`
                                                    ? t(`${T_PREFIX}.show-less`)
                                                    : t(`${T_PREFIX}.show-more`)}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>{agreement.extraContent}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Box mb={2} />
                                </>
                            )}
                        </div>
                    </>
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
                <ButtonSecondary
                    onClick={handleNext}
                    variant="contained"
                    className={classNextBtn}
                    innerText={t('next')}
                />
                <ButtonSecondary onClick={handleBack} variant="text" innerText={t('back')} />
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
