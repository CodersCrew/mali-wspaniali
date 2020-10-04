import React from 'react';
import { results2points } from '../results2points';
import { Results } from './Results';

results2points();

export const ResultsWrapper = () => {
    const localStorageDisciplines = localStorage.getItem('setOfDisciplines');
    const localStorageAges = localStorage.getItem('setOfAges');
    let disciplines;
    if (localStorageDisciplines) {
        disciplines = JSON.parse(localStorageDisciplines);
    }
    let ages;
    if (localStorageAges) {
        ages = JSON.parse(localStorageAges);
    }

    return <Results disciplines={disciplines} ages={ages} />;
};
