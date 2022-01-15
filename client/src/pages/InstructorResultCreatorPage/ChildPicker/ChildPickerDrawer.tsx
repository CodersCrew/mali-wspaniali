import {
    Box,
    createStyles,
    Divider,
    Grid,
    makeStyles,
    SwipeableDrawer,
    Theme,
    AppBar,
    Toolbar,
} from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../../components/Button';
import { Child, Kindergarten } from '../../../graphql/types';
import { useSidebarState } from '../../../utils/useSidebar';
import { ResultCreatorReturnProps } from '../useResultCreator';
import { ChildPicker } from './ChildPicker';

interface ChildPickerDrawerProps {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    selectedGroup: string;
    measurement: string;
    resultCreator: ResultCreatorReturnProps;
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPickerDrawer(props: ChildPickerDrawerProps) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const { t } = useTranslation();
    const classes = useStyles();
    const sidebarState = useSidebarState();

    return (
        <>
            <SwipeableDrawer
                anchor="right"
                disableSwipeToOpen={sidebarState.isOpen}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onOpen={() => setIsDrawerOpen(true)}
                disableBackdropTransition={true}
                disableDiscovery={true}
                classes={{ root: classes.drawer, paper: classes.paper }}
            >
                <ChildPicker
                    assessment={props.resultCreator.selectedAssessment}
                    header={
                        <Box className={classes.header} onClick={() => setIsDrawerOpen(false)}>
                            <AppBar elevation={0} classes={{ root: classes.appBar }}>
                                <Toolbar>
                                    <ButtonSecondary
                                        icon={<ArrowBack />}
                                        innerText={t('add-result-page.back-to-add-results')}
                                    />
                                </Toolbar>
                                <Divider />
                            </AppBar>
                        </Box>
                    }
                    selectedGroup={props.selectedGroup}
                    selectedKindergarten={props.selectedKindergarten}
                    kindergartens={props.kindergartens}
                    selected={props.selected}
                    results={props.resultCreator.kindergartenResults}
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
                    <ButtonSecondary onClick={() => setIsDrawerOpen(true)}>
                        <Box mr={1}>{t('add-result-page.select-child')}</Box> <ArrowForward />
                    </ButtonSecondary>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            zIndex: '1300 !important' as any,
        },
        paper: {
            width: '90%',
            overflowX: 'hidden',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            marginBottom: theme.spacing(3),
        },
        appBar: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
            width: '90%',
        },
        icon: {
            color: theme.palette.secondary.main,
        },
        backButtonContainer: {
            padding: theme.spacing(1, 2),
        },
    }),
);
