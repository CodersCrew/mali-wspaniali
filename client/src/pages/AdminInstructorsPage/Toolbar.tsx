import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import { AssessmentsSelect } from './AssessmentsSelect';
import { InstructorsSelect } from './InstructorsSelect';
import { ButtonSecondary } from '../../components/Button';
import { User, Assessment } from '../../graphql/types';

interface Props {
    onButtonClick: () => void;
    instructorSelectOptions: User[];
    assessmentSelectOptions: Assessment[];
}

export const Toolbar = ({ onButtonClick, instructorSelectOptions, assessmentSelectOptions }: Props) => {
    const classes = useStyles();

    const { t } = useTranslation();

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
            <ButtonSecondary
                variant="contained"
                innerText={t('admin-instructors-page.table-toolbar.kindergarten-assign')}
                startIcon={<AddCircleIcon />}
                onClick={onButtonClick}
            />
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
    }),
);
