import { ListItem, ListItemIcon, ListItemText, Checkbox, makeStyles } from '@material-ui/core';

interface TransferListItemProps {
    checked: boolean;
    label: React.ReactNode;
    disabled: boolean;
    onChange: () => void;
}

export function TransferListItem(props: TransferListItemProps) {
    const classes = useStyles();

    return (
        <ListItem
            role="listitem"
            disabled={props.disabled}
            onClick={() => !props.disabled && props.onChange()}
            classes={{ root: classes.item }}
        >
            <ListItemIcon>
                <Checkbox checked={props.checked} tabIndex={-1} disableRipple disabled={props.disabled} />
            </ListItemIcon>
            <ListItemText primary={props.label} />
        </ListItem>
    );
}

const useStyles = makeStyles({
    item: {
        cursor: 'pointer',
    },
});
