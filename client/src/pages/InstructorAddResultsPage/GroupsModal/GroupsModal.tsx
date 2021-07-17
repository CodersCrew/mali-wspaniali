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
import EditIcon from '@material-ui/icons/Edit';

import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { Assessment } from '../../../graphql/types';
import { openDialog, ActionDialog } from '../../../utils/openDialog';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';

// import { NoGroups } from './NoGroups';
import { GroupsTransferList } from './GroupsTransferList';

interface ModalProps {
    selectedKindergarten: string;
    selectedAssessment: string;
    handleSubmit: (value: { name: string; kindergarten: string; instructor: string; children: String[] }) => void;
    onClose: () => void;
    assessments: Assessment[];
}
const validationSchema = Yup.object({
    kindergarten: Yup.string().required(),
    name: Yup.string().required(),
    instructor: Yup.string().required(),
    children: Yup.array(),
});

export function openGroupsModal(props: Partial<ModalProps>) {
    return openDialog<Partial<ModalProps>>(GroupsModal, props);
}

function GroupsModal(props: ModalProps & ActionDialog) {
    const classes = useStyles();
    const { t } = useTranslation();

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

    const kindergartens = props.assessments.find((a) => a._id === props.selectedAssessment)?.kindergartens || [];

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
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonSecondary
                            aria-label="groups"
                            variant="contained"
                            size="medium"
                            startIcon={<AddCircleOutlineIcon />}
                            innerText={t('groupsModal.add-group')}
                            onClick={() => openGroupsModal({ ...props })}
                            className={classes.button}
                        />
                    </Grid>
                </Grid>
                <Typography variant="subtitle1">{t('groupsModal.kindergarten-groups')}</Typography>
                <Grid container direction="row" justify="space-between">
                    <Typography variant="subtitle2">{t('groupsModal.group-name')}</Typography>
                    <EditIcon color="disabled" />
                </Grid>
                <Divider />
                <GroupsTransferList />
                {/* <NoGroups />
                 */}
            </div>
        </TwoActionsModal>
    );
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
