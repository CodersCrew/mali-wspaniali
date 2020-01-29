import React, { Component } from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import i18next from "i18next";


export const HomePage = () => {
    return (
        <Link to="./login">
            <Button variant="contained" color="primary">
                {i18next.t('loginPage')}
            </Button>
        </Link>
    );
};

