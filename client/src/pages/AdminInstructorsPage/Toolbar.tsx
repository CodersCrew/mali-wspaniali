import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Typography, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsSelect } from './InstructorsSelect';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';
import { User, Assessment } from '../../graphql/types';

interface Props {
    instructorSelectOptions: User[];
    assessmentSelectOptions: Assessment[];
    unassignedKindergartens: number;
}

export const Toolbar = ({ instructorSelectOptions, assessmentSelectOptions, unassignedKindergartens }: Props) => {
    const classes = useStyles();

    const { t } = useTranslation();

    const handleClick = () => openSnackbar({ text: t('admin-instructors-page.snackbars.info'), severity: 'info' });

    return (
        <div className={classes.container}>
            <div className={classes.input}>
                <AssessmentsSelect
                    label={t('admin-instructors-page.table-toolbar.select-test')}
                    options={assessmentSelectOptions}
                />
            </div>
            <div className={classes.input}>
                <InstructorsSelect
                    label={t('admin-instructors-page.table-toolbar.instructor-search')}
                    options={instructorSelectOptions}
                />
            </div>
            <div className={classes.kindergartenInfoContainer}>
                <Typography
                    variant="subtitle2"
                    color="secondary"
                    component="p"
                    className={clsx({
                        [classes.kindergartenInfoText]: true,
                        [classes.kindergartenInfoTextSuccess]: unassignedKindergartens === 0,
                    })}
                >
                    {t('admin-instructors-page.table-toolbar.unassigned-kindergartens')}: {unassignedKindergartens}
                </Typography>
                <IconButton onClick={handleClick}>
                    <InfoIcon />
                </IconButton>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            gap: `${theme.spacing(3)}px`,
            flexWrap: 'wrap',
            background: theme.palette.primary.contrastText,
            borderRadius: theme.spacing(0.5),
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
        input: {
            width: 330,
        },
        kindergartenInfoContainer: {
            display: 'flex',
            alignItems: 'center',
        },
        kindergartenInfoText: {
            textTransform: 'uppercase',
        },
        kindergartenInfoTextSuccess: {
            color: theme.palette.success.main,
        },
    }),
);
