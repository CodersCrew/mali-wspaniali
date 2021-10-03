import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    makeStyles,
    Theme,
    createStyles,
    Card,
    CardHeader,
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Button,
} from '@material-ui/core';
import { AssessmentResult, Child, Group } from '../../../graphql/types';
import {
    UpdatedAssessmentInput,
    useUpdateAssessmentResult,
} from '../../../operations/mutations/Results/updateAssessmentResult';
import { useCreateAssessmentResult } from '../../../operations/mutations/Results/createAssessmentResult';
import { useAssessmentResults } from '../../../operations/queries/Results/getAssessmentResults';

interface GroupsTransferListProps {
    group: Group;
    childrenList: Child[];
    results: AssessmentResult[];
    assessmentId: string;
}

export function GroupsTransferList(props: GroupsTransferListProps) {
    const classes = useStyles();
    const { t } = useTranslation();
    const [checked, setChecked] = React.useState<string[]>([]);
    const { createAssessmentResult } = useCreateAssessmentResult();
    const { updateAssessmentResult } = useUpdateAssessmentResult();
    const { refetchResults } = useAssessmentResults(props.group.kindergartenId, props.assessmentId);
    const [isActionPending, setIsActionPending] = React.useState(false);

    const handleToggle = (value: Child) => () => {
        if (checked.includes(value._id)) {
            setChecked(checked.filter((i) => i !== value._id));
        } else {
            setChecked([...checked, value._id]);
        }
    };

    const numberOfChecked = (items: Child[]) => {
        const selectedItems = items.filter((i) => checked.includes(i._id));

        return selectedItems.length;
    };

    const handleToggleAll = (items: Child[]) => () => {
        if (checked.length === items.length && checked.length > 0) {
            setChecked([]);
        } else {
            setChecked(items.map((i) => i._id));
        }
    };

    const handleCheckedRight = () => {
        setIsActionPending(true);
        Promise.all(
            checked.map((c) => createOrUpdateResult({ childId: c, firstMeasurementGroup: props.group.group })),
        ).then(() => {
            setTimeout(() => {
                refetchResults()?.then(() => {
                    setChecked([]);
                    setIsActionPending(false);
                });
            }, 2000);
        });
    };

    const handleCheckedLeft = () => {
        setIsActionPending(true);
        Promise.all(checked.map((c) => createOrUpdateResult({ childId: c, firstMeasurementGroup: '' }))).then(() => {
            setTimeout(() => {
                refetchResults()?.then(() => {
                    setChecked([]);
                    setIsActionPending(false);
                });
            }, 2000);
        });
    };
    const customList = (title: React.ReactNode, items: Child[]) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{ 'aria-label': 'all items selected' }}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} zaznaczonych`}
            />
            <Divider />
            <List className={classes.list} dense component="div" role="list">
                {items.map((value: Child) => {
                    const labelId = `transfer-list-all-item-${value}-label`;

                    return (
                        <ListItem
                            key={value._id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                            disabled={isActionPending}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value._id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.firstname} ${value.lastname}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
    );

    return (
        <Grid container spacing={2} justify="space-around" alignItems="center" className={classes.root}>
            <Grid item>{customList(t('groupsModal.unassigned'), getLeft(props.childrenList))}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={checked.length === 0 || getLeft(props.childrenList).length === 0 || isActionPending}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={checked.length === 0 || getRight(props.childrenList).length === 0 || isActionPending}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(props.group.group, getRight(props.childrenList))}</Grid>
        </Grid>
    );

    function getRight(children: Child[]): Child[] {
        return children.filter((c) => {
            const result = props.results.find((r) => r.childId === c._id);

            if (!result) return false;

            if (result.firstMeasurementGroup === props.group.group) {
                return true;
            }

            return false;
        });
    }

    function getLeft(children: Child[]): Child[] {
        return children.filter((c) => {
            const result = props.results.find((r) => r.childId === c._id);

            if (!result || result.firstMeasurementGroup === '') return true;

            return false;
        });
    }

    function createOrUpdateResult(update: Partial<UpdatedAssessmentInput>) {
        const options = { kindergartenId: props.group.kindergartenId, assessmentId: props.assessmentId };

        const childResult = props.results.find((r) => r.childId === update.childId);

        if (childResult) {
            return updateAssessmentResult({ _id: childResult._id, ...options, ...update });
        }

        return createAssessmentResult({ ...options, ...update });
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 'auto',
        },
        cardHeader: {
            padding: theme.spacing(1, 2),
        },
        list: {
            width: 306,
            height: 'fit-content',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
        },
        button: {
            margin: theme.spacing(0.5, 0),
        },
    }),
);
