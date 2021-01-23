import React from 'react';
import { makeStyles } from '@material-ui/styles';

const Results = () => {
    const mockedData = {
        v1: 17,
        v2: 14,
        v3: 9,
        v4: 7,
        v5: 5,
        unit: 's',
        result: 12,
    };

    const { v1, v2, v3, v4, v5, unit, result } = mockedData;
    const range = v1 - v5;

    const calculatePercent = (value: number) => {
        return (value / range) * 100;
    };

    const rangeRed = calculatePercent(v1 - v2);
    const rangeYellow = calculatePercent(v2 - v3);
    const rangeLightGreen = calculatePercent(v3 - v4);
    const rangeGreen = calculatePercent(v4 - v5);
    const resultMarkShift = calculatePercent(result - v5);

    const classes = useStyles(resultMarkShift);

    return (
        <div className={classes.wrapper}>
            <div className={classes.rectangles}>
                <svg
                    width={`${rangeRed}%`}
                    height="56"
                    viewBox="0 0 106 56"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        width="100%"
                        d="M0 4C0 1.79086 1.79086 0 4 0H106V56H4C1.79086 56 0 54.2091 0 52V4Z"
                        fill="#E57373"
                    />
                </svg>
                <svg
                    width={`${rangeYellow}%`}
                    height="56"
                    viewBox="0 0 106 56"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="100%" height="56" fill="#FFB74D" />
                </svg>
                <svg
                    width={`${rangeLightGreen}%`}
                    height="56"
                    viewBox="0 0 106 56"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="100%" height="56" fill="#81C784" />
                </svg>
                <svg
                    width={`${rangeGreen}%`}
                    height="56"
                    viewBox="0 0 106 56"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 0H102C104.209 0 106 1.79086 106 4V52C106 54.2091 104.209 56 102 56H0V0Z"
                        fill="#4CAF50"
                    />
                </svg>
            </div>
            <div className={classes.horizontalLine}>
                <svg
                    width="100%"
                    height="1"
                    viewBox="0 0 440 1"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line x1="440" y1="0.5" x2="-4.37114e-08" y2="0.499962" stroke="#616161" strokeDasharray="10 10" />
                </svg>
            </div>
            <div className={classes.result}>
                <svg width="8" height="80" viewBox="0 0 8 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="8" height="80" rx="4" fill="#212121" />
                </svg>
            </div>
            <div className={classes.mark} style={{ left: '0' }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
                {`${v1} ${unit}`}
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed}%` }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
                {`${v2} ${unit}`}
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow}%` }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
                {`${v3} ${unit}`}
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow + rangeLightGreen}%` }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
                {`${v4} ${unit}`}
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow + rangeLightGreen + rangeGreen}%` }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
                {`${v5} ${unit}`}
            </div>
            <div className={classes.mark} style={{ left: '100%' }}>
                <svg width="1" height="80" viewBox="0 0 1 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.5" y1="2.18557e-08" x2="0.499997" y2="80" stroke="#616161" strokeDasharray="10 10" />
                </svg>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        margin: '12px 0',
    },
    rectangles: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    horizontalLine: {
        position: 'absolute',
        display: 'flex',
        top: '50%',
        width: '100%',
    },
    result: (resultMarkShift) => ({
        backgroundColor: 'black',
        height: 80,
        width: 8,
        borderRadius: 4,
        position: 'absolute',
        top: -12,
        left: `${resultMarkShift}%`,
    }),
    mark: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: -8,
    },
});

export default Results;
