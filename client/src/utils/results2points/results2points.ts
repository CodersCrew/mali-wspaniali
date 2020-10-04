/*
enum MiastoWies {
    miasto,
    wies,
}

enum Plec {
    K,
    M,
}
*/

export type Result = {
    dyscyplina: string;
    'miasto-wies'?: string;
    plec: string;
    rocznik: number;
    wynik: number;
    // punktacja: number;
};

export const results2points = () => {
    fetch('/data/baza.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            const disciplines = data.map((item: { dyscyplina: string }) => {
                return item.dyscyplina;
            });
            localStorage.setItem('setOfDisciplines', JSON.stringify(enumerateDisciplines(disciplines)));
            const ages = data.map((item: { rocznik: number }) => {
                return item.rocznik;
            });
            localStorage.setItem('setOfAges', JSON.stringify(enumerateAges(ages)));
            localStorage.setItem('baza', JSON.stringify(data));
        })
        .catch(error => {
            console.log(error.message);
        });
};

const enumerateDisciplines = (disciplines: string[]) => {
    return Array.from(new Set(disciplines));
};

const enumerateAges = (ages: number[]) => {
    return Array.from(new Set(ages));
};

export const determinePoints = (result: Result): number => {
    const localStorageBaza = localStorage.getItem('baza');
    let data;
    if (localStorageBaza) {
        data = JSON.parse(localStorageBaza);
    }
    const match = data.filter((item: Result) => {
        if (item['miasto-wies']) {
            return (
                item.dyscyplina === result.dyscyplina &&
                item.plec === result.plec &&
                item.rocznik === result.rocznik &&
                item.wynik === result.wynik &&
                item['miasto-wies'] === result['miasto-wies']
            );
        }

        return (
            item.dyscyplina === result.dyscyplina &&
            item.plec === result.plec &&
            item.rocznik === result.rocznik &&
            item.wynik === result.wynik
        );
    });
    if (match.length) return match[0].punktacja;

    return -1;
};
