import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Paper } from '@material-ui/core';

import { Kindergarten } from '../../../graphql/types';

interface Props {
    checked: Kindergarten[];
    setChecked: React.Dispatch<React.SetStateAction<Kindergarten[]>>;
    kindergartens: Kindergarten[];
}

export const KindergartenColumn = ({ checked, setChecked, kindergartens }: Props) => {
    const classes = useStyles();

    const handleToggle = (kindergarten: Kindergarten) => () => {
        const currentIndex = checked.indexOf(kindergarten);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(kindergarten);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {kindergartens.map((kindergarten) => {
                    const labelId = `transfer-list-item-${kindergarten._id}-label`;

                    return (
                        <ListItem key={kindergarten.number} role="listitem" button onClick={handleToggle(kindergarten)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(kindergarten) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={kindergarten.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
}));
