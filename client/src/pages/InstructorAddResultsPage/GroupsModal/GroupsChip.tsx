import { Chip, createStyles, makeStyles, Theme } from '@material-ui/core';

interface Props {
    label: string;
    selected?: Boolean;
    onClick?: () => void;
}

export function GroupsChip(props: Props) {
    const classes = useStyles();

    return (
        <Chip
            variant={props.selected ? 'default' : 'outlined'}
            size="medium"
            label={props.label}
            color="secondary"
            onClick={props.onClick}
            className={classes.chip}
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            marginRight: theme.spacing(1.5),
        },
    }),
);
