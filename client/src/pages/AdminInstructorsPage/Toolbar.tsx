import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Typography, IconButton, createStyles, makeStyles, Theme } from '@material-ui/core';
import { InfoOutlined as InfoIcon } from '@material-ui/icons';
import { openSnackbar } from '../../components/Snackbar/openSnackbar';

interface ToolbarProps {
    AssessmentsSelect: React.ReactNode;
    InstructorsSelect: React.ReactNode;
    count: number;
}

const T_PREFIX = 'admin-instructors-page';

export function Toolbar(props: ToolbarProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <div className={classes.input}>{props.AssessmentsSelect}</div>
            <div className={classes.input}>{props.InstructorsSelect}</div>
            <div className={classes.kindergartenInfoContainer}>
                <Typography
                    variant="subtitle2"
                    color="secondary"
                    component="p"
                    className={toolbarCounterClassName()}
                    data-testid="unassigned-kindergartens"
                >
                    {t(`${T_PREFIX}.table-toolbar.unassigned-kindergartens`, {
                        count: props.count,
                    })}
                </Typography>
                <IconButton onClick={handleClick} aria-label="info">
                    <InfoIcon />
                </IconButton>
            </div>
        </div>
    );

    function handleClick() {
        const text = t(`${T_PREFIX}.snackbars.info`);

        openSnackbar({ text, severity: 'info' });
    }

    function toolbarCounterClassName() {
        return clsx({
            [classes.kindergartenInfoText]: true,
            [classes.kindergartenInfoTextSuccess]: props.count === 0,
        });
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            gap: `${theme.spacing(3)}px`,
            flexWrap: 'wrap',
            background: theme.palette.primary.contrastText,
            borderRadius: theme.spacing(0.5),
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
        input: {
            width: 330,
        },
        kindergartenInfoContainer: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
        },
        kindergartenInfoText: {
            textTransform: 'uppercase',
        },
        kindergartenInfoTextSuccess: {
            color: theme.palette.success.main,
        },
    }),
);
