import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const HomePage = () => {
  return (
    <Link to="./login">
      <Button variant="contained" color="primary">
        Go to Login Page
      </Button>
    </Link>
  );
};

export default HomePage;