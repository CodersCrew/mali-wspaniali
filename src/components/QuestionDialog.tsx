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
  makeDecision,
}: QuestionDialogProps & ActionDialog) => {
  const { t } = useTranslation();

  const onAccepted = () => {
    makeDecision({ accepted: true });
  };

  const onDeclined = () => {
    makeDecision({ accepted: false });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogContent>{question}</DialogContent>
      <DialogActions>
        <Button onClick={onAccepted} color="primary" autoFocus>
          {t('question-dialog.yes')}
        </Button>
        <Button onClick={onDeclined} color="primary" autoFocus>
          {t('question-dialog.no')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
