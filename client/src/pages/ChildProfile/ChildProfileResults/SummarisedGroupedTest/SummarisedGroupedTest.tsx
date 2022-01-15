import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionSummary, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';

import { ButtonSecondary } from '../../../../components/Button';
import { useIsDevice } from '../../../../queries/useBreakpoints';
import { AssessmentResult } from '../../../../graphql/types';

interface Props {
    onClick: () => void;
    isExpanded: boolean;
    test: AssessmentResult;
}

export function SummarisedGroupedTest({ onClick, isExpanded, test }: Props) {
    const classes = useStyles();

    return (
        <Grid direction="row" justify="space-between" alignItems="center" className={classes.wrapper} container>
            <Grid direction="row" justify="flex-start" alignItems="center" item xs={8} container>
                <Grid item>
                    <Typography className={classes.title} variant="subtitle2">
                        {test.assessment.title}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                <DetailsButton onClick={onClick} isExpanded={isExpanded} />
            </Grid>
        </Grid>
    );
}

function DetailsButton({ onClick, isExpanded }: { isExpanded: boolean; onClick: () => void }) {
    const classes = useStyles();
    const device = useIsDevice();
    const { t } = useTranslation();

    if (device.isSmallMobile) {
        return <AccordionSummary expandIcon={<ExpandMoreIcon onClick={onDetailsButtonClick} />}></AccordionSummary>;
    }

    return (
        <ButtonSecondary
            onClick={onDetailsButtonClick}
            variant={isExpanded ? 'outlined' : 'contained'}
            className={classes.detailsButton}
            innerText={isExpanded ? t('child-profile.collapse-details') : t('child-profile.details')}
        />
    );

    function onDetailsButtonClick(event: MouseEvent<SVGSVGElement | HTMLButtonElement>) {
        event.stopPropagation();

        onClick();
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            padding: theme.spacing(0, 2),
        },
        title: {
            marginRight: theme.spacing(5),
        },
        detailsButton: {
            marginLeft: 'auto',
        },
    }),
);
