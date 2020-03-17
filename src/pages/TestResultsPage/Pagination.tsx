import React from 'react';
import { IconButton } from '@material-ui/core/';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

type Props = {
  page: number;
  pageChangeHandler: (direction: string) => void;
  documentsCount: number;
  rowsPerPage: number;
};

export enum PaginationDirections {
  next = 'NEXT',
  prev = 'PREV',
}

export const Pagination = ({
  page,
  pageChangeHandler,
  documentsCount,
  rowsPerPage,
}: Props) => {
  return (
    <div>
      <IconButton
        disabled={page === 0}
        onClick={() => pageChangeHandler(PaginationDirections.prev)}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        disabled={documentsCount < rowsPerPage}
        onClick={() => pageChangeHandler(PaginationDirections.next)}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
};
