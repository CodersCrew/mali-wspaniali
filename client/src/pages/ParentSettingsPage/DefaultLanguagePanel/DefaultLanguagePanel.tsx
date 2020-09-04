import React, { ChangeEvent, useState } from 'react';
import { FormControl, RadioGroup } from '@material-ui/core';
import PlFlag from '../../../assets/pl.png';
import EnFlag from '../../../assets/en.png';
import { LanguageRadioButton } from './LanguageRadioButton';

export const DefaultLanguagePanel = () => {
    const [value, setValue] = useState('polish');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="languages" name="languages" value={value} onChange={handleChange}>
                <LanguageRadioButton value="polish" label="Polski" alt="pl" src={PlFlag} />
                <LanguageRadioButton value="engish" label="English" alt="en" src={EnFlag} />
            </RadioGroup>
        </FormControl>
    );
};
