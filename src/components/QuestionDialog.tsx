import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import { openDialog, ActionDialog } from '../utils/openDialog';

type QuestionDialogProps = {
  question: string;
};

export const openQuestionDialog = (props: QuestionDialogProps) => {
  return openDialog<QuestionDialogProps>(QuestionDialog, props);
};

const QuestionDialog = ({
  question,
  onClose,
  onAnswer,
}: QuestionDialogProps & ActionDialog) => {
  const { t } = useTranslation();

  const onYes = () => {
    onAnswer('yes');
  };

  const onNo = () => {
    onAnswer('no');
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogContent>{question}</DialogContent>
      <DialogActions>
        <Button onClick={onYes} color="primary" autoFocus>
          {t('question-dialog.yes')}
        </Button>
        <Button onClick={onNo} color="primary" autoFocus>
          {t('question-dialog.no')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
