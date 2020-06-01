import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Result } from '../../../firebase/types';
import { lightTextColor } from '../../../colors';
import { getMaxDate } from './utils';

interface Props {
    handleClickDetailsButton: (key: string) => void;
    resultGroup: Result[];
    isExpanded: boolean;
}

export const ResultSummary = ({ resultGroup, handleClickDetailsButton, isExpanded }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const updatedAt = getMaxDate(resultGroup.map(result => result.updatedAt));

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>
                {t('child-profile.kindergartener-test')}: {resultGroup[0].schoolYear}
            </Typography>
            <Typography className={classes.updatedAt}>
                {t('child-profile.last-update-date')}:{' '}
                <span className={classes.updatedAtDate}>{updatedAt.format('L')}</span>
            </Typography>
            <Button
                onClick={() => handleClickDetailsButton(resultGroup[0].schoolYear)}
                variant={isExpanded ? 'outlined' : 'contained'}
                color="secondary"
                className={classes.detailsButton}
            >
                {t(isExpanded ? 'child-profile.collapse-details' : 'child-profile.details')}
            </Button>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: '15px',
        padding: '0 40px',
    },
    title: {
        fontWeight: 'bold',
        marginRight: '88px',
    },
    updatedAt: {
        color: lightTextColor,
    },
    updatedAtDate: {
        marginLeft: '20px',
    },
    detailsButton: {
        marginLeft: 'auto',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
    },
});
