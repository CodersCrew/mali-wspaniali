// import React from 'react';
// import { DialogTitle, Typography } from '@material-ui/core';
// import { useTranslation } from 'react-i18next';

// // import { User } from '../../../../../graphql/types';
// import { openDialog } from '../../../../../utils/openDialog';
// import { BasicModal } from '../../../../../components/Modal/BasicModal';
// // import { User } from '../../graphql/types';

// const T_GROUP_PREFIX = 'child-profile.age-group-description';

// export interface AgeDescriptionModalProps {
//     preventClose: boolean;
//     isCancelButtonVisible: boolean;
// }

// const AgeDescriptionModal = ({
//     onClose,

//     isCancelButtonVisible,
// }: AgeDescriptionModalProps<{}>) => {
//     const { t } = useTranslation();
//     // const classes = useStyles();

//     return (
//         <BasicModal
//             closeButtonText={t('parent-settings.modal-delete-account.first-button')}
//             actionName={t('parent-settings.modal-delete-account.second-button')}
//             isOpen={true}
//             onAction={() => console.log('')}
//             onClose={onClose}
//             isCancelButtonVisible={isCancelButtonVisible}
//             // isActionButtonSecondary
//             // dialogProps={{ maxWidth: 'xs' }}
//         >
//             <DialogTitle>{t('child-profile.age-group-description.title')}</DialogTitle>
//             <Typography gutterBottom>{t('child-profile.age-group-description.subtitle')}</Typography>
//             <Typography gutterBottom>
//                 {t(`${T_GROUP_PREFIX}.text-1`)} <strong>{t(`${T_GROUP_PREFIX}.age-1`)} </strong>{' '}
//                 {t(`${T_GROUP_PREFIX}.text-2`)} <strong>{t(`${T_GROUP_PREFIX}.age-2`)} </strong>{' '}
//                 {t(`${T_GROUP_PREFIX}.text-3`)} <strong>{t(`${T_GROUP_PREFIX}.age-3`)} </strong>{' '}
//                 {t(`${T_GROUP_PREFIX}.text-4`)}
//             </Typography>
//         </BasicModal>
//     );
// };

// // const useStyles = makeStyles((theme: Theme) => ({
// //     header: { marginBottom: theme.spacing(2) },
// //     mail: { marginTop: theme.spacing(2) },
// // }));

// export const openAgeDescriptionModal = (props: AgeDescriptionModalProps) => {
//     return openDialog<AgeDescriptionModalProps>(AgeDescriptionModal, props);
// };

// import React, { useState } from 'react';
// import { makeStyles, Theme, Typography, Grid } from '@material-ui/core';
// import { useTranslation } from 'react-i18next';
// import { useFormik } from 'formik';

// import { ChildInput, Child, AddChildResult } from '../../graphql/types';
// import { BasicModal } from '../Modal/BasicModal';
// // import { ChildCard } from '../ChildCard/ChildCard';
// // import BoyAvatar from '../../assets/boy.png';
// // import GirlAvatar from '../../assets/girl.png';
// // import { openDialog, ActionDialog } from '../../utils/openDialog';
// // import { ChildForm } from '../ChildForm/ChildForm';
// // import { initialValues, validationSchema, normalizeChild } from './utils';
// // import { EditChildModalProps } from './ChildModalTypes';

// // type EditChildType = Omit<Child, 'results' | 'currentParams'>;

// // const AgeDescriptionModalModal = ({
// //     onClose,
// //     makeDecision,
// //     kindergartens,
// //     parent,
// //     isCancelButtonVisible,
// // }: AgeDescriptionModalProps & ActionDialog<{ child: ChildInput }>) => {
// //     const [updateInitialChildValues, setInitialValues] = useState<AddChildResult>(initialValues);
// //     const [selectedChild, setSelectedChild] = useState<{ childIndex: number; isSelected: boolean }>({
// //         childIndex: 0,
// //         isSelected: false,
// //     });

// //     const formik = useFormik({
// //         enableReinitialize: true,
// //         initialValues: updateInitialChildValues,
// //         validationSchema,
// //         onSubmit: (values) => {
// //             makeDecision({ accepted: true, child: normalizeChild(values) });
// //         },
// //     });
// //     const { t } = useTranslation();
// //     const classes = useStyles();

//     return (
//         // <BasicModal
//         //     actionName={t('parent-settings.modal-edit-account.button')}
//         //     isOpen={true}
//         //     onAction={formik.handleSubmit}
//         //     onClose={onClose}
//         //     isCancelButtonVisible={isCancelButtonVisible}
//         //     dialogProps={{ maxWidth: 'sm' }}
//         // >
//         //     <DialogTitle>{t('child-profile.age-group-description.title')}</DialogTitle>
//         //     <Typography gutterBottom>{t('child-profile.age-group-description.subtitle')}</Typography>
//         //     <Typography gutterBottom>
//         //         {t(`${T_GROUP_PREFIX}.text-1`)} <strong>{t(`${T_GROUP_PREFIX}.age-1`)} </strong>{' '}
//         //         {t(`${T_GROUP_PREFIX}.text-2`)} <strong>{t(`${T_GROUP_PREFIX}.age-2`)} </strong>{' '}
//         //         {t(`${T_GROUP_PREFIX}.text-3`)} <strong>{t(`${T_GROUP_PREFIX}.age-3`)} </strong>{' '}
//         //         {t(`${T_GROUP_PREFIX}.text-4`)}
//         //     </Typography>
//         // </BasicModal>
//     );
// };

// const useStyles = makeStyles((theme: Theme) => ({
//     header: { marginBottom: theme.spacing(2) },
//     mail: { margin: theme.spacing(0.5, 0, 1.5) },
//     childAvatar: {
//         width: '100%',
//         objectFit: 'contain',
//         margin: '5px',
//     },
//     childrenWrapper: {
//         display: 'flex',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     chilCard: {
//         marginBottom: theme.spacing(2),
//     },
// }));

// export const openAgeDescriptionModal = (props: AgeDescriptionModalProps) => {
//     return openDialog<AgeDescriptionModalProps>(AgeDescriptionModal, props);
// };
