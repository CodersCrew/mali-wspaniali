import React from 'react';
import { makeStyles, Typography, Grid, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { lightTextColor } from '../../../../colors';
import { ButtonSecondary } from '../../../../components/Button';
import { useBreakpoints } from '../../../../queries/useBreakpoints';

interface Props {
    onClose: () => void;
    isExpanded: boolean;
    schoolYearStart: number;
    date: Date;
}

export const SummarisedGroupedTest = ({ onClose, isExpanded, schoolYearStart, date }: Props) => {
    const device = useBreakpoints();
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid
            direction={device === 'DESKTOP' ? 'row' : 'column'}
            justify="space-between"
            alignItems="center"
            className={classes.wrapper}
            container
        >
            <Grid
                direction={device === 'DESKTOP' ? 'row' : 'column'}
                justify="flex-start"
                alignItems="center"
                item
                container
                lg={6}
            >
                <Grid item>
                    <Typography className={classes.title}>
                        {t('child-profile.kindergartener-test')}: {getSchoolYearLabel(schoolYearStart)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.updatedAt}>
                        {t('child-profile.last-update-date')}: <span>{moment(date).format('L')}</span>
                    </Typography>
                </Grid>{' '}
            </Grid>
            <Grid item>
                <ButtonSecondary
                    onClick={(event) => {
                        if (isExpanded) {
                            event.stopPropagation();
                        }

                        onClose();
                    }}
                    variant={isExpanded ? 'outlined' : 'contained'}
                    className={classes.detailsButton}
                    innerText={isExpanded ? t('child-profile.collapse-details') : t('child-profile.details')}
                />
            </Grid>
        </Grid>
    );
};

function getSchoolYearLabel(schoolYearStart: number) {
    return `${schoolYearStart}/${schoolYearStart + 1}`;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            fontSize: '15px',
            padding: theme.spacing(0, 2),
        },
        title: {
            fontWeight: 'bold',
            marginRight: '40px',
        },
        updatedAt: {
            color: lightTextColor,
        },
        detailsButton: {
            marginLeft: 'auto',
        },
    }),
);
