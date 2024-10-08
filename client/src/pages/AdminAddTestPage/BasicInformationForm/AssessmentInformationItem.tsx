import { Grid, ListItem, Typography, Link, makeStyles, createStyles, Theme } from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

import { ProgressBar } from '@app/components/ProgressBar';
import { StatusChip } from '@app/components/StatusChip';

interface Props {
    label: string;
    subheader: string;
    status: string;
    result: number;
    divider?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export function AssessmentInformationItem({ label, result, status, subheader, disabled, divider, onClick }: Props) {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <ListItem divider={divider} classes={{ root: classes.listItemContainer }}>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Typography variant="subtitle1">{label}</Typography>
                        </Grid>

                        <Grid item>
                            <Typography variant="body2">{subheader}</Typography>
                        </Grid>

                        <Grid item>
                            <StatusChip value={status} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <Typography variant="body2" className={classes.measurementAmountBox}>
                                {t('add-test-view.basic-information-form.measurement-amount')}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <div className={classes.progressBarContainer}>
                                <ProgressBar disabled={disabled} value={result} />
                            </div>
                        </Grid>

                        <Grid item>
                            <div className={classes.linkContainer}>
                                {!disabled && (
                                    <Link onClick={onClick}>
                                        {t('add-test-view.basic-information-form.see-results')}
                                    </Link>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progressBarContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 17,
        },
        linkContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: theme.spacing(3),
            cursor: 'pointer',
        },
        listItemContainer: {
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
        measurementAmountBox: {
            paddingTop: theme.spacing(4),

            '@media (min-width: 768px)': {
                paddingTop: theme.spacing(0),
            },
        },
    }),
);
