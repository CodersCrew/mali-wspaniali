import { ReactNode, useState } from 'react';
import { List, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../../../components/CustomContainer';
import { SelectList } from '../../../components/SelectList';
import { SearchChildField } from '../../../components/SearchChildField';
import { Assessment, Child, Kindergarten, AssessmentResult } from '../../../graphql/types';
import { countProgress } from '../countProgress';
import { ChildItem } from './ChildItem';

interface ChildPickerProps {
    childList: Child[];
    kindergartens: Kindergarten[];
    selectedKindergarten: string;
    selectedGroup: string;
    measurement: string;
    header: ReactNode;
    assessment: Assessment;
    results: AssessmentResult[];
    onClick: (type: string, value: string) => void;
    selected?: string;
}

export function ChildPicker(props: ChildPickerProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = React.useState('');

    const availableGroups = [
        { group: 'all', label: t('add-result-page.all-groups'), kindergartenId: props.selectedKindergarten },
        ...props.assessment.groups
            .filter((g) => g.kindergartenId === props.selectedKindergarten)
            .map((g) => ({ ...g, label: g.group })),
    ];

    return (
        <CustomContainer
            header={props.header}
            container={
                <>
                    <Grid container className={classes.container} spacing={2} direction="column">
                        <Grid item className={classes.fullWidth}>
                            <SelectList
                                value={props.selectedKindergarten}
                                label={t('add-results-page.kindergarten-name')}
                                items={props.kindergartens.map((k) => (
                                    <MenuItem value={k._id} key={k._id}>
                                        <div>
                                            {k.number}/{k.name}
                                        </div>
                                        <div className={classes.helperLabel}>{k.address}</div>
                                    </MenuItem>
                                ))}
                                onSelect={(value) => props.onClick('kindergarten', value)}
                            />
                        </Grid>
                        <Grid item>
                            <SelectList
                                value={props.measurement}
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
                                onSelect={(value) => props.onClick('measurement', value)}
                            />
                        </Grid>
                        <Grid item>
                            <SelectList
                                value={props.selectedGroup}
                                label={t('add-result-page.select-group')}
                                items={availableGroups.map((g) => (
                                    <MenuItem key={g.group} value={g.group}>
                                        {g.label}
                                    </MenuItem>
                                ))}
                                onSelect={(value) => props.onClick('group', value)}
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
                        {getFiltredChildren().map((c) => {
                            return (
                                <ChildItem
                                    key={c._id}
                                    child={c}
                                    selected={c._id === props.selected}
                                    progress={countResultProgress(c._id)}
                                    onClick={() => props.onClick('child', c._id)}
                                />
                            );
                        })}
                    </List>
                </>
            }
            disableShadow
        />
    );

    function getFiltredChildren() {
        return props.childList.filter((c) => {
            return getFilteredChildrenByFullName(c) && getFiltredByGroup(c);
        });
    }

    function getFiltredByGroup(c: Child) {
        const foundResult = props.results.find((r) => r.childId === c._id);

        if (props.selectedGroup === 'all') return true;

        if (foundResult) {
            return foundResult.firstMeasurementGroup === props.selectedGroup;
        }

        return false;
    }

    function getFilteredChildrenByFullName(c: Child) {
        const fullName = `${c.firstname} ${c.lastname}`.toLowerCase();

        return fullName.includes(searchTerm.toLowerCase());
    }

    function isAssessmentDisabled() {
        return (
            props.assessment.firstMeasurementStatus !== 'active' || props.assessment.lastMeasurementStatus !== 'active'
        );
    }

    function countResultProgress(childId: string) {
        const foundResult = props.results.find((r) => r.childId === childId);

        if (foundResult) {
            return countProgress(props.measurement, foundResult);
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
