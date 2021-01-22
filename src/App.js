import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.scss';
import Coronavirus from '../public/coronavirus.svg';
import Cards from './Components/Cards/Cards';
import Map from './Components/Map/Map';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(async () => {
    const global = await fetch('https://covid19.mathdro.id/api/')
      .then((response) => response.json())
      .then((data) => data);
    setCountryInfo(global);
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://covid19.mathdro.id/api/countries')
        .then((response) => response.json())
        .then((data) => {
          const listCountries = data.countries.map((state) => ({
            name: state.name,
            value: state.iso2,
          }));
          setCountries(listCountries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://covid19.mathdro.id/api/'
        : `https://covid19.mathdro.id/api/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div className="app__header__title">
            <img src={Coronavirus} alt="coronavirus Logo" />
            <h2>Coronavirus (COVID-19)</h2>
          </div>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((state) => (
                <MenuItem
                  value={state.value}
                  key={state.value !== undefined ? state.value : Math.random()}
                >
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {countryInfo.confirmed ? <Cards data={countryInfo} /> : 'Loading...'}
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
