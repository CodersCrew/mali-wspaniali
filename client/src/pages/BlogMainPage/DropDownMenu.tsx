import React, { useState, useRef, useEffect } from 'react';
import { Tabs, Grow, Paper, Popper, Button } from '@material-ui/core';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DropDownMenuItem } from './DropDownMenuItem';
import { Theme } from '../../theme/types';
import { CategoryItem } from './BlogCategories';

type DropDownMenuProps = {
    onClick: (value: string) => void;
    active: string;
    values: CategoryItem[];
};

export const DropDownMenu = ({ onClick, active, values }: DropDownMenuProps) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setIsOpen(prevOpen => !prevOpen);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        onClick(values[newValue].key);
        setIsOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setIsOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(null);
    useEffect(() => {
        if (anchorRef.current && prevOpen.current && isOpen === false) {
            anchorRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className={classes.root} onKeyDown={handleListKeyDown}>
            <Button
                ref={anchorRef}
                aria-controls={isOpen ? 'menu-list-grow' : ''}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.button}
            >
                {values.find(category => category.key === active)!.name}
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
            <Popper className={classes.container} open={isOpen} transition disablePortal>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'bottom' }}>
                        <Paper>
                            <MenuStyledTabs value={values.findIndex(tab => tab.key === active)} onChange={handleChange}>
                                {values.map(category => {
                                    return (
                                        <DropDownMenuItem
                                            key={category.name}
                                            label={category.name}
                                            color={category.color}
                                        />
                                    );
                                })}
                            </MenuStyledTabs>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'flex-start',
            transform: 'translate3d(0px, 35px, 0px)',
            zIndex: 9,
            position: 'relative',

            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        button: {
            justifyContent: 'space-between',
        },
        growContainer: { transformOrigin: 'bottom' },
        container: {
            width: '100%',
            alignItems: 'flex-start',
            transform: 'translate3d(0px, 35px, 0px)',
        },
        flexContainer: {
            margin: '3%',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
        },
        indicator: {
            display: 'none',
        },
    }),
);

const styles = createStyles({
    flexContainer: {
        margin: '3%',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    indicator: {
        display: 'none',
    },
});

const MenuStyledTabs = withStyles(styles)(Tabs);
