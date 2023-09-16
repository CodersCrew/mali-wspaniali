import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Kindergarten } from '@app/graphql/types';
import { ChildPicker } from './ChildPicker/ChildPicker';
import { ResultCreatorReturnProps, AssessmentValues } from './useResultCreator';
import { EditorPanel } from './EditorPanel';

interface Props {
    resultCreator: ResultCreatorReturnProps;
    measurement: string;
    isLoading: boolean;
    onClick: (type: string, value: string | AssessmentValues) => void;
}

export function ResultCreator({ resultCreator, measurement, onClick, isLoading }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    const { selectedGroup, selectedAssessment, kindergartenResults, selectedKindergarten, selectedChild } =
        resultCreator;

    const kindergartens = selectedAssessment.kindergartens.map((k) => k.kindergarten) || [];
    const childList = selectedKindergarten.children ?? [];
    const selectedKindergartenId = selectedKindergarten._id;
    const selectedChildId = selectedChild._id;

    return (
        <Paper>
            <Grid container className={classes.container}>
                <Grid item xs={4} className={classes.childPickerContainer}>
                    <Paper classes={{ root: classes.childPickerPaper }}>
                        <ChildPicker
                            assessment={selectedAssessment}
                            childList={childList}
                            header={<Typography variant="h4">{t('add-result-page.kindergarten')}</Typography>}
                            kindergartens={kindergartens.filter((k) => !!k) as Kindergarten[]}
                            measurement={measurement}
                            onClick={onClick}
                            results={kindergartenResults}
                            selected={selectedChildId}
                            selectedGroup={selectedGroup}
                            selectedKindergarten={selectedKindergartenId}
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);
