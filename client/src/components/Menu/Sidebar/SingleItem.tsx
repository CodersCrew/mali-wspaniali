import { ListItem, ListItemIcon, ListItemText, makeStyles, Theme, createStyles, alpha } from '@material-ui/core';
import clsx from 'clsx';

export interface SingleItemProps {
    name: string;
    icon: React.ReactNode;
    link?: string;
    rightIcon?: React.ReactNode;
    active?: boolean;
    preload?: () => void;
}

interface Props {
    item: SingleItemProps;
    onClick: (link?: string) => void;
    leftPadding?: boolean;
    grayed?: boolean;
}

interface StyleProps {
    leftPadding?: boolean;
}

export function SingleItem({ item, leftPadding, grayed, onClick }: Props) {
    const classes = useStyles({ leftPadding });

    return (
        <ListItem
            button
            key={item.name}
            onClick={() => onClick(item.link)}
            onMouseOver={() => item.preload && item.preload()}
            classes={{
                button: clsx({ [classes.button]: true, [classes.grayed]: grayed, [classes.activeButton]: item.active }),
                gutters: classes.rootButton,
            }}
        >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
            {item.rightIcon}
        </ListItem>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        activeButton: {
            background: `${alpha(theme.palette.primary.main, 0.2)} !important`,
        },
        button: {
            '&:hover': {
                background: alpha(theme.palette.primary.main, 0.2),
            },
        },
        rootButton: {
            paddingLeft: (props: StyleProps) => theme.spacing(props.leftPadding ? 3 : 2),
        },
        grayed: {
            background: theme.palette.grey[100],
        },
    }),
);
