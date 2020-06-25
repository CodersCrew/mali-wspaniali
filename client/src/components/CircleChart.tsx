import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles';

interface CircleChartProps {
    mainColor: string;
    secondaryColor?: string;
    value: number;
    previousValue?: number;
    maxValue: number;
    label?: string;
    labelSuffix?: string;
}

export const CircleChart = ({
    mainColor,
    secondaryColor,
    value,
    previousValue,
    maxValue,
    label,
    labelSuffix,
}: CircleChartProps) => {
    const classes = useStyles();
    const regressValue = previousValue && previousValue > value && value < maxValue && previousValue - value;
    const currentDataEntry = {
        color: mainColor,
        value,
    };
    const data = [
        currentDataEntry,
        regressValue && { value: Math.min(regressValue, maxValue - value), color: secondaryColor },
    ].filter(Boolean);

    return (
        <>
            <PieChart
                lineWidth={16}
                totalValue={maxValue}
                data={data as DataEntry[]}
                label={() => {
                    if (!value) return '-';

                    return labelSuffix ? `${label} ${labelSuffix}` : label;
                }}
                labelPosition={0}
                labelStyle={{
                    fontSize: '20px',
                }}
                background="rgba(0, 0, 0, 0.04)"
                startAngle={270}
            />
            {!value && <InfoIcon className={classes.icon} />}
        </>
    );
};

const useStyles = makeStyles({
    icon: {
        color: 'rgba(0, 0, 0, 0.54)',
        position: 'absolute',
        right: '10.5%',
        bottom: '10.5%',
    },
});
