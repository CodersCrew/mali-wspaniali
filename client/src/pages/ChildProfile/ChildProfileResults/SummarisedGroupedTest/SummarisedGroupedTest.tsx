import React from 'react';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionSummary, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { ButtonSecondary } from '../../../../components/Button';
import { useBreakpoints } from '../../../../queries/useBreakpoints';

interface Props {
    onClose: () => void;
    isExpanded: boolean;
    schoolYearStart: number;
    date: Date;
    childId: string;
}

export const SummarisedGroupedTest = ({ onClose, isExpanded, schoolYearStart }: Props) => {
    const device = useBreakpoints();
    const classes = useStyles();
    const { t } = useTranslation();

    const onDetailsBtnClick = (event: React.MouseEvent<SVGSVGElement | HTMLButtonElement>) => {
        if (isExpanded) {
            event.stopPropagation();
        }
        onClose();
    };

    const getDetailsBtn = (): JSX.Element => {
        if (device === 'MOBILE') {
            return (
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon onClick={(event) => onDetailsBtnClick(event)} />}
                ></AccordionSummary>
            );
        }

        return (
            <ButtonSecondary
                onClick={(event) => onDetailsBtnClick(event)}
                variant={isExpanded ? 'outlined' : 'contained'}
                className={classes.detailsButton}
                innerText={isExpanded ? t('child-profile.collapse-details') : t('child-profile.details')}
            />
        );
    };

    return (
        <Grid direction="row" justify="space-between" alignItems="center" className={classes.wrapper} container>
            <Grid direction="row" justify="flex-start" alignItems="center" item xs={8} container>
                <Grid item>
                    <Typography className={classes.title} variant="subtitle2">
                        {t('child-profile.kindergartener-test')}: {getSchoolYearLabel(schoolYearStart)}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" className={classes.updatedAt}>
                        aaaaaaaaaaaaaa
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>{getDetailsBtn()}</Grid>
        </Grid>
    );
};

function getSchoolYearLabel(schoolYearStart: number) {
    return `${schoolYearStart}/${schoolYearStart + 1}`;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            padding: theme.spacing(0, 2),
        },
        title: {
            marginRight: theme.spacing(5),
        },
        updatedAt: {
            color: theme.palette.secondary.dark,
        },
        detailsButton: {
            marginLeft: 'auto',
        },
    }),
);
