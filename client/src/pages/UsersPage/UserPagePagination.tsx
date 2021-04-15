import { IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type Props = {
    page: number;
    pageChangeHandler: (direction: string) => void;
    documentsCount: number;
    rowsPerPage: number;
};

export const UserPagePagination = ({ page, pageChangeHandler, documentsCount, rowsPerPage }: Props) => {
    return (
        <div>
            <IconButton disabled={page === 0} onClick={() => pageChangeHandler('PREV')}>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton disabled={documentsCount < rowsPerPage} onClick={() => pageChangeHandler('NEXT')}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
};
