export const categories = {
    all: { name: 'Wszystkie', color: 'orange' },
    food: { name: 'Żywienie', color: 'yellow' },
    activity: { name: 'Aktywność fizyczna', color: 'purple' },
    emotions: { name: 'Emocje', color: 'lightOrange' },
    other: { name: 'Inne', color: 'blue' }
};
  
export const categoriesList = Object.entries(categories).map(([key, value]) => {
    return {key, ...value};
});