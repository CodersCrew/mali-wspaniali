import { ReactNode } from 'react';
import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';

interface Props {
    icon: ReactNode;
    size?: 'small' | 'medium';
    color?: 'success' | 'success-dark' | 'primary' | 'secondary' | 'default';
    disabled?: boolean;
    onClick: () => void;
}

export function CustomIconButton(props: Props) {
    const classes = useStyles(props);

    return (
        <IconButton
            onClick={props.onClick}
            disabled={props.disabled}
            classes={{ root: classes.root }}
            size={props.size || 'small'}
        >
            {props.icon}
        </IconButton>
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
