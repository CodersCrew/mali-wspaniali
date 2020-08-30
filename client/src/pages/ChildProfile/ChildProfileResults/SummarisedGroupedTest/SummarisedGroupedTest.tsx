import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { lightTextColor } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';

interface Props {
    onClose: () => void;
    isExpanded: boolean;
    schoolYearStart: number;
    date: Date;
}

export const SummarisedGroupedTest = ({
    onClose,
    isExpanded,
    schoolYearStart,
    date,
}: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.wrapper}>
            <Typography className={classes.title}>
                {t('child-profile.kindergartener-test')}:{' '}
                {getSchoolYearLabel(schoolYearStart)}
            </Typography>
            <Typography className={classes.updatedAt}>
                {t('child-profile.last-update-date')}:{' '}
                <span className={classes.updatedAtDate}>
                    {moment(date).format('L')}
                </span>
            </Typography>
            <ButtonSecondary
                onClick={(event) => {
                    isExpanded && event.stopPropagation();

                    onClose();
                }}
                variant={isExpanded ? 'outlined' : 'contained'}
                className={classes.detailsButton}
                innerText={
                    isExpanded
                        ? t('child-profile.collapse-details')
                        : t('child-profile.details')
                }
            />
        </div>
    );
};

function getSchoolYearLabel(schoolYearStart: number) {
    return `${schoolYearStart}/${schoolYearStart + 1}`;
}

const useStyles = makeStyles({
    wrapper: {
        alignItems: 'center',
        fontSize: '15px',
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
    },
});
