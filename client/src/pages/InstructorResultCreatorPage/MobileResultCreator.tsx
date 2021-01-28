import React from 'react';
import { createStyles, Divider, Grid, Paper, makeStyles, MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ResultCreatorReturnProps, AssessmentValues } from './useResultCreator';
import { ChildPickerDrawer } from './ChildPicker/ChildPickerDrawer';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';
import { ButtonSecondary } from '../../components/Button';
import { ActionMenuButtonSecondary } from '../../components/Button/ActionMenuButtonSecondary';
import { countCurrentPoints } from './countPoints';

interface Props {
    value: ResultCreatorReturnProps;
    measurement: string;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

export function MobileResultCreator({ value: resultCreator, measurement, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedChild: child } = resultCreator;

    const [localResult, setLocalResult] = React.useState(resultCreator.values);

    React.useEffect(() => {
        setLocalResult(resultCreator.values);
    }, [resultCreator.values]);

    const pointSum = Object.values(countCurrentPoints(localResult, child)).reduce((acc, v) => acc + v, 0);

    return (
        <Paper>
            <Grid container className={classes.container} direction="column">
                <Grid item>
                    <ChildPickerDrawer
                        selectedKindergarten={resultCreator.selectedKindergarten._id || ''}
                        kindergartens={resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || []}
                        selected={child._id}
                        measurement={measurement}
                        childList={resultCreator.selectedKindergarten.children || []}
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
                        value={localResult}
                        resultCreator={resultCreator}
                        measurement={measurement}
                        onChange={(value) => {
                            setLocalResult((prev) => ({
                                ...prev,
                                ...value,
                            }));
                        }}
                        onEditClick={resultCreator.edit}
                    />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item className={classes.footer}>
                    <Paper className={classes.footerPaper}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Box mr={2}>
                                    <ButtonSecondary variant="text" onClick={() => onClick('back-to-table', '')}>
                                        {t('add-result-page.back-to-table')}
                                    </ButtonSecondary>
                                </Box>
                            </Grid>
                            <Grid item>
                                <ActionMenuButtonSecondary
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
                        </Grid>
                    </Paper>
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
}

const useStyles = makeStyles(() =>
    createStyles({
        editor: {
            flex: '1 1 auto',
            height: 0,
            overflowY: 'auto',
            paddingBottom: 56,
        },
        container: {
            maxHeight: '85vh',
            height: '85vh',
            marginTop: 10,
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            height: 56,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1300,
        },
        footerPaper: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            paddingRight: 16,
        },
    }),
);
