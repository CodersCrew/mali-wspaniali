import React from 'react';
import { List, Typography, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../../../components/CustomContainer';
import { Child, Kindergarten } from '../../../graphql/types';
import { ChildItem } from './ChildItem';
import { SelectList } from '../../../components/SelectList';

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
            header={<Typography variant="h4">{t('add-result-page.kindergarten')}</Typography>}
            container={
                <div>
                    <Grid container className={classes.displayOptions} spacing={2} direction="column">
                        <Grid item>
                            <SelectList
                                value={selectedKindergarten}
                                label={t('add-results-page.test-name')}
                                items={kindergartens.map((k) => (
                                    <MenuItem value={k._id} key={k._id}>
                                        {k.name}
                                    </MenuItem>
                                ))}
                                onSelect={(value) => onClick('kindergarten', value)}
                            />
                        </Grid>
                        <Grid item>
                            <SelectList
                                value={measurement}
                                label={t('add-result-page.select-measurement')}
                                items={[
                                    <MenuItem key="first" value="first">
                                        {t('add-result-page.first')}
                                    </MenuItem>,
                                    <MenuItem key="last" value="last">
                                        {t('add-result-page.last')}
                                    </MenuItem>,
                                ]}
                                onSelect={(value) => onClick('measurement', value)}
                            />
                        </Grid>
                    </Grid>
                    <div>
                        <div className={classes.listHeader}>
                            <Typography variant="subtitle1">{t(`add-result-page.child-list`)}</Typography>
                        </div>
                        <List>
                            <Divider />
                            {childList.map((c) => {
                                return (
                                    <ChildItem
                                        key={c._id}
                                        child={c}
                                        selected={c._id === selected}
                                        onClick={(value) => onClick('child', c._id)}
                                    />
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
        displayOptions: {
            padding: theme.spacing(2),
        },
        listHeader: {
            paddingLeft: theme.spacing(2),
        },
    }),
);
