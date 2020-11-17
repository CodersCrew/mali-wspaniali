import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';
import { KindergartenTable } from './KindergartenTable';
import { AssessmentsSelect } from '../AssessmentsSelect';
import { InstructorsSelect } from '../InstructorsSelect';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { User, Kindergarten, Assessment } from '../../../graphql/types';

interface Props {
    onClose: () => void;
    onSubmit: () => void;
    instructorSelectOptions: User[];
    assessmentSelectOptions: Assessment[];
    kindergartens: Kindergarten[];
    instructor: User | null;
    assessment: Assessment | null;
}

export const AssignInstructorModal = ({
    onClose,
    onSubmit,
    instructorSelectOptions,
    assessmentSelectOptions,
    kindergartens,
    instructor,
    assessment,
}: Props) => {
    const classes = useStyles();
    // const { t } = useTranslation();

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={onSubmit}
            lowerButtonText="Anuluj"
            upperButtonText="Przydziel"
            isOpen
            onClose={onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    Przydziel do przedszkola
                </Typography>
                <AssessmentsSelect
                    label="Wybierz test"
                    options={assessmentSelectOptions}
                    value={assessment ? assessment._id : undefined}
                    disabled={!!assessment}
                />
                <InstructorsSelect
                    label="Imię i nazwisko instruktora"
                    options={instructorSelectOptions}
                    initialValue={instructor ? instructor._id : undefined}
                    disabled={!!instructor}
                />
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Wybierz przedszkola
                </Typography>
                <KindergartenTable kindergartens={kindergartens} onSelect={value => console.log(value)} />
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '536px',
            display: 'flex',
            flexDirection: 'column',
            gap: `${theme.spacing(2)}px`,
        },
        title: {
            paddingBottom: theme.spacing(2),
        },
        subtitle: {
            padding: theme.spacing(1),
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
    }),
);
