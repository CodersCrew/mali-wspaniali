import React from 'react';
import { Box, createStyles, Grid, makeStyles, SwipeableDrawer, Theme, Typography } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { Child, Kindergarten } from '../../../graphql/types';
import { ChildPicker } from './ChildPicker';
import { ButtonSecondary } from '../../../components/Button';

interface Props {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    measurement: string;
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPickerDrawer(props: Props) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <>
            <SwipeableDrawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpen={() => setIsDrawerOpen(true)}
                disableBackdropTransition={true}
                disableDiscovery={true}
                classes={{ root: classes.drawer }}
            >
                <ChildPicker
                    header={
                        <span className={classes.header} onClick={() => setIsDrawerOpen(false)}>
                            <Box mr={1}>
                                <ArrowBack className={classes.icon} />
                            </Box>
                            <Typography variant="body2">{t('add-result-page.back-to-results')}</Typography>
                        </span>
                    }
                    selectedKindergarten={props.selectedKindergarten}
                    kindergartens={props.kindergartens}
                    selected={props.selected}
                    measurement={props.measurement}
                    childList={props.childList}
                    onClick={(type, value) => {
                        setIsDrawerOpen(false);

                        props.onClick(type, value);
                    }}
                />
            </SwipeableDrawer>
            <Grid container justify="flex-end" className={classes.backButtonContainer}>
                <Grid item>
                    <ButtonSecondary>
                        <Box mr={1}>{t('add-result-page.select-child')}</Box> <ArrowForward />
                    </ButtonSecondary>
                </Grid>
            </Grid>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            zIndex: '2000 !important' as any,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
        },
        icon: {
            color: theme.palette.text.secondary,
        },
        backButtonContainer: {
            marginTop: -20,
        },
    }),
);
