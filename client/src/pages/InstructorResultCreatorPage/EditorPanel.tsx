import { AssessmentValues, ResultCreatorReturnProps } from '@app/pages/InstructorResultCreatorPage/useResultCreator';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { countCurrentPoints } from '@app/pages/InstructorResultCreatorPage/countPoints';
import { Box, createStyles, Divider, Grid, makeStyles, MenuItem, Theme } from '@material-ui/core';
import { ChildHeader } from '@app/pages/InstructorResultCreatorPage/MeasurementEditor/ChildHeader';
import {
    MeasurementEditor,
    MeasurementValues,
} from '@app/pages/InstructorResultCreatorPage/MeasurementEditor/MeasurementEditor';
import { ButtonSecondary } from '@app/components/Button';
import { ActionMenuButtonSecondary } from '@app/components/Button/ActionMenuButtonSecondary';
import { AssessmentParam } from '@app/graphql/types';

interface EditorPanelProps {
    isLoading: boolean;
    measurement: string;
    onClick: (type: string, value: string | AssessmentValues) => void;
    resultCreator: ResultCreatorReturnProps;
}

export function EditorPanel({ resultCreator, measurement, onClick, isLoading }: EditorPanelProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedChild: child } = resultCreator;

    const [localResult, setLocalResult] = useState(resultCreator.values);
    const [localNote, setLocalNote] = useState(getCurrentNote());

    useEffect(() => {
        setLocalResult(resultCreator.values);
    }, [resultCreator.values]);

    useEffect(() => {
        setLocalNote(getCurrentNote() || '');
    }, [resultCreator.values, getCurrentNote()]);

    const pointSum = Object.values(countCurrentPoints(localResult, child.currentParams)).reduce((acc, v) => {
        if (Number.isNaN(v)) return acc;

        return acc + v;
    }, 0);

    const isLastChild = () => {
        if (resultCreator.selectedKindergarten.children?.length) {
            const lastChildIndex = resultCreator.selectedKindergarten.children?.length - 1;

            return resultCreator.selectedChild._id === resultCreator.selectedKindergarten.children[lastChildIndex]._id;
        }

        return false;
    };

    const handleChange = (value: MeasurementValues) => {
        console.log('%c EditorPanel: ', 'color: black; background-color: yellow', {
            localResult,
            value,
            resultCreator,
        });

        setLocalResult((prev) => ({
            ...prev,
            ...value,
        }));
    };

    return (
        <Grid container direction="column" className={classes.editorContainer}>
            <Grid item>
                <ChildHeader
                    description={t(`add-result-page.title-${measurement}-measurement`)}
                    selectedChild={resultCreator.selectedChild}
                    points={pointSum}
                    maxPoints={countMaxPoints()}
                />
            </Grid>

            <Grid item>
                <Divider />
            </Grid>

            <Grid item className={classes.editor}>
                <MeasurementEditor
                    measurement={measurement}
                    note={localNote}
                    onChange={handleChange}
                    onEditClick={resultCreator.edit}
                    onNoteChange={setLocalNote}
                    resultCreator={resultCreator}
                    value={localResult}
                />
            </Grid>

            <Grid item>
                <Divider />
            </Grid>

            <Grid item className={classes.footerContainer}>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Box mr={2}>
                            <ButtonSecondary onClick={() => onClick('back-to-table', '')} variant="text">
                                {t('add-result-page.back-to-table')}
                            </ButtonSecondary>
                        </Box>
                    </Grid>

                    <Grid item>
                        {isLastChild() ? (
                            <ButtonSecondary
                                variant="contained"
                                disabled={isLoading}
                                onClick={() => onClick('save-and-back-to-table', { ...localResult, note: localNote })}
                            >
                                {t('add-result-page.save-and-back-to-table')}
                            </ButtonSecondary>
                        ) : (
                            <ActionMenuButtonSecondary
                                isDisabled={isLoading}
                                label={t('add-result-page.save-and-next')}
                                onClick={() => onClick('save-and-next', { ...localResult, note: localNote })}
                                options={[
                                    <MenuItem
                                        onClick={() =>
                                            onClick('save-and-back-to-table', { ...localResult, note: localNote })
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

    function countMaxPoints(): number {
        return Object.values(resultCreator.selectedChild.currentParams!).reduce((acc: number, v: AssessmentParam) => {
            if (!v || !v.lowerLimitPoints || !v.upperLimitPoints) return acc;

            if (v.lowerLimitPoints > v.upperLimitPoints) {
                return acc + v.lowerLimitPoints;
            }

            return acc + v.upperLimitPoints;
        }, 0) as number;
    }

    function getCurrentNote() {
        const currentResult = getCurrentResult();

        if (!currentResult) return '';

        if (measurement === 'first') {
            return currentResult.firstMeasurementNote;
        }

        return currentResult.lastMeasurementNote;
    }

    function getCurrentResult() {
        return resultCreator.kindergartenResults.find((r) => r.childId === resultCreator.selectedChild._id);
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
