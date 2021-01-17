import React, { useState } from 'react';
import { makeStyles, Theme, Typography, Grid, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { ChildInput, Child, AddChildResult } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';
import { ChildCard } from '../ChildCard/ChildCard';
import BoyAvatar from '../../assets/boy.png';
import GirlAvatar from '../../assets/girl.png';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ChildForm } from '../ChildForm/ChildForm';
import { initialValues, validationSchema } from './utils';
import { EditChildModalProps } from './ChildModalTypes';

type EditChildType = Omit<Child, 'results' | 'currentParams'>;

export const normalizeChild = (child: AddChildResult): ChildInput => {
    return {
        firstname: child.firstname,
        lastname: child.lastname,
        birthYear: parseInt(child['birth-date'], 10),
        birthQuarter: parseInt(child['birth-quarter'], 10),
        sex: child.sex,
        kindergartenId: child.kindergarten,
    };
};

const AdminSettingsEditModal = ({
    onClose,
    makeDecision,
    kindergartens,
    parent,
    preventClose,
    isCancelButtonVisible,
}: EditChildModalProps & ActionDialog<{ child: ChildInput }>) => {
    const [updateInitialChildValues, setInitialValues] = useState<AddChildResult>(initialValues);
    const [selectedChild, setSelectedChild] = useState<{ childIndex: number; isSelected: boolean }>({
        childIndex: 0,
        isSelected: false,
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: updateInitialChildValues,
        validationSchema,
        onSubmit: (values) => {
            makeDecision({ accepted: true, child: normalizeChild(values) });
        },
    });
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('parent-settings.modal-edit-account.button')}
            isOpen={true}
            onAction={formik.handleSubmit}
            onClose={onClose}
            isCancelButtonVisible={isCancelButtonVisible}
            dialogProps={{ maxWidth: 'sm' }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h4" className={classes.header}>
                    {t('parent-settings.modal-edit-account.header')}
                </Typography>
                <Typography variant="body1" className={classes.header}>
                    {t('parent-settings.modal-edit-account.subtitle')}
                </Typography>
                <Typography variant="h4" className={classes.header}>
                    <TextField
                        label="E-mail rodzica"
                        defaultValue={parent.mail}
                        variant="outlined"
                        disabled
                        fullWidth
                    />
                </Typography>
                <Typography variant="body1" className={classes.header}>
                    <Grid container spacing={3}>
                        {parent.children.map(
                            (
                                { firstname, lastname, sex, birthYear, birthQuarter, kindergarten }: EditChildType,
                                index: number,
                            ) => {
                                return (
                                    <Grid item key={`${firstname}-${lastname}`} xs={6} sm={4}>
                                        <ChildCard
                                            firstName={firstname}
                                            PictureComponent={
                                                <img
                                                    className={classes.childAvatar}
                                                    alt="mali_wspaniali_child"
                                                    src={sex === 'male' ? BoyAvatar : GirlAvatar}
                                                />
                                            }
                                            onClick={() => {
                                                setSelectedChild({
                                                    childIndex: index,
                                                    isSelected: !selectedChild.isSelected,
                                                });
                                                setInitialValues({
                                                    firstname,
                                                    lastname,
                                                    sex,
                                                    'birth-date': birthYear.toString(),
                                                    'birth-quarter': birthQuarter.toString(),
                                                    kindergarten: kindergarten._id,
                                                });
                                            }}
                                            isActive={selectedChild.childIndex === index && selectedChild.isSelected}
                                        />
                                    </Grid>
                                );
                            },
                        )}
                    </Grid>
                </Typography>
                {selectedChild.isSelected && <ChildForm kindergartens={kindergartens} formik={formik} />}
            </form>
        </BasicModal>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    header: { marginBottom: theme.spacing(2) },
    mail: { marginTop: theme.spacing(2) },
    childAvatar: {
        width: '100%',
        objectFit: 'contain',
        margin: '5px',
    },
    childrenWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
}));

export const openAdminSettingsEditModal = (props: EditChildModalProps) => {
    return openDialog<EditChildModalProps>(AdminSettingsEditModal, props);
};
