import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { DataEntry } from 'react-minimal-pie-chart/types/commonTypes';

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
    const regressValue = previousValue && previousValue > value && previousValue - value;
    const currentDataEntry = {
        color: mainColor,
        value,
    };
    const data = [
        currentDataEntry,
        regressValue
            ? {
                  value: regressValue,
                  color: secondaryColor,
              }
            : undefined,
    ].filter(Boolean);

    return (
        <PieChart
            lineWidth={16}
            totalValue={maxValue}
            data={data as DataEntry[]}
            label={() => (labelSuffix ? `${label} ${labelSuffix}` : label)}
            labelPosition={0}
            labelStyle={{
                fontSize: '20px',
            }}
            background="rgba(0, 0, 0, 0.04)"
            startAngle={270}
        />
    );
};
