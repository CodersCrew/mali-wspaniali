import { Button, ButtonProps, makeStyles, createStyles, Theme } from '@material-ui/core/';
import clsx from 'clsx';

export type CustomButtonProps = ButtonProps & {
    innerText?: string;
    icon?: React.ReactNode;
    variant?: string;
};

export const ButtonBase: React.FC<CustomButtonProps> = ({ innerText, icon, className, children, ...props }) => {
    const classes = useStyles();

    let content;
    if (children) {
        content = children;
    } else if (innerText) {
        content = innerText;
    } else {
        content = '';
    }

    return (
        <Button {...props} className={clsx(className, classes.button)}>
            {icon && <span className={classes.icon}>{icon}</span>}
            {content}
        </Button>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            display: 'flex',
            margin: `0 ${theme.spacing(1)}px`,
        },
        button: {
            whiteSpace: 'nowrap',
            borderRadius: '4px',
        },
    }),
);
