import React from 'react';
import {
    List,
    Typography,
    TextField,
    MenuItem,
    ListItem,
    Divider,
    createStyles,
    makeStyles,
    Theme,
    fade,
    Grid,
} from '@material-ui/core';
import { BarChart, KeyboardArrowRight } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../../components/CustomContainer';
import { Child, Kindergarten } from '../../graphql/types';

interface Props {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    measurement: string;
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPicker({ childList, kindergartens, selectedKindergarten, selected, measurement, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <CustomContainer
            header={<Typography variant="h4">Przedszkole</Typography>}
            container={
                <div>
                    <Grid container className={classes.displayOptions} spacing={2} direction="column">
                        <Grid item>
                            <TextField
                                select
                                label={t('add-results-page.test-name')}
                                onChange={({ target: { value } }) => onClick('kindergarten', value)}
                                variant="outlined"
                                value={selectedKindergarten}
                                fullWidth
                                SelectProps={{
                                    MenuProps: {
                                        getContentAnchorEl: null,
                                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                                    },
                                }}
                            >
                                {kindergartens.map(k => (
                                    <MenuItem value={k._id} key={k._id}>
                                        {k.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <TextField
                                select
                                label={t('add-result-page.select-measurement')}
                                onChange={({ target: { value } }) => onClick('measurement', value)}
                                variant="outlined"
                                value={measurement}
                                fullWidth
                                SelectProps={{
                                    MenuProps: {
                                        getContentAnchorEl: null,
                                        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                                    },
                                }}
                            >
                                <MenuItem value="first">{t('add-result-page.first')}</MenuItem>
                                <MenuItem value="last">{t('add-result-page.last')}</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <div>
                        <div className={classes.listHeader}>
                            <Typography variant="subtitle1">Lista dzieci</Typography>
                        </div>
                        <List>
                            <Divider />
                            {childList.map(c => {
                                return (
                                    <ListItem
                                        key={c._id}
                                        button
                                        divider
                                        classes={{
                                            root: classes.listItemRoot,
                                            selected: classes.listItemSelected,
                                        }}
                                        onClick={() => onClick('child', c._id)}
                                        selected={c._id === selected}
                                    >
                                        <BarChart className={classes.chartIcon} />{' '}
                                        <span className={classes.childButton}>
                                            <Typography variant="body2">
                                                {c.firstname} {c.lastname}
                                            </Typography>
                                        </span>
                                        <KeyboardArrowRight className={classes.arrowIcon} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                </div>
            }
        />
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartIcon: {
            marginRight: theme.spacing(3),
            color: theme.palette.text.secondary,
        },
        arrowIcon: {
            color: theme.palette.text.secondary,
        },
        childButton: {
            flex: 1,
        },
        listItemRoot: {
            '&:hover': {
                backgroundColor: `${fade(theme.palette.primary.main, 0.08)} !important`,
            },
        },
        listItemSelected: {
            backgroundColor: `${fade(theme.palette.primary.main, 0.08)} !important`,
        },
        displayOptions: {
            padding: theme.spacing(2),
        },
        listHeader: {
            paddingLeft: theme.spacing(2),
        },
    }),
);
