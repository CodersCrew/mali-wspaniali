import { createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { white } from '@app/colors';

interface PointsChipProps {
    min: number;
    max: number;
    color: string;
}

export function PointsChip({ min, max, color }: PointsChipProps) {
    const { t } = useTranslation();
    const classes = useStyles({ color });

    return (
        <div className={classes.points}>
            {Math.round(min)}/{Math.round(max)} {t('child-profile.pts')}
        </div>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        points: {
            fontFamily: 'Montserrat',
            fontSize: '14px',
            borderRadius: '16px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: white,
            width: 'fit-content',
            padding: '3px 10px',
            marginTop: '15px',
            backgroundColor: ({ color }: { color: string }) => color,
        },
    }),
);
