import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

import { openDialog, ActionDialog } from '../utils/openDialog';

import { ButtonPrimary } from './Button';

export type DialogTypes = 'error' | 'warning' | 'info' | 'success';

type AlertDialogProps = {
    description: string;
    title?: string;
    type: DialogTypes;
};

export const openAlertDialog = (props: AlertDialogProps) => {
    return openDialog<AlertDialogProps>(AlertDialog, props);
};

const AlertDialog = ({ type, title, description, onClose }: AlertDialogProps & ActionDialog) => {
    const { t } = useTranslation();

    const titleText = title || t(`alert-dialog.${type}`);

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>{parse(description)}</DialogContent>
            <DialogActions>
                <ButtonPrimary variant="text" onClick={onClose} autoFocus innerText={t('close')} />
            </DialogActions>
        </Dialog>
    );
};
