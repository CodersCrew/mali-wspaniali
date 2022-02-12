import { createStyles, Link, makeStyles, Theme, Typography, Box } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';

import { BasicModal } from '@app/components/Modal/BasicModal';
import { ActionDialog, openDialog } from '@app/utils/openDialog';

import { ARTICLE_LINK, Result } from '../Result';
import { ResultKeys } from '../calculateResult';

const T_ADVICE_PREFIX = 'child-profile.advice-modal-content';

type AdviceModalProps = {
    resultKey: ResultKeys;
    result: Result;
};

function AdviceModal(props: AdviceModalProps & ActionDialog<{ result: Result }>) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={props.onClose}
            isCancelButtonVisible
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
                <Typography variant={props.resultKey === 'scale49' ? 'subtitle2' : 'body2'}>
                    <Trans
                        i18nKey={`${T_ADVICE_PREFIX}.${props.resultKey}.text-2`}
                        components={{
                            Link: (
                                <Link
                                    className={classes.link}
                                    href={
                                        props.resultKey === 'scale59' || props.resultKey === 'maxScale'
                                            ? ARTICLE_LINK
                                            : `/parent/child/${props.result.getChildId()}/tests-information`
                                    }
                                    underline="none"
                                />
                            ),
                        }}
                    />
                </Typography>
            </Box>
            {(props.resultKey === 'scale39' || props.resultKey === 'scale49') && (
                <Typography variant={props.resultKey === 'scale39' ? 'subtitle2' : 'body2'}>
                    <Trans
                        i18nKey={`${T_ADVICE_PREFIX}.${props.resultKey}.text-3`}
                        components={{
                            Link: <Link className={classes.link} href={ARTICLE_LINK} underline="none" />,
                        }}
                    />
                </Typography>
            )}
        </BasicModal>
    );
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
