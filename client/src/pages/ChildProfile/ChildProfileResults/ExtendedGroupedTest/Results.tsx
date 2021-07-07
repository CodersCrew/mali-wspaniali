import { makeStyles } from '@material-ui/styles';
import { Trans } from 'react-i18next';
import Girl from '../../../../assets/girl.svg';
import Boy from '../../../../assets/boy.svg';
import { ResultsData } from './types';

export interface Props {
    resultsData: ResultsData;
    displayHistoricalResults?: boolean;
}

export function Results({ resultsData, displayHistoricalResults }: Props) {
    const {
        v1,
        v2,
        v3,
        v4,
        v5,
        unit,
        result,
        resultStart,
        hasScoreRangeLabels,
        sex,
        rangeMin,
        range39,
        range59,
        rangeMax,
        firstName,
    } = resultsData;
    const avatar = sex === 'male' ? Boy : Girl;
    const range = v1 - v5;
    const calculatePercent = (value: number) => {
        return (value / range) * 100;
    };

    const rangeRed = calculatePercent(v1 - v2);
    const rangeYellow = calculatePercent(v2 - v3);
    const rangeLightGreen = calculatePercent(v3 - v4);
    const rangeGreen = calculatePercent(v4 - v5);
    const resultMarkShift = calculatePercent(v1 - result);
    const resultStartShift = calculatePercent(v1 - resultStart);

    const shiftFirstScoreRange = rangeRed / 2 - 5;
    const shiftSecondScoreRange = rangeRed + (rangeYellow + rangeLightGreen) / 2 - 5;
    const shiftThirdScoreRange = rangeRed + rangeYellow + rangeLightGreen + rangeGreen / 2 - 5;

    const classes = useStyles({
        resultMarkShift,
        resultStartShift,
    });

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
                    width="105%"
                    height="9"
                    viewBox="0 0 445 9"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M440 4V0L445 4.5L440 9V5L435 5V4L440 4ZM425 4L415 4V5L425 5V4ZM405 4L395 4V5L405 5V4ZM385 4L375 3.99999V4.99999L385 5V4ZM365 3.99999L355 3.99999V4.99999L365 4.99999V3.99999ZM345 3.99999L335 3.99999V4.99999L345 4.99999V3.99999ZM325 3.99999L315 3.99999V4.99999L325 4.99999V3.99999ZM305 3.99999L295 3.99999V4.99999L305 4.99999V3.99999ZM285 3.99999L275 3.99999V4.99999L285 4.99999V3.99999ZM265 3.99998L255 3.99998V4.99998L265 4.99998V3.99998ZM245 3.99998L235 3.99998V4.99998L245 4.99998V3.99998ZM225 3.99998L215 3.99998V4.99998L225 4.99998V3.99998ZM205 3.99998L195 3.99998V4.99998L205 4.99998V3.99998ZM185 3.99998L175 3.99998V4.99998L185 4.99998V3.99998ZM165 3.99998L155 3.99997V4.99998L165 4.99998V3.99998ZM145 3.99997L135 3.99997V4.99997L145 4.99997V3.99997ZM125 3.99997L115 3.99997V4.99997L125 4.99997V3.99997ZM105 3.99997L95 3.99997V4.99997L105 4.99997V3.99997ZM85 3.99997L75 3.99997V4.99997L85 4.99997V3.99997ZM65 3.99997L55 3.99997V4.99997L65 4.99997V3.99997ZM45 3.99997L35 3.99996V4.99996L45 4.99997V3.99997ZM25 3.99996L15 3.99996V4.99996L25 4.99996V3.99996ZM5 3.99996L0 3.99996V4.99996L5 4.99996V3.99996Z"
                        fill="#616161"
                    />
                </svg>
            </div>
            <div className={classes.mark} style={{ left: '0' }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black" className={classes.label}>{`${v1}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed}%` }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black" className={classes.label}>{`${v2}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: `${rangeRed + rangeYellow + rangeLightGreen}%` }}>
                <svg width="50" height="100" viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="-0" y="100" fill="black" className={classes.label}>{`${v4}`}</text>
                </svg>
            </div>
            <div className={classes.mark} style={{ left: '100%' }}>
                <svg width="55" height="100" viewBox="0 0 55 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                    <text x="0" y="100" fill="black" className={classes.label}>{`${v5} ${unit}`}</text>
                </svg>
            </div>
            {displayHistoricalResults && (
                <div className={classes.resultStart}>
                    <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="8" height="80" rx="4" x="98" y="68" fill="#9E9E9E" />
                    </svg>
                </div>
            )}
            <div className={classes.result}>
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <image href={avatar} x="88" height="28" width="28" />
                    <text
                        x="100"
                        y="42"
                        fill="black"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className={classes.label}
                    >
                        <Trans i18nKey="child-profile.your-child-result">
                            <tspan></tspan>
                            <tspan x="50%" dy="1.2em">
                                {{ name: firstName?.toUpperCase() }}
                            </tspan>
                        </Trans>
                    </text>
                    <rect width="8" height="80" rx="4" x="98" y="68" fill="#212121" />
                </svg>
            </div>
            {hasScoreRangeLabels && (
                <div className={classes.scoring}>
                    <svg width="100%" height="30" viewBox="0 0 100% 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x={`${shiftFirstScoreRange}%`} y="20" fill="black" className={classes.label}>
                            ({rangeMin}-{range39} pkt)
                        </text>
                        <text x={`${shiftSecondScoreRange}%`} y="20" fill="black" className={classes.label}>
                            ({range39! + 1}-{range59} pkt)
                        </text>
                        <text x={`${shiftThirdScoreRange}%`} y="20" fill="black" className={classes.label}>
                            ({range59! + 1}-{rangeMax} pkt)
                        </text>
                    </svg>
                </div>
            )}
        </div>
    );
}

interface IStyleProps {
    resultMarkShift: number;
    resultStartShift: number;
}

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
        margin: '80px 20px 100px',
    },
    label: {
        userSelect: 'none',
        cursor: 'default',
    },
    rectangles: {
        display: 'flex',
        flexWrap: 'nowrap',
    },
    horizontalLine: {
        position: 'absolute',
        display: 'flex',
        top: '50%',
        width: '102%',
        transform: 'translatey(-4px)',
    },
    result: (props: IStyleProps) => ({
        position: 'absolute',
        top: -78,
        left: `${props.resultMarkShift}%`,
        transform: 'translateX(-102px)',
    }),
    resultStart: (props: IStyleProps) => ({
        position: 'absolute',
        top: -78,
        left: `${props.resultStartShift}%`,
        transform: 'translateX(-102px)',
    }),
    mark: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: -8,
        transform: 'translateX(-10px)',
    },
    scoring: {
        position: 'absolute',
        top: '100px',
        width: '100%',
    },
});
