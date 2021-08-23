import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
    Box,
    createStyles,
    Divider,
    Grid,
    makeStyles,
    MenuItem,
    Typography,
    Theme,
    TextField,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Assessment } from '../../../graphql/types';
import { openDialog, ActionDialog } from '../../../utils/openDialog';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

// import { GroupsTransferList } from './GroupsTransferList';
// import { NoGroups } from './NoGroups';
import { GroupsList } from './GroupsList';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';

interface ModalProps {
    selectedKindergarten: string;
    selectedAssessment: string;
    handleSubmit: (value: { name: string; kindergarten: string; instructor: string; children: String[] }) => void;
    onClose: () => void;
    assessment: Assessment;
}
const validationSchema = Yup.object({
    kindergarten: Yup.string().required(),
    name: Yup.string().required(),
    instructor: Yup.string().required(),
    children: Yup.array(),
});

export function openGroupsModal(props: Partial<ModalProps>) {
    return openDialog<Partial<ModalProps>, { groupAdded: string }>(GroupsModal, props);
}

function GroupsModal(props: ModalProps & ActionDialog<{ groupAdded: string }>) {
    const classes = useStyles();
    const { t } = useTranslation();
    const { updateAssessment } = useUpdateAssessment();
    const [providedName, setProvidedName] = React.useState('');

    const initialValues = {
        kindergarten: props.selectedKindergarten,
        name: '',
        instructor: '',
        children: [],
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: props.handleSubmit,
    });

    const kindergartens = props.assessment.kindergartens || [];
    const groups = props.assessment.groups || [];

    return (
        <TwoActionsModal
            lowerButtonOnClick={props.onClose}
            upperButtonOnClick={() => formik.handleSubmit}
            lowerButtonText={t('groupsModal.close')}
            upperButtonText={t('groupsModal.save')}
            isOpen
            onClose={props.onClose}
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    Grupy
                </Typography>
                <Box display="flex" flexDirection="row" width="50%">
                    <TextField
                        select
                        label={t('groupsModal.kindergarten-name')}
                        variant="outlined"
                        value={props.selectedKindergarten}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                    >
                        {kindergartens.map((k) => (
                            <MenuItem value={k.kindergarten?._id} key={k.kindergarten?._id}>
                                {k.kindergarten?.number}/{k.kindergarten?.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Divider />
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={6}>
                        <TextField
                            label={t('groupsModal.new-name')}
                            variant="outlined"
                            fullWidth
                            {...formik.getFieldProps('name')}
                            value={providedName}
                            onChange={({ target: { value } }) => setProvidedName(value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonSecondary
                            aria-label="groups"
                            variant="contained"
                            size="medium"
                            startIcon={<AddCircleOutlineIcon />}
                            innerText={t('groupsModal.add-group')}
                            onClick={onAddGroupClick}
                            className={classes.button}
                        />
                    </Grid>
                </Grid>
                <Typography variant="subtitle1">{t('groupsModal.kindergarten-groups', { count: 0 })}</Typography>
                {/*
                <GroupsTransferList />
                */}
                {/* <NoGroups /> */}
                <GroupsList assessment={props.assessment} />
            </div>
        </TwoActionsModal>
    );

    function onAddGroupClick() {
        updateAssessment(props.assessment._id, {
            groups: [...groups, { kindergartenId: props.selectedKindergarten, group: providedName }],
        });
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: 802,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            gap: theme.spacing(2),
            overflow: 'hidden',
        },
        title: {
            paddingBottom: theme.spacing(1),
        },
        button: {
            marginLeft: theme.spacing(3),
        },
    }),
);
