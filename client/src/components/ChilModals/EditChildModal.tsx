import React from 'react';
import { makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { Child, AddChildResult, UpdatedChildInput } from '../../graphql/types';
import { BasicModal } from '../Modal/BasicModal';
import { ChildCard } from '../ChildCard/ChildCard';
import BoyAvatar from '../../assets/boy.svg';
import GirlAvatar from '../../assets/girl.svg';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ChildForm } from '../ChildForm/ChildForm';

import { initialValues, validationSchema, normalizeChild } from './utils';
import { ChildModalProps } from './ChildModalTypes';

type EditChildType = Omit<Child, 'results' | 'currentParams'>;

export const openAdminSettingsEditModal = (props: ChildModalProps) => {
    return openDialog<ChildModalProps, { child: UpdatedChildInput }>(function AdminSettingsEditModal(
        dialogProps: ChildModalProps & ActionDialog<{ child: UpdatedChildInput }>,
    ) {
        const [updateInitialChildValues, setInitialValues] = useState<AddChildResult>(initialValues);
        const [selectedChild, setSelectedChild] = useState<string>('');

        const formik = useFormik({
            enableReinitialize: true,
            initialValues: updateInitialChildValues,
            validationSchema,
            onSubmit: (values) => {
                dialogProps.makeDecision({
                    accepted: true,
                    child: { ...normalizeChild(values), childId: selectedChild },
                });
            },
        });
        const { t } = useTranslation();
        const classes = useStyles();

        return (
            <BasicModal
                actionName={t('user-settings.modal-edit-account.button')}
                isOpen={true}
                onAction={formik.handleSubmit}
                onClose={dialogProps.onClose}
                isCancelButtonVisible={dialogProps.isCancelButtonVisible}
                dialogProps={{ maxWidth: 'sm' }}
                isActionButtonSecondary={false}
                isActionButtonVisible
            >
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant="h4" className={classes.header}>
                        {t('user-settings.modal-edit-account.header')}
                    </Typography>
                    <Typography variant="body1" className={classes.header}>
                        {t('user-settings.modal-edit-account.subtitle')}
                    </Typography>
                    <Typography variant="subtitle2">{t('user-settings.modal-edit-account.label')}</Typography>
                    <Typography variant="body1" className={classes.mail}>
                        {dialogProps.user.mail}
                    </Typography>
                    <Grid container spacing={3} className={classes.chilCard}>
                        {dialogProps.user.children.map(
                            ({
                                firstname,
                                lastname,
                                sex,
                                birthYear,
                                birthQuarter,
                                kindergarten,
                                _id,
                            }: EditChildType) => {
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
                                                setSelectedChild((prev) => (prev === _id ? '' : _id));
                                                setInitialValues({
                                                    firstname,
                                                    lastname,
                                                    sex,
                                                    'birth-date': birthYear.toString(),
                                                    'birth-quarter': birthQuarter.toString(),
                                                    kindergarten: kindergarten._id,
                                                });
                                            }}
                                            isActive={selectedChild === _id}
                                        />
                                    </Grid>
                                );
                            },
                        )}
                    </Grid>
                    {selectedChild !== '' && <ChildForm kindergartens={dialogProps.kindergartens} formik={formik} />}
                </form>
            </BasicModal>
        );
    },
    props);
};

const useStyles = makeStyles((theme: Theme) => ({
    header: { marginBottom: theme.spacing(2) },
    mail: { margin: theme.spacing(0.5, 0, 1.5) },
    childAvatar: {
        height: 120,
        objectFit: 'contain',
        margin: '5px',
    },
    childrenWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    chilCard: {
        marginBottom: theme.spacing(2),
    },
}));
