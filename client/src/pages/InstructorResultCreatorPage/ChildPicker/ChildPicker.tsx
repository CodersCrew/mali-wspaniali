import React, { useState } from 'react';
import { List, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { SelectList } from '../../../components/SelectList';
import { SearchChildField } from '../../../components/SearchChildField';
import { Assessment, Child, Kindergarten, AssessmentResult } from '../../../graphql/types';
import { countProgress } from '../countProgress';
import { ChildItem } from './ChildItem';

interface Props {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    measurement: string;
    header: React.ReactNode;
    assessment: Assessment;
    results: AssessmentResult[];
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPicker({
    childList,
    kindergartens,
    selectedKindergarten,
    selected,
    measurement,
    results,
    header,
    assessment,
    onClick,
}: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <CustomContainer
            header={header}
            container={
                <React.Fragment>
                    <Grid container className={classes.container} spacing={2} direction="column">
                        <Grid item className={classes.fullWidth}>
                            <SelectList
                                value={selectedKindergarten}
                                label={t('add-results-page.kindergarten-name')}
                                items={kindergartens.map((k) => (
                                    <MenuItem value={k._id} key={k._id}>
                                        <div>
                                            {k.number}/{k.name}
                                        </div>
                                        <div className={classes.helperLabel}>{k.address}</div>
                                    </MenuItem>
                                ))}
                                onSelect={(value) => onClick('kindergarten', value)}
                            />
                        </Grid>
                        <Grid item>
                            <SelectList
                                value={measurement}
                                disabled={isAssessmentDisabled()}
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
                        {getFilteredChildrenByFullName().map((c) => {
                            return (
                                <ChildItem
                                    key={c._id}
                                    child={c}
                                    selected={c._id === selected}
                                    progress={countResultProgress(c._id)}
                                    onClick={() => onClick('child', c._id)}
                                />
                            );
                        })}
                    </List>
                </React.Fragment>
            }
            disableShadow
        />
    );

    function getFilteredChildrenByFullName() {
        return childList.filter((c) => {
            const fullName = `${c.firstname} ${c.lastname}`.toLowerCase();

            return fullName.includes(searchTerm.toLowerCase());
        });
    }

    function isAssessmentDisabled() {
        return assessment.firstMeasurementStatus !== 'active' || assessment.lastMeasurementStatus !== 'active';
    }

    function countResultProgress(childId: string) {
        const foundResult = results.find((r) => r.childId === childId);

        if (foundResult) {
            return countProgress(measurement, foundResult);
        }

        return 0;
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(2, 2, 0, 2),
        },
        fullWidth: {
            width: '100%',
        },
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
    }),
);
