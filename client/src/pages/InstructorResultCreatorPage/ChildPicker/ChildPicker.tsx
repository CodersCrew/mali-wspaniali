import { ReactNode, useState } from 'react';
import { List, MenuItem, Divider, createStyles, makeStyles, Theme, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '@app/components/CustomContainer';
import { SelectList } from '@app/components/SelectList';
import { SearchChildField } from '@app/components/SearchChildField';
import { Assessment, Child, Kindergarten, AssessmentResult } from '@app/graphql/types';
import { countProgress } from '../countProgress';
import { ChildItem } from './ChildItem';

interface ChildPickerProps {
    assessment: Assessment;
    childList: Child[];
    header: ReactNode;
    kindergartens: Kindergarten[];
    measurement: string;
    onClick: (type: string, value: string) => void;
    results: AssessmentResult[];
    selected?: string;
    selectedGroup: string;
    selectedKindergarten: string;
}

export function ChildPicker({
    assessment,
    childList,
    header,
    kindergartens,
    measurement,
    onClick,
    results,
    selected,
    selectedGroup,
    selectedKindergarten,
}: ChildPickerProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const availableGroups = [
        { group: 'all', label: t('add-result-page.all-groups'), kindergartenId: selectedKindergarten },
        ...assessment.groups
            .filter((g) => g.kindergartenId === selectedKindergarten)
            .map((g) => ({ ...g, label: g.group })),
    ];

    return (
        <CustomContainer
            header={header}
            container={
                <>
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
                            <SelectList
                                value={selectedGroup}
                                label={t('add-result-page.select-group')}
                                items={availableGroups.map((g) => (
                                    <MenuItem key={g.group} value={g.group}>
                                        {g.label}
                                    </MenuItem>
                                ))}
                                onSelect={(value) => onClick('group', value)}
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

                        {getFilteredChildren().map((c) => {
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
                </>
            }
            disableShadow
        />
    );

    function getFilteredChildren() {
        const fullName = (firstName: string, lastName: string) => {
            return `${lastName}, ${firstName}`;
        };

        const filteredChildren = childList.filter((c) => {
            return getFilteredChildrenByFullName(c) && getFilteredByGroup(c);
        });

        // Sort by last name, first name as default
        return filteredChildren.sort((a, b) => {
            const fullNameA = fullName(a.firstname, a.lastname);
            const fullNameB = fullName(b.firstname, b.lastname);

            return fullNameA > fullNameB ? 1 : -1;
        });
    }

    function getFilteredByGroup(c: Child) {
        const foundResult = results.find((r) => r.childId === c._id);

        if (selectedGroup === 'all') return true;

        if (foundResult) {
            return foundResult.firstMeasurementGroup === selectedGroup;
        }

        return false;
    }

    function getFilteredChildrenByFullName(c: Child) {
        const fullName = `${c.lastname}, ${c.firstname}`.toLowerCase();

        return fullName.includes(searchTerm.toLowerCase());
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
