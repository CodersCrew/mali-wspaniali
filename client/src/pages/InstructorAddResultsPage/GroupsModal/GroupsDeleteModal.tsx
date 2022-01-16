import { useTranslation } from 'react-i18next';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

import { TwoActionsModal } from '../../../components/Modal/TwoActionsModal';
import { ActionDialog, openDialog } from '../../../utils/openDialog';
import { Group } from '../../../graphql/types';

interface Props {
    onClose: () => void;
    onDelete: (id: string) => void;
    group: Group;
}

export const openGroupsDeleteModal = (group: Group) => {
    return openDialog(GroupsDeleteModal, { group });
};

const GroupsDeleteModal = ({ onClose, makeDecision, group }: Props & ActionDialog) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <TwoActionsModal
            lowerButtonOnClick={onClose}
            upperButtonOnClick={() => makeDecision({ accepted: true })}
            lowerButtonText={t('groupsModal.close')}
            upperButtonText={t('groupsModal.delete')}
            isOpen
            onClose={onClose}
        >
            <Typography variant="h4" className={classes.title}>
                {t('groupsModal.delete-group')}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {t('groupsModal.confirm', { name: group.group })}
            </Typography>
        </TwoActionsModal>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingBottom: theme.spacing(2),
        },
        description: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }),
);
