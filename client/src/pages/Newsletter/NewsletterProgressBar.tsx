import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { mainColor, white, newsletterColors } from '../../colors';
import { ProgressBarStates } from './types';

export const NewsletterProgressBar: React.FC<{
    progressBarState: { firstStep: ProgressBarStates; secondStep: ProgressBarStates };
}> = ({ progressBarState }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    enum ProgressBarNames {
        firstStep = 'FIRSTSTEP',
        secondStep = 'SECONDSTEP',
    }
    enum ProgressBarContent {
        one = '1',
        two = '2',
    }

    const setElement = (name: string) => {
        const number = name === ProgressBarNames.firstStep ? ProgressBarContent.one : ProgressBarContent.two;
        switch (name === ProgressBarNames.firstStep ? progressBarState.firstStep : progressBarState.secondStep) {
        case ProgressBarStates.Inactive:
            return (
                <>
                    <div className={`${classes.numberWrapper} inactive`}>
                        <span className={classes.number}>{number}</span>
                    </div>
                    <span className={classes.text}>
                        {number === ProgressBarContent.one
                            ? t('newsletter.sidebar.fill')
                            : t('newsletter.sidebar.newsletter-content')}
                    </span>
                </>
            );
        case ProgressBarStates.Done:
            return (
                <>
                    <CheckCircleIcon className={classes.iconReady} />
                    <span className={`${classes.text} inactive`}>{t('newsletter.sidebar.done')}</span>
                </>
            );
        case ProgressBarStates.Error:
            return (
                <>
                    <WarningIcon className={classes.iconError} />
                    <span className={classes.text}>{t('newsletter.sidebar.error')}</span>
                </>
            );
        case ProgressBarStates.FileError:
            return (
                <>
                    <WarningIcon className={classes.iconError} />
                    <span className={classes.text}>{t('newsletter.sidebar.file-error')}</span>
                </>
            );
        default:
            return (
                <>
                    <div className={classes.numberWrapper}>
                        <span className={classes.number}>{number}</span>
                    </div>
                    <span className={classes.text}>{t('newsletter.sidebar.fill')}</span>
                </>
            );
        }
    };

    return (
        <div className={classes.container}>
            {setElement(ProgressBarNames.firstStep)}
            <div className={classes.verticalLine}></div>
            {setElement(ProgressBarNames.secondStep)}
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
            width: 136,
            padding: '0 25px 0 8px',
        },
        numberWrapper: {
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: mainColor,
            marginBottom: 16,
            color: white,
            '&.inactive': {
                backgroundColor: newsletterColors.disabledColor,
            },
        },
        number: {
            fontSize: 12,
            lineHeight: 2,
        },
        iconReady: {
            color: mainColor,
            marginBottom: 16,
        },
        iconError: {
            color: newsletterColors.errorIconColor,
            marginBottom: 16,
        },
        verticalLine: {
            width: 1,
            height: 120,
            backgroundColor: newsletterColors.disabledColor,
            marginBottom: 15,
        },
        text: {
            fontSize: 12,
            marginBottom: 15,
            '&.inactive': {
                color: newsletterColors.disabledColor,
            },
        },
    }),
);
