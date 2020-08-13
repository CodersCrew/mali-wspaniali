import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
const Info = require('../../assets/cookieModal/info.svg');
const Close = require('../../assets/cookieModal/close.svg');

function getCookie(name: string) {
    console.log(name, getCookie);
    return document.cookie.split(';').filter(cookie => {
        const [k] = cookie.split('=');
        return k.trim() === name;
    })[0];
}
function setCookie(name: string, value: string) {
    document.cookie = name + '=' + value;
}

export const CookieModal = () => {
    const classes = useStyles();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const cookiesAccepted = () => {
        const cookie = getCookie('cookies');
        return cookie;
    };
    useEffect(() => {
        setModalIsOpen(true);
        cookiesAccepted() ? setModalIsOpen(false) : setModalIsOpen(true);
    }, []);

    return modalIsOpen ? (
        <div className={classes.modal}>
            <img src={Info} alt="infoIcon" />
            <div className={classes.modal_textWrapper}>
                <p className={classes.modal_title}>Ciasteczka</p>
                <p className={classes.modal_info}>
                    Wykorzystujemy „ciasteczka” (cookies) w celu gromadzenia informacji związanych z korzystaniem z
                    serwisu. Stosowane przez nas pliki typu cookies umożliwiają utrzymanie sesji po zalogowaniu. Można
                    wyłączyć ten mechanizm w ustawieniach przeglądarki. Korzystanie z naszego serwisu bez zmiany
                    ustawień dotyczących cookies oznacza, że będą one zapisane w pamięci urządzenia.
                </p>
            </div>

            <button
                className={classes.modal_button}
                onClick={() => {
                    setCookie('cookies', 'true');
                    setModalIsOpen(false);
                }}
            >
                <img src={Close} alt="closeIcon" />
            </button>
        </div>
    ) : null;
};

const useStyles = makeStyles({
    modal: {
        position: 'absolute',
        width: 'calc(100% - 120px)',
        zIndex: 11, // w http://localhost:3000/parent/blog/all/1 ma zIndex 10;
        padding: '16px',
        backgroundColor: '#e9f5fe',
        display: 'flex',
        alignItems: 'flex-start',
    },
    modal_button: {
        marginLeft: 'auto',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    },
    modal_title: {
        margin: '0px',
        padding: '0px',
        fontSize: '16px',
        fontWeight: 500,
        fontFamil: 'montserrat',
        height: '22px',
        lineHeight: '22px',
    },
    modal_textWrapper: {
        padding: '0 12px',
    },
    modal_info: {
        fonrSize: '14px',
    },
});
