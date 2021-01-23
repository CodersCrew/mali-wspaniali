import React from 'react';
import { createStyles, Divider, Grid, Paper, makeStyles, MenuItem, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ResultCreatorReturnProps } from './useResultCreator';
import { ChildPickerDrawer } from './ChildPicker/ChildPickerDrawer';
import { ChildHeader } from './MeasurementEditor/ChildHeader';
import { MeasurementEditor } from './MeasurementEditor/MeasurementEditor';
import { ButtonSecondary } from '../../components/Button';
import { ActionMenuButtonSecondary } from '../../components/Button/ActionMenuButtonSecondary';

interface Props {
    value: ResultCreatorReturnProps;
    measurement: string;
    onClick: (type: string, value: string) => void;
}

export function MobileResultCreator({ value: resultCreator, measurement, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const points = Object.values(resultCreator.points).reduce((acc, v) => acc + v, 0);

    return (
        <Paper>
            <Grid container className={classes.container} direction="column">
                <Grid item>
                    <ChildPickerDrawer
                        selectedKindergarten={resultCreator.selectedKindergarten._id || ''}
                        kindergartens={resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || []}
                        selected={resultCreator.selectedChild._id}
                        measurement={measurement}
                        childList={resultCreator.selectedKindergarten.children || []}
                        onClick={onClick}
                    />
                </Grid>
                <Grid item>
                    <ChildHeader
                        description={t(`add-result-page.title-${measurement}-measurement`)}
                        selectedChild={resultCreator.selectedChild}
                        points={points}
                        maxPoints={countMaxPoints()}
                    />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item className={classes.editor}>
                    <MeasurementEditor
                        child={resultCreator.selectedChild}
                        values={resultCreator.values}
                        points={resultCreator.points}
                        edited={resultCreator.edited}
                        measurement={measurement}
                        result={resultCreator.kindergartenResults.find(
                            (r) => r.childId === resultCreator.selectedChild._id,
                        )}
                        onChange={resultCreator.onChange}
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
                                    onClick={() => onClick('save-and-next', '')}
                                    options={[
                                        <MenuItem
                                            key="add-result-page.save-and-back-to-table"
                                            onClick={() => onClick('back-to-table', '')}
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
            zIndex: 3000,
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
