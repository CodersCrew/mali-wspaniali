import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { secondaryColor, textColor } from '../../../colors';

interface Props {
    goToAboutTestTab: () => void;
    isLast: boolean;
}

export const EmptyResult = ({ isLast, goToAboutTestTab }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <div className={classes.titleWrapper}>
                <Typography variant="h4" className={classes.title}>
                    {t('child-profile.no-results-title')}
                </Typography>
            </div>
            {!isLast && (
                <Typography variant="body2" className={classes.content}>
                    {t('child-profile.no-results-text')}
                </Typography>
            )}
            {isLast && (
                <>
                    <Typography variant="body2" className={classes.content}>
                        {t('child-profile.no-results-text-last')}
                    </Typography>
                    <ol className={classes.list}>
                        <li>
                            <Typography variant="body2" className={classes.content}>
                                {t('child-profile.no-results-list-1')}
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" className={classes.content}>
                                {t('child-profile.no-results-list-2')}
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2" className={classes.content}>
                                {t('child-profile.no-results-list-3')}
                            </Typography>
                        </li>
                    </ol>
                    <Typography variant="h4">
                        {t('child-profile.no-results-bottom')}{' '}
                        <span className={classes.link} onClick={goToAboutTestTab}>
                            {t('child-profile.no-results-link')}
                        </span>
                    </Typography>
                </>
            )}
            <img className={classes.image} src="https://via.placeholder.com/160x100" alt="placeholder" />
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px',
    },
    titleWrapper: {
        marginBottom: '20px',
    },
    title: {
        fontWeight: 'normal',
        color: textColor,
    },
    content: {
        color: textColor,
    },
    image: {
        marginTop: '40px',
    },
    link: {
        color: secondaryColor,
        cursor: 'pointer',
    },
    list: {
        width: '60%',
    },
});
