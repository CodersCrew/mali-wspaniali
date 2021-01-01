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
    Divider,
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
    const instructorKindergartenIds =
        instructor && instructor.kindergartens ? instructor.kindergartens.map((kindergarten) => kindergarten._id) : [];

    const [selected, setSelected] = useState<string[]>(instructorKindergartenIds);
    const classes = useStyles();
    const { t } = useTranslation();

    const onSelect = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((kindergartenId) => kindergartenId !== id));
        } else {
            setSelected((prev) => [...prev, id]);
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
            <Typography variant="h4" className={classes.title}>
                Przydziel do przedszkola
            </Typography>
            <div className={classes.content}>
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
                <div>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        Przydzielone przedszkola
                    </Typography>
                    <Divider />
                    <AssginedKindergartenTable
                        kindergartens={instructor?.kindergartens || []}
                        onSelect={onSelect}
                        selected={selected}
                    />
                </div>
                <div>
                    <Typography variant="subtitle1" className={classes.subtitle}>
                        Dodaj nieprzydzielone przedszkole
                    </Typography>
                    <Divider />
                </div>
                <KindergartenTable kindergartens={kindergartens} onSelect={onSelect} selected={selected} />
            </div>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 420px)',
            gap: `${theme.spacing(3)}px`,

            '& div:nth-child(2)': {
                gridColumn: 1,
                gridRow: 2,
            },

            '& div:nth-child(3)': {
                gridColumn: 1,
                gridRow: 3,
            },
        },
        title: {
            marginBottom: theme.spacing(4),
        },
        subtitle: {
            padding: theme.spacing(1),
        },
    }),
);
