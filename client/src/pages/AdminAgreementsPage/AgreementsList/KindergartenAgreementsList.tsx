import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Status } from '../../../components/Icons/Status';
import { Agreement, Child } from '../../../graphql/types';

export interface Parent {
    mail: string;
    children: Child[];
    agreements: Agreement[];
    viewAgreement: boolean;
    marketingAgreement: boolean;
}

interface Props {
    parents: Parent[];
}

export function KindergartenAgreementsList({ parents }: Props) {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <>
            {/* <Typography variant="h4">Osoby, które oddały zgodę wizerunkową</Typography> */}
            <Table size="small" aria-label="purchases" classes={{ root: classes.container }}>
                <TableHead>
                    <TableRow>
                        <TableCell>{t('agreements.email')}</TableCell>
                        <TableCell>{t('agreements.children')}</TableCell>
                        <TableCell align="center">{t('agreements.image')}</TableCell>
                        <TableCell align="center">{t('agreements.marketing')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parents.map((parent, index) => (
                        <TableRow key={index}>
                            <TableCell>{parent.mail}</TableCell>
                            <TableCell>
                                {parent.children.map((child: any, nr: number) => (
                                    <div key={nr} style={{ margin: '0.5em 0' }}>{child.firstname} {child.lastname}</div>
                                ))}
                            </TableCell>
                            <TableCell align="center">
                                <Status success={parent.agreements?.find((a: any) => a.text === 'Image')!.isSigned || false} />
                            </TableCell>
                            <TableCell align="center">
                                <Status success={parent?.agreements.find((a: any) => a.text === 'Marketing')!.isSigned || false} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            maxHeight: 419,
        },
    }),
);
