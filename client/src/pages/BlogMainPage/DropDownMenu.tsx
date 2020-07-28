import React, { useState, useRef, useEffect } from 'react';
import { Tabs, Grow, Paper, Popper } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { DropDownMenuItem } from './DropDownMenuItem';
import { Theme } from '../../theme/types';
import { CategoryItem } from './BlogCategories';
import { ButtonDefault } from '../../components/Button';

type Props = {
    onClick: (value: string) => void;
    active: string;
    values: CategoryItem[];
};

export const DropDownMenu = ({ onClick, active, values }: Props) => {
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
            <ButtonDefault
                variant="text"
                ref={anchorRef}
                aria-controls={isOpen ? 'menu-list-grow' : ''}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.button}
                fullWidth
                endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                innerText={values.find(category => category.key === active)!.name}
            />
            <Popper className={classes.container} open={isOpen} transition disablePortal>
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: 'bottom' }}>
                        <Paper>
                            <Tabs
                                value={values.findIndex(tab => tab.key === active)}
                                onChange={handleChange}
                                classes={{ flexContainer: classes.flexContainer, indicator: classes.indicator }}
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
                            </Tabs>
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
            backgroundColor: theme.palette.common.white,

            '&:hover': {
                backgroundColor: theme.palette.common.white,
            }
        },
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
