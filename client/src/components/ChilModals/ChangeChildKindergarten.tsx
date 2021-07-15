import { Typography, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import { BasicModal } from '../Modal/BasicModal';
import { openDialog, ActionDialog } from '../../utils/openDialog';
import { ChildModalProps } from './ChildModalTypes';
import { Child, UpdatedChildInput } from '../../graphql/types';
import { ChangeKindergartenModal } from '../ChildForm/ChangeKindergartenForm';
import { normalizeChild } from './utils';

interface TinitialObjestType {
    firstname: string;
    lastname: string;
    id: string;
    kindergarden: string;
    kindergardenName: string;
    sex: string;
    birthYear: number;
    birthQuarter: number;
}

const normalizeTransformKindergarten = (child: Child) => {
    const kindergarden = child.kindergarten._id;
    const id = child._id;
    const kindergardenName = child.kindergarten.name;
    const { firstname, lastname, sex, birthYear, birthQuarter } = child;

    return { kindergarden, id, firstname, lastname, kindergardenName, sex, birthYear, birthQuarter };
};

const AdminSettingsEditModal = ({
    onClose,
    makeDecision,
    kindergartens,
    user,
    preventClose,
    isCancelButtonVisible,
}: ChildModalProps & ActionDialog<{ childDetailsList: UpdatedChildInput[] }>) => {
    const { t } = useTranslation();

    const newObjectChild: TinitialObjestType[] = user.children.map(normalizeTransformKindergarten);

    const initialValues = {
        childData: newObjectChild,
    };

    const classes = useStyles();

    const listOfChildToUpdate = (
        listOfChildFromFormik: TinitialObjestType[],
        listOfChildFromInitialState: TinitialObjestType[],
    ): TinitialObjestType[] => {
        return listOfChildFromFormik.filter(
            (child, index): boolean => child.kindergarden !== listOfChildFromInitialState[index].kindergarden,
        );
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
                makeDecision({
                    accepted: true,
                    childDetailsList: listOfChildToUpdate(values.childData, initialValues.childData)?.map((child) => {
                        return {
                            ...normalizeChild({
                                firstname: child.firstname,
                                lastname: child.lastname,
                                sex: child.sex,
                                'birth-date': child.birthYear?.toString(),
                                'birth-quarter': child.birthQuarter?.toString(),
                                kindergarten: child.kindergarden,
                            }),
                            childId: child.id,
                        };
                    }),
                });
            }}
        >
            {(formik) => (
                <BasicModal
                    actionName={t('user-settings.modal-edit-account.button')}
                    isOpen={true}
                    onAction={formik.handleSubmit}
                    onClose={onClose}
                    isActionButtonVisible
                    isCancelButtonVisible={isCancelButtonVisible}
                    dialogProps={{ maxWidth: 'sm' }}
                >
                    <Typography variant={'h4'}>{t('user-settings.modal-change-kindergarden.header')}</Typography>
                    <Typography variant={'body1'} className={classes.selectKindergardenInput}>
                        {t('user-settings.modal-change-kindergarden.subtitle')}
                    </Typography>
                    <ChangeKindergartenModal formik={formik} kindergartens={kindergartens} />
                </BasicModal>
            )}
        </Formik>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
    selectKindergardenInput: { color: theme.palette.text.secondary, margin: theme.spacing(4, 0) },
}));

export const openChanageChildrenKindergarten = (props: ChildModalProps) => {
    return openDialog<ChildModalProps, { childDetailsList: UpdatedChildInput[] }>(AdminSettingsEditModal, props);
};
