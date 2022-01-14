import React from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grid, Grow, MenuList, Paper, Popper } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

interface ActionMenuButtonSecondaryProps {
    label: string;
    options: React.ReactNode[];
    onClick: () => void;
    isDisabled?: boolean;
    size?: 'small' | 'medium' | 'large';
    buttonStyle?: React.CSSProperties;
    popperStyle?: string;
}

export function ActionMenuButtonSecondary(props: ActionMenuButtonSecondaryProps) {
    const [isActionMenuOpen, setIsActionMenuOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    return (
        <Grid container direction="column" alignItems="center">
            <Grid style={{ width: '100%' }} item xs={12}>
                <ButtonGroup
                    style={props.buttonStyle}
                    variant="contained"
                    color="secondary"
                    ref={anchorRef}
                    aria-label="split button"
                >
                    <Button
                        disabled={props.isDisabled}
                        style={props.buttonStyle}
                        size={props.size || 'medium'}
                        onClick={props.onClick}
                    >
                        {props.label}
                    </Button>
                    <Button disabled={props.isDisabled} size="small" onClick={handleMenuToggle}>
                        <ArrowDropDown />
                    </Button>
                </ButtonGroup>
                <Popper
                    className={props.popperStyle}
                    open={isActionMenuOpen}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    placement="top"
                >
                    {({ TransitionProps }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: 'center',
                            }}
                        >
                            <Paper
                                style={{
                                    height: '48px',
                                }}
                            >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        style={{
                                            paddingTop: '0px',
                                        }}
                                    >
                                        {props.options}
                                    </MenuList>
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
