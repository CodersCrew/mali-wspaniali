import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import BoyAvatarSmall from '../../../../assets/boy_small.png';

const Results = () => {
    const { t } = useTranslation();
    const mockedData = {
        v1: 17,
        v2: 12,
        v3: 9,
        v4: 8,
        v5: 5,
        unit: 's',
        result: 16,
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
    const resultMarkShift = calculatePercent(v1 - result);

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
            <div className={classes.mark} style={{ left: '0' }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black">{`${v1} ${unit}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed}%` }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black">{`${v2} ${unit}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow}%` }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black">{`${v3} ${unit}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow + rangeLightGreen}%` }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black">{`${v4} ${unit}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: '100%' }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black">{`${v5} ${unit}`}</text>
                </svg>
            </div>
            <div className={classes.result}>
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <image href={BoyAvatarSmall} x="90" height="24" width="24" />
                    <text x="100" y="42" fill="black" dominantBaseline="middle" textAnchor="middle">{t('child-profile.your-child-result-1')}</text>
                    <text x="100" y="56" fill="black" dominantBaseline="middle" textAnchor="middle">{t('child-profile.your-child-result-2')}</text>
                    <rect width="8" height="80" rx="4" x="98" y="72" fill="#212121" />
                </svg>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        margin: '80px 0 50px',
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
        position: 'absolute',
        top: -78,
        left: `${resultMarkShift}%`,
        transform: 'translateX(-102px)',
    }),
    mark: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: -8,
        transform: 'translateX(-10px)',
    },
});

export default Results;
