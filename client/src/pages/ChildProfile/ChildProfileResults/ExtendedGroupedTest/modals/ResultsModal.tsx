import { createStyles, DialogContent, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';

const RESULTS_PREFIX = 'child-profile.results-modal-content';

type ResultsModalProps = {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    progressKey: string;
};

const ResultsModal = ({
    onClose,
    preventClose,
    progressKey,
}: ResultsModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={() => {
                if (!preventClose) {
                    onClose();
                }
            }}
            isCancelButtonVisible={false}
            dialogProps={{ maxWidth: 'sm' }}
        >
            <DialogTitle>{t(`${RESULTS_PREFIX}.${progressKey}.title`)}</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>{t(`${RESULTS_PREFIX}.${progressKey}.subtitle`)}</Typography>
                <Typography gutterBottom variant={'body2'}>
                    {t(`${RESULTS_PREFIX}.${progressKey}.text-1`)}
                </Typography>
                {progressKey !== 'progress' && (
                    <Typography gutterBottom variant="subtitle2">
                        {' '}
                        <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${progressKey}.text-1-1`)} </strong>{' '}
                        {t(`${RESULTS_PREFIX}.${progressKey}.text-1-2`)}
                    </Typography>
                )}
                <Typography gutterBottom variant={progressKey === 'regress' ? 'subtitle2' : 'body2'}>
                    {t(`${RESULTS_PREFIX}.${progressKey}.text-2`)}{' '}
                    <a href="/recommendations">
                        <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${progressKey}.text-2-1`)} </strong>
                    </a>{' '}
                    {progressKey !== 'regress' && t(`${RESULTS_PREFIX}.${progressKey}.text-2-2`)}
                    {progressKey === 'constant' && (
                        <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${progressKey}.text-2-3`)} </strong>
                    )}
                </Typography>

                {progressKey === 'regress' && (
                    <Typography gutterBottom variant="subtitle2">
                        {t(`${RESULTS_PREFIX}.${progressKey}.text-3`)}{' '}
                        <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${progressKey}.text-3-1`)} </strong>{' '}
                    </Typography>
                )}
            </DialogContent>
        </BasicModal>
    );
};

export const openResultsModal = (props: ResultsModalProps) => {
    return openDialog<ResultsModalProps>(ResultsModal, props);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            color: theme.palette.primary.main,
        },
    }),
);
