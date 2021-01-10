import React, { useState } from 'react';
import { List, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { CustomContainer } from '../../../components/CustomContainer';
import { Child, Kindergarten } from '../../../graphql/types';
import { ChildItem } from './ChildItem';
import { SelectList } from '../../../components/SelectList';
import { SearchChildField } from '../../../components/SearchChildField';
import { useIsDevice } from '../../../queries/useBreakpoints';

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
    const [isSearchFieldOpen, setIsSearchFieldOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const device = useIsDevice();

    return (
        <CustomContainer
            header={header}
            container={
                <div>
                    <Grid
                        container
                        className={clsx({
                            [classes.displayOptions]: true,
                            [classes.smallDisplayOptions]: device.isSmallMobile,
                        })}
                        spacing={2}
                        direction="column"
                    >
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
                                isCompact={device.isSmallMobile}
                                isOpen={isSearchFieldOpen}
                                onClick={() => setIsSearchFieldOpen((prev) => !prev)}
                                onChange={(value) => setSearchTerm(value)}
                                searchTerm={searchTerm}
                            />
                        </Grid>
                    </Grid>
                    <div>
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
                    </div>
                </div>
            }
            disableShadow={device.isSmallMobile}
        />
    );

    function getFilteredChildrenByName() {
        return childList.filter((c) => c.firstname.toLowerCase().includes(searchTerm.toLowerCase()));
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        displayOptions: {
            padding: theme.spacing(2),
        },
        smallDisplayOptions: {
            paddingBottom: 0,
        },
        listHeader: {
            paddingLeft: theme.spacing(2),
        },
    }),
);
