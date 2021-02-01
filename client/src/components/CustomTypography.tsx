import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface Props {
    text: string;
    variant?: string;
    color?: 'success' | 'success-dark' | 'primary' | 'secondary' | 'default';
}

export function CustomTypography(props: Props) {
    const classes = useStyles(props);

    return (
        <Typography variant={props.variant as Variant} classes={{ root: classes.root }} component="span">
            {props.text}
        </Typography>
    );
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            color: (props: Props) => {
                if (props.color === 'success') {
                    return theme.palette.success.main;
                }

                if (props.color === 'success-dark') {
                    return theme.palette.success.dark;
                }

                if (props.color === 'primary') {
                    return theme.palette.primary.main;
                }

                if (props.color === 'secondary') {
                    return theme.palette.secondary.main;
                }

                return theme.palette.text.secondary;
            },
        },
    });
});
