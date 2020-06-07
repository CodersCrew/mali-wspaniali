import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { useTranslation } from 'react-i18next';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';
import { categoriesList } from './BlogCategories';
import { MenuStyledTab } from './MenuStyledTab';
import { CategoryTabProps } from './CategoryTabs';
// eslint-disable-next-line import/extensions

export const DropDownMenu = ({ setCategory }: CategoryTabProps) => {
    const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();

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
            <div  >
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={ handleToggle }
                    className={classes.button}
                >
                    { t('blog-categories.header') }
                </Button>
                <Popper  className={classes.container} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'bottom' : 'bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={ open } id="menu-list-grow" onKeyDown={ handleListKeyDown }>
                                        <MenuStyledTabs value={ currentTabIndex } onChange={ handleChange }>
                                            { categoriesList.map(category => {
                                                return <MenuStyledTab key={category.key}  label={ category.name } color={ category.color } />;
                                            }) }
                                        </MenuStyledTabs>
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
        margin: '3%',
        alignItems: 'flex-start',
        maxWidth: '232.8px',
        flexWrap: 'wrap',
    },
    indicator: {
        display: 'none',
    },
})((props: MenuStyledTabsProps) => <Tabs {...props} />);

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'flex-start',
            transform: 'translate3d(0px, 35px, 0px)!important',
            zIndex: 1,
            position: 'relative',
        },
        button: {
            fontWeight: 'bold',
            marginLeft:'52px'
        },
        container: {
            marginLeft: '52px',
            position: 'absolute',
            left:'52px',
            willChange: 'transform',
            alignItems: 'flex-start',
            transform: 'translate3d(0px, 35px, 0px)!important',
        }
    }),
);
