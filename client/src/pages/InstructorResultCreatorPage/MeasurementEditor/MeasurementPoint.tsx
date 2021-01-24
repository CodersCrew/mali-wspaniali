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
    changeDate?: string;
    onChange: (value: number) => void;
    onClick: () => void;
}

export function MeasurementPoint(props: Props) {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useIsDevice();

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} justify={device.isSmallMobile ? 'space-between' : 'flex-start'}>
                    <Grid item className={classes.editMeasurementButton}>
                        <Typography variant="subtitle1">{props.name}</Typography>&nbsp;
                        {props.changeDate && <Typography variant="overline">({props.changeDate})</Typography>}
                    </Grid>
                    <Grid item>
                        {!props.disabled && (
                            <ButtonSecondary variant="text" onClick={props.onClick}>
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
                            disabled={!props.disabled}
                            aria-labelledby="discrete-slider-restrict"
                            step={props.step}
                            valueLabelDisplay="auto"
                            min={Math.floor(props.lowerLimit - 0.25 * props.lowerLimit)}
                            value={props.value}
                            max={Math.floor(props.upperLimit + 0.25 * props.upperLimit)}
                            onChange={(_, v) => props.onChange(v as number)}
                            marks={getMarks()}
                            classes={{
                                mark: classes.mark,
                                track: classes.sliderRoot,
                                rail: classes.sliderRoot,
                                thumb: classes.thumb,
                                valueLabel: classes.valueLabel,
                                disabled: classes.sliderDisabled,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Input
                                    disabled={!props.disabled}
                                    value={props.value}
                                    margin="dense"
                                    fullWidth
                                    onChange={({ target: { value: v } }) => props.onChange(parseFloat(v))}
                                    inputProps={{
                                        step: props.step,
                                        min: 0,
                                        max: props.maxValue,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                    classes={{ input: classes.input }}
                                />
                            </Grid>
                            <Grid item xs={4} className={classes.unit}>
                                <span>{props.unit}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} className={classes.pieContainer}>
                        <Grid container alignItems="center" spacing={2}>
                            {!device.isSmallMobile && (
                                <Grid item xs={3}>
                                    <CircleChart
                                        color={(theme.palette!.success as SimplePaletteColorOptions).main}
                                        maxValue={props.maxValue}
                                        value={props.points}
                                        disable={props.isEmpty}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={device.isSmallMobile ? 12 : 9}>
                                <Typography variant="body2">
                                    {t('add-result-page.received-points')}{' '}
                                    <strong className={classes.points}>
                                        {props.isEmpty ? '-' : Math.ceil(props.points)} {t('add-result-page.points')}
                                    </strong>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <FormControlLabel
                    checked={props.isEmpty}
                    disabled={props.isEmpty}
                    control={<Checkbox color="default" />}
                    label={<Typography variant="body1">{t('add-result-page.no-result')}</Typography>}
                    labelPlacement="end"
                    onChange={() => props.onChange(0)}
                />
            </Grid>
        </Grid>
    );

    function getMarks() {
        const marks = [
            {
                value: Math.floor(props.lowerLimit - 0.25 * props.lowerLimit),
                label: Math.floor(props.lowerLimit - 0.25 * props.lowerLimit),
            },
            {
                value: props.lowerLimit,
                label: props.lowerLimit,
            },
            {
                value: props.upperLimit,
                label: props.upperLimit,
            },
            {
                value: Math.floor(props.upperLimit + 0.25 * props.upperLimit),
                label: Math.floor(props.upperLimit + 0.25 * props.upperLimit),
            },
        ];

        return marks;
    }
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
        sliderDisabled: {
            '& span[role=slider]': {
                width: 16,
                height: 16,
                marginTop: -4,
                marginLeft: -8,
            },
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
        unit: {
            display: 'flex',
            alignItems: 'flex-end',
        },
    }),
);
