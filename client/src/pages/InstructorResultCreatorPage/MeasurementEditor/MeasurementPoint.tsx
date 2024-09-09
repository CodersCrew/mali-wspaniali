import { memo } from 'react';
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
} from '@material-ui/core';
import { Edit, AddCircle as Add } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { CircleChart } from '@app/components/CircleChart';
import { ButtonSecondary } from '@app/components/Button';
import { useIsDevice } from '@app/queries/useBreakpoints';
import { AssessmentParam } from '@app/graphql/types';

// eslint-disable-next-line no-shadow
export enum Origin {
    INPUT = 'input',
    CHECKBOX = 'checkbox',
    SLIDER = 'slider',
}

interface Props {
    changeDate?: string;
    color: string;
    disabled: boolean;
    isEmpty: boolean;
    label: string;
    maxValue: number;
    onChange: (value: string, origin: Origin) => void;
    onClick: () => void;
    param: AssessmentParam;
    points: number;
    step: number;
    unit: string;
    value: number;
}

export const MeasurementPoint = memo((props: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const device = useIsDevice();

    const SelectButton = props.isEmpty ? AddButton : EditButton;

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} justifyContent={device.isSmallMobile ? 'space-between' : 'flex-start'}>
                    <Grid item className={classes.editMeasurementButton}>
                        <Typography variant="subtitle1">{props.label}</Typography>&nbsp;
                        {props.changeDate && <Typography variant="overline">({props.changeDate})</Typography>}
                    </Grid>

                    <Grid item>{<SelectButton disabled={props.disabled} onClick={props.onClick} />}</Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container spacing={2}>
                    <Grid item xs={9} sm={6}>
                        <Slider
                            aria-labelledby="discrete-slider-restrict"
                            classes={{
                                mark: classes.mark,
                                track: classes.sliderRoot,
                                rail: classes.sliderRoot,
                                thumb: classes.thumb,
                                valueLabel: classes.valueLabel,
                                disabled: classes.sliderDisabled,
                            }}
                            disabled={!props.disabled}
                            marks={getMarks()}
                            max={Math.floor(props.param.upperLimit + 0.25 * props.param.upperLimit)}
                            min={Math.floor(props.param.lowerLimit - 0.25 * props.param.lowerLimit)}
                            onChange={handleSliderChange}
                            step={props.step}
                            value={props.value}
                            valueLabelDisplay="auto"
                        />
                    </Grid>

                    <Grid item xs={3} sm={2}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Input
                                    classes={{ input: classes.input }}
                                    disabled={!props.disabled}
                                    fullWidth
                                    inputProps={{
                                        'aria-labelledby': 'input-slider',
                                        max: props.maxValue,
                                        min: 0,
                                        step: props.step,
                                        type: 'text',
                                    }}
                                    margin="dense"
                                    onChange={handleInputChange}
                                    value={props.value}
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
                                        color={props.color}
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
                                        {props.isEmpty || Number.isNaN(props.points) ? '-' : Math.ceil(props.points)}{' '}
                                        {t('add-result-page.points')}
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
                    onChange={() => props.onChange('0', Origin.CHECKBOX)}
                />
            </Grid>
        </Grid>
    );

    function handleInputChange(event: { target: { value: string } }) {
        const v = event.target.value;
        const vv = v
            .replace(/[^\d.]/g, '')
            .replace(/,/g, '.')
            .replace(/\.\./g, '.')
            .replace(/(\.\d{1})\d*/g, '$1');

        return props.onChange(vv, Origin.INPUT);
    }

    function handleSliderChange(_: React.ChangeEvent<{}>, v: number | number[]) {
        const value = (v as number).toFixed(1);

        return props.onChange(value, Origin.SLIDER);
    }

    function getMarks() {
        const { lowerLimit, upperLimit } = props.param;
        const margin = 0.25;

        return [
            {
                value: Math.floor((1 - margin) * lowerLimit),
                label: Math.floor((1 - margin) * lowerLimit),
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
                value: Math.floor((1 + margin) * upperLimit),
                label: Math.floor((1 + margin) * upperLimit),
            },
        ];
    }
});

interface SelectButtonProps {
    disabled: boolean;
    onClick: () => void;
}

function AddButton(props: SelectButtonProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <ButtonSecondary disabled={props.disabled} variant="text" onClick={props.onClick}>
            <Add className={classes.editIcon} />
            {t('add-results-page.add')}
        </ButtonSecondary>
    );
}

function EditButton(props: SelectButtonProps) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <ButtonSecondary disabled={props.disabled} variant="text" onClick={props.onClick}>
            <Edit className={classes.editIcon} />
            {t('add-results-page.edit')}
        </ButtonSecondary>
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
            cursor: 'default',
            userSelect: 'none',
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
