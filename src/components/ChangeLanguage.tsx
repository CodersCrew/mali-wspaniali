import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core/';
import React from 'react';

function Page() {

    const {i18n} = useTranslation();
    const changeLanguage = (lng: string) => {
        return i18n.changeLanguage(lng);
    };

    return (
        <div className="App">
            <div className="App-header">
                <Button
                    onClick={() => changeLanguage('pl')}
                    variant="contained">pl
                </Button>
                <Button onClick={() => changeLanguage('de')}
                        variant="contained">de
                </Button>
                <Button onClick={() => changeLanguage('en')}
                        variant="contained"
                        color="default">en</Button>
            </div>
        </div>
    );
}

export default Page;