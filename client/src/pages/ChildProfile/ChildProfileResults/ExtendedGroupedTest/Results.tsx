import { makeStyles } from '@material-ui/styles';
import { Trans, useTranslation } from 'react-i18next';
import Girl from '@app/assets/girl.svg';
import Boy from '@app/assets/boy.svg';

type ResultsData = {
    minScale: number;
    maxScale: number;
    scale39: number;
    scale49: number;
    scale59: number;
    result: number;
    resultStart: number;
    hasScoreRangeLabels: boolean;
    sex: string;
    rangeMin?: number;
    range39?: number;
    range59?: number;
    rangeMax?: number;
    firstName?: string;
};

export interface Props {
    resultsData: ResultsData;
    displayHistoricalResults?: boolean;
    unit: string;
}

export function Results(props: Props) {
    const { result, resultStart, sex, firstName, minScale, maxScale, scale39, scale49, scale59 } = props.resultsData;

    const range = minScale - maxScale;
    const calculatePercent = (value: number) => {
        return (value / range) * 100;
    };

    const rangeRed = calculatePercent(minScale - scale39);
    const rangeYellow = calculatePercent(scale39 - scale49);
    const rangeLightGreen = calculatePercent(scale49 - scale59);
    const rangeGreen = calculatePercent(scale59 - maxScale);
    const resultMarkShift = calculatePercent(minScale - result);
    const resultStartShift = calculatePercent(minScale - resultStart);

    const classes = useStyles({
        resultMarkShift,
        resultStartShift,
    });

    return (
        <div className={classes.wrapper}>
            <div className={classes.rectangles}>
                <DrawRect
                    width={rangeRed}
                    color="#E57373"
                    path="M0 4C0 1.79086 1.79086 0 4 0H106V56H4C1.79086 56 0 54.2091 0 52V4Z"
                />
                <DrawRect width={rangeYellow} color="#FFB74D" />
                <DrawRect width={rangeLightGreen} color="#81C784" />
                <DrawRect
                    width={rangeGreen}
                    color="#4CAF50"
                    path="M0 0H102C104.209 0 106 1.79086 106 4V52C106 54.2091 104.209 56 102 56H0V0Z"
                />
            </div>
            <HorizontalLine />
            <ValueLabel label={`${minScale} ${props.unit}`} x={0} width="50" />
            <ValueLabel label={scale39.toString()} x={rangeRed} width="50" />
            <ValueLabel label={scale59.toString()} x={rangeRed + rangeYellow + rangeLightGreen} width="50" />
            <ValueLabel label={`${maxScale} ${props.unit}`} x={100} width="55" />
            {props.displayHistoricalResults && <HistoricalLine x={resultStartShift} />}
            <CurrentResultLine sex={sex} x={resultMarkShift} firstName={firstName} />
        </div>
    );
}

function CurrentResultLine({ x, sex, firstName }: { x: number; sex: string; firstName?: string }) {
    const avatar = sex === 'male' ? Boy : Girl;
    const classes = useStyles({ resultMarkShift: x });

    return (
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
                    {firstName ? <ChildLabel firstName={firstName} /> : <GeneralLabel />}
                </text>
                <rect width="8" height="80" rx="4" x="98" y="68" fill="#212121" />
            </svg>
        </div>
    );
}

function HistoricalLine({ x }: { x: number }) {
    const classes = useStyles({ resultStartShift: x });

    return (
        <div className={classes.resultStart}>
            <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="80" rx="4" x="98" y="68" fill="#9E9E9E" />
            </svg>
        </div>
    );
}

function DrawRect(props: { width: number; color: string; path?: string }) {
    return (
        <svg
            width={`${props.width}%`}
            height="56"
            viewBox="0 0 106 56"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {props.path ? (
                <path width="100%" d={props.path} fill={props.color} />
            ) : (
                <rect width="100%" height="56" fill={props.color} />
            )}
        </svg>
    );
}

function HorizontalLine() {
    const classes = useStyles({});

    return (
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
    );
}

function ValueLabel(props: { x: number; label: string; width: string }) {
    const classes = useStyles({});

    return (
        <div className={classes.mark} style={{ left: `${props.x}%` }}>
            <svg
                width={props.width}
                height="100"
                viewBox={`0 0 ${props.width} 100`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="10" y1="2.18557e-08" x2="10" y2="80" stroke="#616161" strokeDasharray="10 10" />
                <text x="0" y="100" fill="black" className={classes.label}>
                    {props.label}
                </text>
            </svg>
        </div>
    );
}

function ChildLabel({ firstName }: { firstName: string }) {
    return (
        <Trans i18nKey="child-profile.your-child-result">
            <tspan></tspan>
            <tspan x="50%" dy="1.2em">
                {{ name: firstName?.toUpperCase() }}
            </tspan>
        </Trans>
    );
}

function GeneralLabel() {
    const { t } = useTranslation();

    return <>{t('child-profile.your-child-result-general')}</>;
}

interface IStyleProps {
    resultMarkShift?: number;
    resultStartShift?: number;
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
