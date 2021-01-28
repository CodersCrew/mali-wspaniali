import React from 'react';
import { Box, createStyles, Divider, Grid, makeStyles, MenuItem, Paper, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ChildPicker } from './ChildPicker/ChildPicker';
import { ResultCreatorReturnProps, AssessmentValues } from './useResultCreator';
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

export function ResultCreator({ value: resultCreator, measurement, onClick }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const kindergartens = resultCreator.selectedAssessment.kindergartens.map((k) => k.kindergarten) || [];
    const childList = resultCreator.selectedKindergarten.children || [];
    const selectedKindergarten = resultCreator.selectedKindergarten._id || '';
    const selectedChild = resultCreator.selectedChild._id;

    return (
        <Paper>
            <Grid container className={classes.container}>
                <Grid item xs={4} className={classes.childPickerContainer}>
                    <Paper>
                        <ChildPicker
                            header={<Typography variant="h4">{t('add-result-page.kindergarten')}</Typography>}
                            selectedKindergarten={selectedKindergarten}
                            kindergartens={kindergartens}
                            selected={selectedChild}
                            measurement={measurement}
                            childList={childList}
                            onClick={onClick}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <EditorPanel measurement={measurement} onClick={onClick} resultCreator={resultCreator} />
                </Grid>
            </Grid>
        </Paper>
    );
}

interface EditorPanelProps {
    measurement: string;
    resultCreator: ResultCreatorReturnProps;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

function EditorPanel(props: EditorPanelProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedChild: child } = props.resultCreator;

    const [localResult, setLocalResult] = React.useState(props.resultCreator.values);

    React.useEffect(() => {
        setLocalResult(props.resultCreator.values);
    }, [props.resultCreator.values]);

    const pointSum = Object.values(countCurrentPoints(localResult, child)).reduce((acc, v) => acc + v, 0);

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
                    onChange={(value) => {
                        setLocalResult((prev) => ({
                            ...prev,
                            ...value,
                        }));
                    }}
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
                        <ActionMenuButtonSecondary
                            label={t('add-result-page.save-and-next')}
                            onClick={() => props.onClick('save-and-next', localResult)}
                            options={[
                                <MenuItem
                                    onClick={() => props.onClick('back-to-table', localResult)}
                                    key="add-result-page.save-and-back-to-table"
                                >
                                    {t('add-result-page.save-and-back-to-table')}
                                </MenuItem>,
                            ]}
                        />
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
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        editor: {
            flex: '1 1 auto',
            height: 0,
            overflowY: 'auto',
        },
        container: {
            maxHeight: '85vh',
            height: '85vh',
        },
        childPickerContainer: {
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: '100%',
            paddingRight: 2,
        },
        editorContainer: {
            height: '100%',
        },
        footerContainer: {
            display: 'flex',
            alignItems: 'center',
            height: 56,
            padding: theme.spacing(1),
        },
    }),
);
