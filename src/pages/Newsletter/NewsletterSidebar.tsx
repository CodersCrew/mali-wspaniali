import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { mainColor, white, newsletterColors } from '../../colors';
import { SidebarElementState } from './types';

export const NewsletterSidebar: React.FC<{ sidebarState: { topElement: string; bottomElement: string } }> = ({
    sidebarState,
}) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const setElement = (name: string) => {
        const number = name === 'top' ? 1 : 2;
        switch (number === 1 ? sidebarState.topElement : sidebarState.bottomElement) {
            case SidebarElementState.Inactive:
                return (
                    <>
                        <div className={`${classes.numberWrapper} inactive`}>
                            <span className={classes.number}>{number}</span>
                        </div>
                        <span className={classes.text}>
                            {number === 1 ? t('newsletter.sidebar.fill') : t('newsletter.sidebar.newsletter-content')}
                        </span>
                    </>
                );
            case SidebarElementState.Done:
                return (
                    <>
                        <CheckCircleIcon className={classes.iconReady} />
                        <span className={`${classes.text} inactive`}>{t('newsletter.sidebar.done')}</span>
                    </>
                );
            case SidebarElementState.Error:
                return (
                    <>
                        <WarningIcon className={classes.iconError} />
                        <span className={classes.text}>{t('newsletter.sidebar.error')}</span>
                    </>
                );
            case SidebarElementState.FileError:
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
            {setElement('top')}
            <div className={classes.verticalLine}></div>
            {setElement('bottom')}
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
