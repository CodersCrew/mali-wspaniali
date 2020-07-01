import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Result } from '../../../firebase/types';
import { lightTextColor } from '../../../colors';
import { getMaxDate, getSchoolYearLabel } from './utils';

interface Props {
    handleClickDetailsButton: (key: string) => void;
    resultGroup: Result[];
    isExpanded: boolean;
    schoolYearStart: number;
}

export const ResultSummary = ({ resultGroup, handleClickDetailsButton, isExpanded, schoolYearStart }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const updatedAt = getMaxDate(resultGroup.map(result => result.updatedAt).filter(Boolean));

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>
                {t('child-profile.kindergartener-test')}: {getSchoolYearLabel(schoolYearStart)}
            </Typography>
            <Typography className={classes.updatedAt}>
                {t('child-profile.last-update-date')}:{' '}
                <span className={classes.updatedAtDate}>{updatedAt ? updatedAt.format('L') : '-'}</span>
            </Typography>
            <Button
                onClick={() => handleClickDetailsButton(String(schoolYearStart))}
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
        width: '300px',
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
