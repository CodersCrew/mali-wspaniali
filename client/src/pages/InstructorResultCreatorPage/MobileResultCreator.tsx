import React from 'react';
import { createStyles, Divider, Grid, Paper, makeStyles, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ButtonSecondary } from '../../components/Button';
import { ActionMenuButtonSecondary } from '../../components/Button/ActionMenuButtonSecondary';
import { countCurrentPoints } from './countPoints';
import { ResultCreatorReturnProps, AssessmentValues } from './useResultCreator';
import { ChildPickerDrawer } from './ChildPicker/ChildPickerDrawer';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';

interface Props {
    resultCreator: ResultCreatorReturnProps;
    measurement: string;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

export function MobileResultCreator({ resultCreator, measurement, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedChild: child } = resultCreator;

    const [localResult, setLocalResult] = React.useState(resultCreator.values);
    const [localNote, setLocalNote] = React.useState(getCurrentNote() || '');

    React.useEffect(() => {
        setLocalResult(resultCreator.values);
    }, [resultCreator.values, getCurrentNote()]);

    const pointSum = Object.values(countCurrentPoints(localResult, child.currentParams)).reduce((acc, v) => {
        if (Number.isNaN(v)) return acc;

        return acc + v;
    }, 0);

    return (
        <Paper>
            <Grid container className={classes.container} direction="column">
                <Grid item>
                    <ChildPickerDrawer
                        selectedKindergarten={resultCreator.selectedKindergarten?._id || ''}
                        kindergartens={
                            resultCreator.selectedAssessment.kindergartens
                                .filter((k) => !!k.kindergarten)
                                .map((k) => k.kindergarten!) || []
                        }
                        selected={child._id}
                        measurement={measurement}
                        childList={resultCreator.selectedKindergarten?.children || []}
                        resultCreator={resultCreator}
                        onClick={onClick}
                    />
                </Grid>
                <Grid item>
                    <ChildHeader
                        description={t(`add-result-page.title-${measurement}-measurement`)}
                        selectedChild={child}
                        points={pointSum}
                        maxPoints={countMaxPoints()}
                    />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item className={classes.editor}>
                    <MeasurementEditor
                        note={localNote}
                        value={localResult}
                        resultCreator={resultCreator}
                        measurement={measurement}
                        onChange={(value) => {
                            setLocalResult((prev) => ({
                                ...prev,
                                ...value,
                            }));
                        }}
                        onNoteChange={setLocalNote}
                        onEditClick={resultCreator.edit}
                    />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item className={classes.footer}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item classes={{ root: classes.footerButton }}>
                            <ActionMenuButtonSecondary
                                style={{ width: '100%' }}
                                label={t('add-result-page.save-and-next')}
                                onClick={() => onClick('save-and-next', localResult)}
                                options={[
                                    <MenuItem
                                        key="add-result-page.save-and-back-to-table"
                                        onClick={() => onClick('save-and-back-to-table', localResult)}
                                    >
                                        {t('add-result-page.save-and-back-to-table')}
                                    </MenuItem>,
                                ]}
                            />
                        </Grid>
                        <Grid item classes={{ root: classes.footerButton }}>
                            <ButtonSecondary
                                style={{ width: '100%' }}
                                size="medium"
                                variant="text"
                                onClick={() => onClick('back-to-table', '')}
                            >
                                {t('add-result-page.back-to-table')}
                            </ButtonSecondary>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );

    function countMaxPoints() {
        return Object.values(resultCreator.selectedChild!.currentParams!).reduce((acc, v) => {
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

        if (measurement === 'first') {
            return currentResult.firstMeasurementNote;
        }

        return currentResult.lastMeasurementNote;
    }

    function getCurrentResult() {
        return resultCreator.kindergartenResults.find((r) => r.childId === resultCreator.selectedChild._id);
    }
}

const useStyles = makeStyles((theme) =>
    createStyles({
        editor: {
            flex: '1 1 auto',
            height: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingBottom: theme.spacing(10),
        },
        container: {
            maxHeight: '85vh',
            height: '85vh',
        },
        footer: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 800,
            padding: theme.spacing(1, 2),
            backgroundColor: theme.palette.primary.contrastText,
        },
        footerButton: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
    }),
);
