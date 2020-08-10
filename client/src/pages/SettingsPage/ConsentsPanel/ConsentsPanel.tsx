import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Theme } from '../../../theme';

export const ConsentsPanel = () => {
    // TODO: internacjonalizacja
    const consents = ['Pierwsza zgoda', 'Druga zgoda', 'Trzecia zgoda'];
    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value: number) => () => {
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
        <List className={classes.root}>
            {consents
                .map(value => consents.indexOf(value))
                .map(value => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${consents[value]}`} />
                        </ListItem>
                    );
                })}
        </List>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);
