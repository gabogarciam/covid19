const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  const {
    data: { confirmed, recovered, deaths, lastUpdate },
  } = await fetch(changeableUrl);

  return { confirmed, recovered, deaths, lastUpdate };
};

export const getCountriesData = async () => {
  await fetch(`${url}/countries`)
    .then((response) => response.json())
    .then((data) => {
      const countries = data.countries.map((country) => ({
        name: country.country,
        value: country.iso2,
      }));
      return countries;
    })
    .catch((error) => error);
};

export const getHistoricalData = async () => {
  const historyData = await fetch('https://disease.sh/v3/covid-19/historical?lastdays=100')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

  return { historyData };
};
