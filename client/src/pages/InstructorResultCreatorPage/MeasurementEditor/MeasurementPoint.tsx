import React from 'react';
import {
    createStyles,
    Grid,
    Input,
    makeStyles,
    Slider,
    Theme,
    Checkbox,
    Typography,
    FormControlLabel,
    SimplePaletteColorOptions,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../theme/theme';
import { CircleChart } from '../../../components/CircleChart';

interface Props {
    name: string;
    value: number;
    unit: string;
    maxValue: number;
    isEmpty: boolean;
    onChange: (value: number) => void;
}

export function MeasurementPoint({ name, value, unit, maxValue, isEmpty, onChange }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Typography variant="subtitle1">{name}</Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Slider
                            aria-labelledby="discrete-slider-restrict"
                            step={1}
                            valueLabelDisplay="auto"
                            min={0}
                            value={value}
                            max={maxValue}
                            onChange={(_, v) => onChange(v as number)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Input
                            value={value}
                            margin="dense"
                            onChange={({ target: { value: v } }) => onChange(parseInt(v, 10))}
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: maxValue,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                        {unit}
                    </Grid>
                    <Grid item xs={4} className={classes.pieContainer}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={3}>
                                <CircleChart
                                    color={(theme.palette!.success as SimplePaletteColorOptions).main}
                                    maxValue={maxValue}
                                    value={value}
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body2">
                                    {t('add-result-page.received-points')}{' '}
                                    <strong className={classes.points}>
                                        {value} {t('add-result-page.points')}
                                    </strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <FormControlLabel
                    value={isEmpty}
                    control={<Checkbox color="default" />}
                    label={<Typography variant="body1">{t('add-result-page.no-result')}</Typography>}
                    labelPlacement="end"
                />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        pieContainer: {
            width: _theme.spacing(8),
            height: _theme.spacing(8),
        },
        points: {
            color: _theme.palette.success.main,
        },
    }),
);
