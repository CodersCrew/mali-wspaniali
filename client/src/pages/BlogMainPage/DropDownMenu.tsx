import React, { useState, useRef, useEffect } from 'react';
import { Button, Tabs, Grow, Paper, Popper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles, withStyles, ThemeProvider } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { categoriesList } from './BlogCategories';
import { DropDownMenuItem } from './DropDownMenuItem';
import { theme } from '../../theme/theme';
import { Theme } from '../../theme';

type DropDownMenuProps = {
    onClick: (value: string) => void;
    active: string;
    values: typeof categoriesList;
};

export const DropDownMenu = ({ onClick, active, values }: DropDownMenuProps) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [buttonCategoryValue, setButtonCategoryValue] = useState('');
    const anchorRef = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();

    const handleToggle = () => {
        setIsOpen(prevOpen => !prevOpen);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        onClick(categoriesList[newValue].key);
        setIsOpen(false);
        setButtonCategoryValue(categoriesList[newValue].name);
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
        <ThemeProvider theme={theme}>
            <div className={classes.root} onKeyDown={handleListKeyDown}>
                <Button
                    ref={anchorRef}
                    aria-controls={isOpen ? 'menu-list-grow' : ''}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.button}
                >
                    {buttonCategoryValue || t('blog-categories.all')}
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
                <Popper className={classes.container} open={isOpen} transition disablePortal>
                    {({ TransitionProps }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: 'bottom' }}>
                            <Paper>
                                <MenuStyledTabs
                                    value={values.findIndex(tab => tab.key === active)}
                                    onChange={handleChange}
                                >
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
        </ThemeProvider>
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
            fontWeight: 'bold',
            marginLeft: '52px',
            marginRight: '52px',
            width: '100vw',
            justifyContent: 'space-between',
        },
        container: {
            marginLeft: '52px',
            marginRight: '52px',
            alignItems: 'flex-start',
            transform: 'translate3d(0px, 35px, 0px)',
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
