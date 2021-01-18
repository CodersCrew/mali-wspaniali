import React, { useState } from 'react';
import { List, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../../../components/CustomContainer';
import { Child, Kindergarten } from '../../../graphql/types';
import { ChildItem } from './ChildItem';
import { SelectList } from '../../../components/SelectList';
import { SearchChildField } from '../../../components/SearchChildField';

interface Props {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    measurement: string;
    header: React.ReactNode;
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPicker({
    childList,
    kindergartens,
    selectedKindergarten,
    selected,
    measurement,
    header,
    onClick,
}: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <CustomContainer
            header={header}
            container={
                <>
                    <Grid container className={classes.container} spacing={2} direction="column">
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
                        <Grid item>
                            <SearchChildField
                                isCompact
                                onChange={(value) => setSearchTerm(value)}
                                searchTerm={searchTerm}
                            />
                        </Grid>
                    </Grid>
                    <List disablePadding>
                        <Divider />
                        {getFilteredChildrenByName().map((c) => {
                            return (
                                <ChildItem
                                    key={c._id}
                                    child={c}
                                    selected={c._id === selected}
                                    onClick={() => onClick('child', c._id)}
                                />
                            );
                        })}
                    </List>
                </>
            }
            disableShadow
        />
    );

    function getFilteredChildrenByName() {
        return childList.filter((c) => c.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2, 2, 0, 2),
        },
    }),
);
