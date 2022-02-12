import { createStyles, makeStyles, Theme, Typography, Box, Link } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';

import { BasicModal } from '@app/components/Modal/BasicModal';
import { ChildInput } from '@app/graphql/types';
import { ActionDialog, openDialog } from '@app/utils/openDialog';

import { Result, ARTICLE_LINK } from '../Result';

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
            {props.progressKey !== 'progress' && (
                <Typography gutterBottom variant="subtitle2">
                    <Trans
                        i18nKey={`${RESULTS_PREFIX}.${props.progressKey}.text-1`}
                        components={{
                            Link: (
                                <Link
                                    className={classes.link}
                                    href={`/parent/child/${props.result.getChildId()}/tests-information`}
                                    underline="none"
                                />
                            ),
                        }}
                    />
                </Typography>
            )}
            <Typography gutterBottom variant={props.progressKey === 'regress' ? 'subtitle2' : 'body2'}>
                <Trans
                    i18nKey={`${RESULTS_PREFIX}.${props.progressKey}.text-2`}
                    components={{
                        Link: (
                            <Link
                                className={classes.link}
                                href={`/parent/child/${props.result.getChildId()}/recommendations`}
                                underline="none"
                            />
                        ),
                        OtherLink: <Link className={classes.link} href={ARTICLE_LINK} underline="none" />,
                    }}
                />
            </Typography>
            {props.progressKey === 'regress' && (
                <Typography gutterBottom variant="subtitle2">
                    <Trans
                        i18nKey={`${RESULTS_PREFIX}.${props.progressKey}.text-3`}
                        components={{
                            Link: <Link className={classes.link} href={ARTICLE_LINK} underline="none" />,
                        }}
                    />
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
