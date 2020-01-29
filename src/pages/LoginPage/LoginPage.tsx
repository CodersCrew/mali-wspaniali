import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import i18next from "i18next";

export const LoginPage = () => {
  return (
    <Link to="/">
      <Button variant="contained" color="primary">
          {i18next.t('homePage')}
      </Button>
    </Link>
  );
};

