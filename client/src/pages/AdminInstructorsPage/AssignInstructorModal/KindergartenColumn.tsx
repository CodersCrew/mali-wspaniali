import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Paper } from '@material-ui/core';

import { Kindergarten } from '../../../graphql/types';

export const KindergartenColumn = (items: Kindergarten[]) => {
    const [checked, setChecked] = useState<Kindergarten[]>([]);

    const classes = useStyles();

    const handleToggle = (value: Kindergarten) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value._id}-label`;

                    return (
                        <ListItem key={value.number} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
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
