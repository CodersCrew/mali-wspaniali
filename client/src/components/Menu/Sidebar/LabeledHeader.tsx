import { Divider, createStyles, makeStyles } from '@material-ui/core';
import { AppLogo } from '../../AppLogo';
import { Theme } from '@app/theme/types';

export function LabeledHeader() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.sectionContainer}>
                <div className={classes.sectionImg}>
                    <AppLogo />
                </div>
            </div>
            <Divider />
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionContainer: {
            padding: theme.spacing(2),
            paddingBottom: '12px',
        },
        sectionImg: {
            marginTop: theme.spacing(3),
        },
    }),
);
