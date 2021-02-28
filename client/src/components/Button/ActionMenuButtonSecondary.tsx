import { useState, useRef, ReactNode } from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grid, Grow, MenuList, Paper, Popper } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

interface ActionMenuButtonSecondaryProps {
    label: string;
    options: ReactNode[];
    onClick: () => void;
}

export function ActionMenuButtonSecondary(props: ActionMenuButtonSecondaryProps) {
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" color="secondary" ref={anchorRef} aria-label="split button">
                    <Button onClick={props.onClick}>{props.label}</Button>
                    <Button size="small" onClick={handleMenuToggle}>
                        <ArrowDropDown />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={isActionMenuOpen}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    placement="top-end"
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: 'left top',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>{props.options}</MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );

    function handleMenuToggle() {
        setIsActionMenuOpen((prev) => !prev);
    }

    function handleClose() {
        setIsActionMenuOpen(false);
    }
}
