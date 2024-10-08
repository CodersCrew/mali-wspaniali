import { useTranslation } from 'react-i18next';
import { createStyles, Grid, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';

import { Assessment } from '@app/graphql/types';
import { SearchChildField } from '@app/components/SearchChildField';
import { MeasurementEditorActionType } from '@app/pages/InstructorResultCreatorPage/InstructorResultCreatorPage.types';

interface Props {
    assessments: Assessment[];
    selectedAssessment: string;
    selectedKindergarten: string;
    compact?: boolean;
    searchTerm: string;
    onChange: (type: string, value: string) => void;
}

export function ChildListHeader({
    assessments,
    selectedAssessment,
    selectedKindergarten,
    compact,
    searchTerm,
    onChange,
}: Props) {
    const { t } = useTranslation();
    const kindergartens = assessments.find((a) => a._id === selectedAssessment)?.kindergartens || [];
    const classes = useStyles();

    return (
        <div>
            <Grid container direction={compact ? 'column' : 'row'} spacing={3}>
                <Grid item xs={compact ? 12 : 4}>
                    <TextField
                        select
                        label={t('add-results-page.test-name')}
                        onChange={({ target: { value } }) => onChange('assessment', value)}
                        variant="outlined"
                        value={selectedAssessment}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                    >
                        {assessments.map((a) => (
                            <MenuItem value={a._id} key={a.title}>
                                {a.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={compact ? 12 : 4}>
                    <TextField
                        select
                        classes={{ root: classes.selectKindergarten }}
                        label={t('add-results-page.kindergarten-name')}
                        onChange={({ target: { value } }) => onChange(MeasurementEditorActionType.KINDERGARTEN, value)}
                        variant="outlined"
                        value={selectedKindergarten}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                getContentAnchorEl: null,
                                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                            },
                        }}
                    >
                        {kindergartens.map((k) => (
                            <MenuItem value={k.kindergarten?._id} key={k.kindergarten?._id}>
                                <div>
                                    {k.kindergarten?.number}/{k.kindergarten?.name}
                                </div>
                                <div className={classes.helperLabel}>{k.kindergarten?.address}</div>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {!compact && (
                    <Grid item xs={compact ? 12 : 4}>
                        <SearchChildField
                            isCompact={!!compact}
                            searchTerm={searchTerm}
                            onChange={(value) => onChange('searchTerm', value)}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
        selectKindergarten: {
            '& > div': {
                maxHeight: 55,
            },
        },
    }),
);
