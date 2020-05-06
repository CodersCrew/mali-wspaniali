import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { mainColor } from '../../colors';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { SidebarElementStates } from './types';

export const NewsletterSidebar: React.FC<{ active: string[] }> = ({ active }) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const setElement = (number: number) => {
        switch (number === 1 ? active[0] : active[1]) {
            case SidebarElementStates.Inactive:
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
            case SidebarElementStates.Done:
                return (
                    <>
                        <CheckCircleIcon className={classes.iconReady} />
                        <span className={`${classes.text} inactive`}>{t('newsletter.sidebar.done')}</span>
                    </>
                );
            case SidebarElementStates.Error:
                return (
                    <>
                        <WarningIcon className={classes.iconError} />
                        <span className={classes.text}>{t('newsletter.sidebar.error')}</span>
                    </>
                );
            case SidebarElementStates.FileError:
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
            {setElement(1)}
            <div className={classes.verticalLine}></div>
            {setElement(2)}
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
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
            color: '#fff',
            '&.inactive': {
                backgroundColor: '#9e9e9e',
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
            color: '#f44336',
            marginBottom: 16,
        },
        verticalLine: {
            width: 1,
            height: 120,
            backgroundColor: '#9e9e9e',
            marginBottom: 15,
        },
        text: {
            fontSize: 12,
            marginBottom: 15,
            '&.inactive': {
                color: '#9e9e9e',
            },
        },
    }),
);
