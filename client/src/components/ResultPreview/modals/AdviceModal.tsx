import { createStyles, Link, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../Modal/BasicModal';
import { Child, ChildInput } from '../../../graphql/types';
import { ActionDialog, openDialog } from '../../../utils/openDialog';

const T_ADVICE_PREFIX = 'child-profile.advice-modal-content';

type AdviceModalProps = {
    preventClose: boolean;
    isCancelButtonVisible: boolean;
    resultKey: string;
    child: Child;
};

function AdviceModal(props: AdviceModalProps & ActionDialog<{ child: ChildInput }>) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={onClose}
            isCancelButtonVisible={true}
            dialogProps={{ maxWidth: 'sm' }}
            closeButtonText={'zamknij'}
            isActionButtonSecondary={false}
        >
            <Box mb={2}>
                <Typography variant="h4">{t(`${T_ADVICE_PREFIX}.${props.resultKey}.title`)}</Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="subtitle2">{t(`${T_ADVICE_PREFIX}.${props.resultKey}.subtitle`)}</Typography>
            </Box>
            <Box mb={2}>
                <Typography variant={'body2'}>{t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-1`)}</Typography>
            </Box>
            <Box mb={2}>
                <Typography variant={props.resultKey === 'medium' ? 'subtitle2' : 'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-2`)}{' '}
                    <Link
                        className={classes.link}
                        href={`/parent/child/${props.child._id}/tests-information`}
                        underline="none"
                    >
                        {t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-2-1`)}{' '}
                    </Link>
                    {t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-2-2`)}
                </Typography>
            </Box>
            {(props.resultKey === 'bad' || props.resultKey === 'medium') && (
                <Typography variant={props.resultKey === 'bad' ? 'subtitle2' : 'body2'}>
                    {t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-3`)}{' '}
                    <strong className={classes.link}>{t(`${T_ADVICE_PREFIX}.${props.resultKey}.text-3-1`)} </strong>{' '}
                </Typography>
            )}
        </BasicModal>
    );
    function onClose() {
        if (!props.preventClose) {
            props.onClose();
        }
    }
}

export const openAdviceModal = (props: AdviceModalProps) => {
    return openDialog<AdviceModalProps>(AdviceModal, props);
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            color: theme.palette.primary.main,
        },
    }),
);
