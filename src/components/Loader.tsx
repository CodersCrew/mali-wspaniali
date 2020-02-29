import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <div className="loader">
      <StyledBackdrop open={true}>
        <CircularProgress color="inherit" />
      </StyledBackdrop>
    </div>
  );
};

const StyledBackdrop = styled(Backdrop)`
  z-index: 10;
  color: '#fff';
`;
