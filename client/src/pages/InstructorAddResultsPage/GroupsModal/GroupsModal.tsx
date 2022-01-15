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
import { GroupsList } from './GroupsList';
import { useUpdateAssessment } from '../../../operations/mutations/Assessment/updateAssessment';
import { useAssessment } from '../../../operations/queries/Assessment/getAssessment';

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
    const { updateAssessment, isUpdatePending } = useUpdateAssessment();
    const { assessment, refetchAssessment } = useAssessment(props.selectedAssessment);
    const [providedName, setProvidedName] = React.useState('');
    const [selectedKindergarten, setSelectedKinderten] = React.useState(props.selectedKindergarten);

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

    if (!assessment) return null;

    const kindergartens = assessment.kindergartens || [];
    const groups = assessment.groups || [];
    const groupsPerKindegarten = groups.filter((g) => g.kindergartenId === selectedKindergarten);

    return (
        <TwoActionsModal
            lowerButtonOnClick={props.onClose}
            upperButtonOnClick={() => formik.handleSubmit}
            lowerButtonText={t('groupsModal.close')}
            upperButtonText={t('groupsModal.save')}
            isOpen
        >
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>
                    {t('groupsModal.title')}
                </Typography>
                <Box display="flex" flexDirection="row" width="50%">
                    <TextField
                        select
                        label={t('groupsModal.kindergarten-name')}
                        variant="outlined"
                        value={selectedKindergarten}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                        onChange={({ target: { value } }) => setSelectedKinderten(value)}
                    >
                        {kindergartens.map((k) => (
                            <MenuItem value={k.kindergarten?._id} key={k.kindergarten?._id}>
                                {k.kindergarten?.number}/{k.kindergarten?.name}&nbsp;
                                <span className={classes.additionalSelectText}>
                                    {k.kindergarten?.address}&nbsp;
                                    {k.kindergarten?.city}
                                </span>
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
                            disabled={isTextfieldDisabled()}
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
                            disabled={isAddingGroupDisabled()}
                        />
                    </Grid>
                </Grid>
                <Typography variant="subtitle1">
                    {t('groupsModal.kindergarten-groups', { count: groupsPerKindegarten.length })}
                </Typography>
                <GroupsList assessment={assessment} selectedKindergarten={selectedKindergarten} />
            </div>
        </TwoActionsModal>
    );

    function isAddingGroupDisabled() {
        if (isTextfieldDisabled() || providedName.length === 0) return true;

        if (groups.find((g) => g.group === providedName && g.kindergartenId === selectedKindergarten)) return true;

        return false;
    }

    function isTextfieldDisabled() {
        return isUpdatePending || groupsPerKindegarten.length >= 25;
    }

    function onAddGroupClick() {
        if (!assessment) return null;

        const normalizedGroups = groups.map(({ group, kindergartenId }) => ({ group, kindergartenId }));

        updateAssessment(assessment._id, {
            groups: [...normalizedGroups, { kindergartenId: selectedKindergarten, group: providedName }],
        })
            .then(refetchAssessment)
            .then(() => setProvidedName(''));
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
        additionalSelectText: {
            color: theme.palette.grey[500],
        },
    }),
);
