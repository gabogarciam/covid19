export const sortData = (data) => [...data].sort((a, b) => (a.cases > b.cases ? -1 : 1));

export const prettyPrintStat = () => console.log('foo');
