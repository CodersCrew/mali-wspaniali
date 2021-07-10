import { createStyles, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../Modal/BasicModal';
import { ChildInput } from '../../../graphql/types';
import { ActionDialog, openDialog } from '../../../utils/openDialog';
import { Result } from '../Result';

const RESULTS_PREFIX = 'child-profile.results-modal-content';

type ResultsModalProps = {
    progressKey: string;
    result: Result;
};

function ResultsModal(props: ResultsModalProps & ActionDialog<{ child: ChildInput }>) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={props.onClose}
            isCancelButtonVisible
            dialogProps={{ maxWidth: 'sm' }}
        >
            <Box mb={2}>
                <Typography variant="h4">{t(`${RESULTS_PREFIX}.${props.progressKey}.title`)}</Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="subtitle2">{t(`${RESULTS_PREFIX}.${props.progressKey}.subtitle`)}</Typography>
            </Box>
            <Box mb={2}>
                <Typography gutterBottom variant={'body2'}>
                    {t(`${RESULTS_PREFIX}.${props.progressKey}.text-1`)}
                </Typography>
            </Box>
            {props.progressKey !== 'progress' && (
                <Typography gutterBottom variant="subtitle2">
                    {' '}
                    <strong className={classes.link}>
                        {t(`${RESULTS_PREFIX}.${props.progressKey}.text-1-1`)}{' '}
                    </strong>{' '}
                    {t(`${RESULTS_PREFIX}.${props.progressKey}.text-1-2`)}
                </Typography>
            )}
            <Typography gutterBottom variant={props.progressKey === 'regress' ? 'subtitle2' : 'body2'}>
                {t(`${RESULTS_PREFIX}.${props.progressKey}.text-2`)}{' '}
                <a href={`/parent/child/${props.result.getChildId()}/recommendations`}>
                    <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${props.progressKey}.text-2-1`)} </strong>
                </a>{' '}
                {props.progressKey !== 'regress' && t(`${RESULTS_PREFIX}.${props.progressKey}.text-2-2`)}
                {props.progressKey === 'constant' && (
                    <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${props.progressKey}.text-2-3`)} </strong>
                )}
            </Typography>

            {props.progressKey === 'regress' && (
                <Typography gutterBottom variant="subtitle2">
                    {t(`${RESULTS_PREFIX}.${props.progressKey}.text-3`)}{' '}
                    <strong className={classes.link}>{t(`${RESULTS_PREFIX}.${props.progressKey}.text-3-1`)} </strong>{' '}
                </Typography>
            )}
        </BasicModal>
    );
}

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
