import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { categoriesList } from './BlogCategories';
import { StyledTab } from './StyledTab';
import { CategoryTabProps } from './CategoryTabs';

export const DropDownMenu = ({ setCategory }: CategoryTabProps) => {
    const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTabIndex(newValue);
        setCategory(categoriesList[newValue].key);
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
          All categories
                </Button>
                <Popper className={classes.container} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={ open } id="menu-list-grow" onKeyDown={ handleListKeyDown }>
                                        <MenuStyledTabs value={ currentTabIndex } onChange={ handleChange }>
                                            { categoriesList.map(category => {
                                                return <MenuItem key={ category.name } ><StyledTab  label={ category.name } color={ category.color } /></MenuItem>;
                                            }) }
                                        </MenuStyledTabs>;
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
};

type MenuStyledTabsProps = {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

const MenuStyledTabs = withStyles({
    flexContainer: {
        flexDirection: 'column',
        marginLeft: '3%',
    },
    indicator: {
        display: 'none',
    },
})((props: MenuStyledTabsProps) => <Tabs {...props} />);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        paper: {
            marginRight: theme.spacing(2),
        },
        container: {
            position: 'relative',
            transform: 'translate3d(-5px, 36px, 0px)',
            willChange: 'transform'
        }
    }),
);
