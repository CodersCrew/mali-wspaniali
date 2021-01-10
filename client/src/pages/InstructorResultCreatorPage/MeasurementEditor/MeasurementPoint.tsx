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
import { Edit } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../theme/theme';
import { CircleChart } from '../../../components/CircleChart';
import { ButtonSecondary } from '../../../components/Button/ButtonSecondary';
import { useIsDevice } from '../../../queries/useBreakpoints';

interface Props {
    name: string;
    value: number;
    unit: string;
    step: number;
    maxValue: number;
    lowerLimit: number;
    upperLimit: number;
    points: number;
    isEmpty: boolean;
    disabled: boolean;
    onChange: (value: number) => void;
    onClick: () => void;
}

export function MeasurementPoint({
    name,
    value,
    unit,
    step,
    maxValue,
    lowerLimit,
    upperLimit,
    points,
    isEmpty,
    disabled,
    onChange,
    onClick,
}: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useIsDevice();

    const marks = [
        {
            value: Math.floor(lowerLimit - 0.25 * lowerLimit),
            label: Math.floor(lowerLimit - 0.25 * lowerLimit),
        },
        {
            value: lowerLimit,
            label: lowerLimit,
        },
        {
            value: upperLimit,
            label: upperLimit,
        },
        {
            value: Math.floor(upperLimit + 0.25 * upperLimit),
            label: Math.floor(upperLimit + 0.25 * upperLimit),
        },
    ];

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} justify={device.isSmallMobile ? 'space-between' : 'flex-start'}>
                    <Grid item className={classes.editMeasurementButton}>
                        <Typography variant="subtitle1">{name}</Typography>
                    </Grid>
                    <Grid item>
                        {!disabled && (
                            <ButtonSecondary variant="text" onClick={onClick}>
                                <Edit className={classes.editIcon} />
                                {t('add-results-page.edit')}
                            </ButtonSecondary>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={9} sm={6}>
                        <Slider
                            disabled={!disabled}
                            aria-labelledby="discrete-slider-restrict"
                            step={step}
                            valueLabelDisplay="auto"
                            min={Math.floor(lowerLimit - 0.25 * lowerLimit)}
                            value={value}
                            max={Math.floor(upperLimit + 0.25 * upperLimit)}
                            onChange={(_, v) => onChange(v as number)}
                            marks={marks}
                            classes={{
                                mark: classes.mark,
                                track: classes.sliderRoot,
                                rail: classes.sliderRoot,
                                thumb: classes.thumb,
                                valueLabel: classes.valueLabel,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Input
                            disabled={!disabled}
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
                            classes={{ input: classes.input }}
                        />
                        {unit}
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.pieContainer}>
                        <Grid container alignItems="center" spacing={2}>
                            {!device.isSmallMobile && (
                                <Grid item xs={3}>
                                    <CircleChart
                                        color={(theme.palette!.success as SimplePaletteColorOptions).main}
                                        maxValue={maxValue}
                                        value={points}
                                        disable={isEmpty}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={device.isSmallMobile ? 12 : 9}>
                                <Typography variant="body2">
                                    {t('add-result-page.received-points')}{' '}
                                    <strong className={classes.points}>
                                        {isEmpty ? '-' : Math.ceil(points)} {t('add-result-page.points')}
                                    </strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <FormControlLabel
                    checked={isEmpty}
                    disabled={isEmpty}
                    control={<Checkbox color="default" />}
                    label={<Typography variant="body1">{t('add-result-page.no-result')}</Typography>}
                    labelPlacement="end"
                    onChange={() => onChange(0)}
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
        input: {
            fontSize: 20,
        },
        mark: {
            backgroundColor: _theme.palette.divider,
            height: 16,
            width: 1,
            marginTop: -3,
        },
        sliderRoot: {
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            marginTop: -8,
            marginLeft: -8,
        },
        valueLabel: {
            left: 'calc(-50% + 8px)',
            top: -32,
        },
        editMeasurementButton: {
            display: 'flex',
            alignItems: 'center',
        },
        editIcon: {
            width: 18,
            height: 18,
            marginRight: _theme.spacing(1),
        },
    }),
);
