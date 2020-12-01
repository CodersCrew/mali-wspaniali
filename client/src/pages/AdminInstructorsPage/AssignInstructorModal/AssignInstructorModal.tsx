import React, { useState } from 'react';
import {
    Typography,
    makeStyles,
    Theme,
    createStyles,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { KindergartenTable } from './KindergartenTable';
import { AssginedKindergartenTable } from './AssginedKindergartenTable';
import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Kindergarten, Assessment } from '../../../graphql/types';
import { InstructorWithKindergartens } from '../types';

interface Props {
    onClose: () => void;
    onSubmit: (selected: string[]) => void;
    kindergartens: Kindergarten[];
    instructor: InstructorWithKindergartens | null;
    assessment: Assessment | null;
}

export const AssignInstructorModal = ({ onClose, onSubmit, kindergartens, instructor, assessment }: Props) => {
    const instructorKindergartenIds = instructor && instructor.kindergartens ? instructor.kindergartens.map(kindergarten => kindergarten._id) : [];

    const [selected, setSelected] = useState<string[]>(instructorKindergartenIds);
    const classes = useStyles();
    const { t } = useTranslation();

    const onSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(kindergartenId => kindergartenId !== id));
        } else {
            setSelected(prev => [...prev, id]);
        }
    };

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => onSubmit(selected)}
            lowerButtonText={t('admin-instructors-page.modal.cancel')}
            upperButtonText={t('admin-instructors-page.modal.assign')}
            isOpen
            onClose={onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    Przydziel do przedszkola
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="test-select-label">Wybierz test</InputLabel>
                    <Select
                        labelId="test-select-label"
                        id="test-select"
                        label="Wybierz test"
                        value={assessment?._id}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={assessment?._id}>{assessment?.title}</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="instructor-select-label">Wybierz instruktora</InputLabel>
                    <Select
                        labelId="instructor-select-label"
                        id="instructor-select"
                        label="Wybierz instruktora"
                        value={instructor?._id}
                        disabled
                        MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                        }}
                    >
                        <MenuItem value={instructor?._id}>{instructor?.mail}</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Przydzielone przedszkola
                </Typography>
                <AssginedKindergartenTable kindergartens={instructor?.kindergartens || []} onSelect={onSelect} selected={selected} />
                <Typography variant="subtitle1" className={classes.subtitle}>
                    Dodaj nieprzydzielone przedszkole
                </Typography>
                <KindergartenTable kindergartens={kindergartens} onSelect={onSelect} selected={selected} />
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
