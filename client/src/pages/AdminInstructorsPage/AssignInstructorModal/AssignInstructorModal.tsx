import React from 'react';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { useTranslation } from 'react-i18next';
import { KindergartenTable } from './KindergartenTable';
import { TestsSelect } from '../TestsSelect';
import { InstructorsSelect } from '../InstructorsSelect';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { User, Kindergarten } from '../../../graphql/types';

interface Props {
    onClose: () => void;
    onSubmit: () => void;
    instructorSelectOptions: User[];
    kindergartens: Kindergarten[];
}

export const AssignInstructorModal = ({ onClose, onSubmit, instructorSelectOptions, kindergartens }: Props) => {
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
                <TestsSelect label="Wybierz test" />
                <InstructorsSelect label="Imię i nazwisko instruktora" options={instructorSelectOptions} />
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
