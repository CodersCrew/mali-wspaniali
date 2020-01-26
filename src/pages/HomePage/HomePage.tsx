import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { unauthenticate } from '../../actions/authActions';
import Button from '@material-ui/core/Button';

interface HomePageTypes {
  unauthenticate: () => void;
}

export const HomePage = ({ unauthenticate }: HomePageTypes) => {
  return (
    <>
      <Link to="./login">
        <Button onClick={unauthenticate} color="secondary" variant="outlined">
          Log Out
        </Button>
      </Link>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(unauthenticate, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(HomePage);
