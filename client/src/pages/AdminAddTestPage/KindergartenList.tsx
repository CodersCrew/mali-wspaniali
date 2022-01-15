import {
    createStyles,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    Theme,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import { LabeledContainer } from '../../components/LabeledContainer';
import { Kindergarten } from '../../graphql/types';

interface Props {
    kindergartens: { selected: boolean; kindergarten: Kindergarten }[];
}

export function KindergartenList({ kindergartens }: Props) {
    const { t } = useTranslation();
    const [searchPhrase, setSearchPhrase] = React.useState('');

    const classes = useStyles();

    return (
        <LabeledContainer title={t('add-test-view.kindergartens.title')}>
            <>
                <TextField
                    label={t('add-test-view.kindergartens.find-kindergarten')}
                    type="search"
                    variant="outlined"
                    fullWidth
                    data-testid="search-field"
                    value={searchPhrase}
                    onChange={({ target: { value } }) => setSearchPhrase(value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('add-test-view.kindergartens.kindergarten-name')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {kindergartens
                                .filter((kindergarten) => kindergarten.selected)
                                .map((kindergarten) => (
                                    <TableRow key={kindergarten.kindergarten._id} hover role="row">
                                        <TableCell classes={{ root: classes.kindergartenItem }}>
                                            <div>
                                                {kindergarten.kindergarten.number}/{kindergarten.kindergarten.name}
                                            </div>
                                            <div className={classes.helperLabel}>
                                                {kindergarten.kindergarten.address}&nbsp;
                                                {kindergarten.kindergarten.city}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </LabeledContainer>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        kindergartenItem: {
            cursor: 'default',
        },
        helperLabel: {
            color: theme.palette.grey['400'],
            marginLeft: theme.spacing(1),
        },
    }),
);
