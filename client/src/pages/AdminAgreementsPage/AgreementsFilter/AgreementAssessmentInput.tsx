import { FormControl, InputLabel, Select, MenuItem, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { AssessmentTitle } from '../../../graphql/types';
import { FilterMenuProps } from './FilterMenuProps';


interface Props {
    value: string;
    assessments: AssessmentTitle[];
    onChange: (type: string, value: string) => void;
}

export function AgreementAssessmentInput({ value: currentValue, assessments, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{t('agreements-filter.by-assessment')}</InputLabel>
            <Select
                label={t('agreements-filter.by-assessment')}
                value={currentValue}
                onChange={({ target: { name, value } }) => onChange(name as string, value as string)}
                fullWidth
                inputProps={{
                    name: 'ASSESSMENT',
                    id: 'age-native-simple',
                }}
                MenuProps={FilterMenuProps}
            >
                {assessments.map(assessment =>
                    <MenuItem key={assessment.title} value={assessment.title}>
                        {assessment.title}
                    </MenuItem>)
                }
            </Select>
        </FormControl>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: 'flex',
            marginBottom: theme.spacing(2),
            minWidth: 160,
            flex: 1,
        },
    }),
);