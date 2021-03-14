import { useTranslation } from 'react-i18next';
import { makeStyles, createStyles } from '@material-ui/core';
// import { SearchInput } from './SearchInput';
import { ButtonSecondary } from '../../components/Button/ButtonSecondary';

interface Props {
    onAddKindergartenClick: () => void;
}

export const ResultsActions = ({ onAddKindergartenClick }: Props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.container}>
            {/* TODO: Make SearchInput work
            <div className={classes.input}>
                <SearchInput />
            </div> */}
            <ButtonSecondary
                variant="contained"
                innerText={t('test-results.add-kindergarten')}
                onClick={onAddKindergartenClick}
            />
        </div>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            // display: 'grid',
            alignItems: 'center',
            // gridTemplateColumns: '1fr 1fr',
            // gap: theme.spacing(2),
        },
        input: {
            width: 330,
        },
    }),
);
