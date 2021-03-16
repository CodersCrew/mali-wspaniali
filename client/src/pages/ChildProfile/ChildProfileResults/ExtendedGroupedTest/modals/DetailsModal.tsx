import React from 'react';
import { DialogContent, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { BasicModal } from '../../../../../components/Modal/BasicModal';
import { ChildInput } from '../../../../../graphql/types';
import { ActionDialog, openDialog } from '../../../../../utils/openDialog';
import { DetailsMeasurement } from '../DetailsMeasurement';
import { MeasurementProps } from '../types';

// const T_DETAILS_PREFIX = 'child-profile.advice-modal-content';

type DetailsModalProps = {
    isCancelButtonVisible: boolean;
    measurementProps: MeasurementProps;
};

const DetailsModal = ({ onClose, measurementProps }: DetailsModalProps & ActionDialog<{ child: ChildInput }>) => {
    const { t } = useTranslation();
    // const classes = useStyles();

    return (
        <BasicModal
            actionName={t('close')}
            isOpen={true}
            onClose={() => onClose()}
            isCancelButtonVisible={true}
            dialogProps={{ maxWidth: 'sm' }}
            closeButtonText={t('close')}
            isActionButtonSecondary={false}
        >
            {/* <DialogTitle>{t(`${T_ADVICE_PREFIX}.${resultKey}.title`)}</DialogTitle> */}
            <DialogContent>
                <Grid container>
                    <Grid lg={4} xs={12} item container direction="column" justify="space-between">
                        <DetailsMeasurement
                            measurmentProps={measurementProps}
                            // valueInUnitOfMeasure={
                            //     result.test[test.unitOfMeasureKey as keyof TestResult['test']] as number
                            // }
                            // valueInPoints={result.test[test.pointsKey as keyof TestResult['test']] as number}
                            // unitOfMeasure={test.unitOfMeasure}
                            // scaleFrom={test.scaleFrom}
                            // scaleTo={test.scaleTo}
                            // translationKey={test.translationKey}
                            // key={test.translationKey}
                        />
                        <Typography variant="subtitle2">{t('details-modal.next-assesment-time')}</Typography>
                        {/* <Typography variant="body2">TBD</Typography> */}
                    </Grid>
                    <Grid lg={4} xs={12} item></Grid>
                </Grid>
            </DialogContent>
        </BasicModal>
    );
};

export const openDetailsModal = (props: DetailsModalProps) => {
    return openDialog<DetailsModalProps>(DetailsModal, props);
};

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         link: {
//             color: theme.palette.primary.main,
//         },
//     }),
// );
