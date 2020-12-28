import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/styles';

interface Props {
    color: string;
    value: number;
    maxValue: number;
    enableInfoIcon?: boolean;
    label?: string;
    labelSuffix?: string;
}

export const CircleChart = ({ color, value, maxValue, label, enableInfoIcon, labelSuffix }: Props) => {
    const classes = useStyles();

    const dataEntry: DataEntry = { color, value };

    return (
        <>
            <PieChart
                lineWidth={16}
                totalValue={maxValue}
                data={[dataEntry]}
                label={() => {
                    if (!value) return '-';

                    return labelSuffix ? `${label} ${labelSuffix}` : label;
                }}
                labelPosition={0}
                labelStyle={{ fontSize: '20px' }}
                background="rgba(0, 0, 0, 0.04)"
                startAngle={270}
            />
            {!value && enableInfoIcon && <InfoIcon className={classes.icon} />}
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
