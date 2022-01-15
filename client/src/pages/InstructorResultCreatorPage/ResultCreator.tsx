import { useState, useEffect } from 'react';
import { Box, createStyles, Divider, Grid, makeStyles, MenuItem, Paper, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../components/Button';
import { ActionMenuButtonSecondary } from '../../components/Button/ActionMenuButtonSecondary';
import { Kindergarten } from '../../graphql/types';
import { ChildPicker } from './ChildPicker/ChildPicker';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';
import { ResultCreatorReturnProps, AssessmentValues } from './useResultCreator';
import { countCurrentPoints } from './countPoints';

interface Props {
    resultCreator: ResultCreatorReturnProps;
    measurement: string;
    isLoading: boolean;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

export function ResultCreator({ resultCreator, measurement, onClick, isLoading }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const kindergartens = resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || [];
    const childList = resultCreator.selectedKindergarten.children ?? [];
    const selectedKindergarten = resultCreator.selectedKindergarten._id;
    const selectedChild = resultCreator.selectedChild._id;
    const { selectedGroup } = resultCreator;

    return (
        <Paper>
            <Grid container className={classes.container}>
                <Grid item xs={4} className={classes.childPickerContainer}>
                    <Paper classes={{ root: classes.childPickerPaper }}>
                        <ChildPicker
                            header={<Typography variant="h4">{t('add-result-page.kindergarten')}</Typography>}
                            selectedKindergarten={selectedKindergarten}
                            selectedGroup={selectedGroup}
                            kindergartens={kindergartens.filter((k) => !!k) as Kindergarten[]}
                            selected={selectedChild}
                            measurement={measurement}
                            results={resultCreator.kindergartenResults}
                            childList={childList}
                            assessment={resultCreator.selectedAssessment}
                            onClick={onClick}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <EditorPanel {...{ resultCreator, measurement, onClick, isLoading }} />
                </Grid>
            </Grid>
        </Paper>
    );
}

interface EditorPanelProps {
    measurement: string;
    resultCreator: ResultCreatorReturnProps;
    isLoading: boolean;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

function EditorPanel(props: EditorPanelProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedChild: child } = props.resultCreator;

    const [localResult, setLocalResult] = useState(props.resultCreator.values);
    const [localNote, setLocalNote] = useState(getCurrentNote());

    useEffect(() => {
        setLocalResult(props.resultCreator.values);
    }, [props.resultCreator.values]);

    useEffect(() => {
        setLocalNote(getCurrentNote() || '');
    }, [props.resultCreator.values, getCurrentNote()]);

    const pointSum = Object.values(countCurrentPoints(localResult, child.currentParams)).reduce((acc, v) => {
        if (Number.isNaN(v)) return acc;

        return acc + v;
    }, 0);

    const isLastChild = () => {
        if (props.resultCreator.selectedKindergarten.children?.length) {
            const lastChildIndex = props.resultCreator.selectedKindergarten.children?.length - 1;

            if (
                props.resultCreator.selectedChild._id ===
                props.resultCreator.selectedKindergarten.children[lastChildIndex]._id
            )
                return true;
        }

        return false;
    };

    return (
        <Grid container direction="column" className={classes.editorContainer}>
            <Grid item>
                <ChildHeader
                    description={t(`add-result-page.title-${props.measurement}-measurement`)}
                    selectedChild={props.resultCreator.selectedChild}
                    points={pointSum}
                    maxPoints={countMaxPoints()}
                />
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid item className={classes.editor}>
                <MeasurementEditor
                    measurement={props.measurement}
                    resultCreator={props.resultCreator}
                    value={localResult}
                    note={localNote}
                    onChange={(value) => {
                        setLocalResult((prev) => ({
                            ...prev,
                            ...value,
                        }));
                    }}
                    onNoteChange={setLocalNote}
                    onEditClick={props.resultCreator.edit}
                />
            </Grid>
            <Grid item>
                <Divider />
            </Grid>
            <Grid item className={classes.footerContainer}>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Box mr={2}>
                            <ButtonSecondary onClick={() => props.onClick('back-to-table', '')} variant="text">
                                {t('add-result-page.back-to-table')}
                            </ButtonSecondary>
                        </Box>
                    </Grid>
                    <Grid item>
                        {isLastChild() ? (
                            <ButtonSecondary
                                variant="contained"
                                disabled={props.isLoading}
                                onClick={() =>
                                    props.onClick('save-and-back-to-table', { ...localResult, note: localNote })
                                }
                            >
                                {t('add-result-page.save-and-back-to-table')}
                            </ButtonSecondary>
                        ) : (
                            <ActionMenuButtonSecondary
                                isDisabled={props.isLoading}
                                label={t('add-result-page.save-and-next')}
                                onClick={() => props.onClick('save-and-next', { ...localResult, note: localNote })}
                                options={[
                                    <MenuItem
                                        onClick={() =>
                                            props.onClick('save-and-back-to-table', { ...localResult, note: localNote })
                                        }
                                        key="add-result-page.save-and-back-to-table"
                                    >
                                        {t('add-result-page.save-and-back-to-table')}
                                    </MenuItem>,
                                ]}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    function countMaxPoints() {
        return Object.values(props.resultCreator.selectedChild!.currentParams!).reduce((acc, v) => {
            if (!v || !v.lowerLimitPoints || !v.upperLimitPoints) return acc;

            if (v.lowerLimitPoints > v.upperLimitPoints) {
                return acc + v.lowerLimitPoints;
            }

            return acc + v.upperLimitPoints;
        }, 0);
    }

    function getCurrentNote() {
        const currentResult = getCurrentResult();

        if (!currentResult) return '';

        if (props.measurement === 'first') {
            return currentResult.firstMeasurementNote;
        }

        return currentResult.lastMeasurementNote;
    }

    function getCurrentResult() {
        return props.resultCreator.kindergartenResults.find((r) => r.childId === props.resultCreator.selectedChild._id);
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editor: {
            flex: '1 1 auto',
            height: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
        },
        container: {
            maxHeight: '85vh',
            height: '85vh',
        },
        childPickerContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            paddingRight: 2,
        },
        childPickerPaper: {
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
        },
        editorContainer: {
            height: '100%',
        },
        footerContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1, 2),
        },
    }),
);
