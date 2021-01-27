import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import { sortData } from './util/util';
import './App.scss';
import Coronavirus from '../public/coronavirus.svg';
import Cards from './Components/Cards/Cards';
import Table from './Components/Table/Table';
import Chart from './Components/Chart/Chart';
import Map from './Components/Map/Map';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [country, setInputCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState('cases');
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getGlobalData = async () => {
      await fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };

    getGlobalData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const listCountries = data.map((state) => ({
            name: state.country,
            value: state.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(listCountries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        console.log(data.countryInfo);
        setMapCenter(
          countryCode === 'worldwide'
            ? { lat: 34.80746, lng: -40.4796 }
            : { lat: data.countryInfo.lat, lng: data.countryInfo.long }
        );
        setMapZoom(13);
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
                <MenuItem value={state.value} key={Math.random()}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {countryInfo.updated ? <Cards data={countryInfo} /> : 'Loading...'}
        </div>
        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
      </div>
      <div className="app__right">
        <Card className="app__card">
          <CardContent>
            <h3 className="app__righ--liveCases">Live Cases by Country</h3>
            {tableData.length > 0 ? <Table countries={tableData} /> : 'Loading...'}
            <h3 className="app__righ--chartNewCases">Worldwide New {casesType}</h3>
            <Chart casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
