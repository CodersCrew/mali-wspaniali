import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export function StatusChip({ value }: { value: string }) {
    const classes = useStyles();
    const { t } = useTranslation();

    if (value === 'active') {
        return (
            <Chip
                size="small"
                label={t('manage-test-view.test-list.active')}
                classes={{ root: classes.successLabel }}
            />
        );
    }

    if (value === 'done') {
        return <Chip size="small" label={t('manage-test-view.test-list.done')} classes={{ root: classes.doneLabel }} />;
    }

    return <Chip size="small" label={t(`manage-test-view.test-list.${value}`)} classes={{ root: classes.doneLabel }} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        successLabel: {
            color: theme.palette.secondary.contrastText,
            background: theme.palette.success.main,
        },
        doneLabel: {
            background: theme.palette.grey[300],
        },
    }),
);
