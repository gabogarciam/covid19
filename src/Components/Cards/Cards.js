import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import './Cards.scss';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => (
  <div>
    <div className="infoStats">
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__title" color="textSecondary">
            Coronavis Cases
          </Typography>
          <Typography className="infoStats__cases" variant="h5">
            <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
          </Typography>
          <Typography className="infoStats__total" color="textSecondary">
            {new Date(lastUpdate).toDateString()} / lastUpdate
          </Typography>
        </CardContent>
      </Card>
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__title" color="textSecondary">
            Recovered
          </Typography>
          <Typography className="infoStats__cases" variant="h5">
            <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
          </Typography>
          <Typography className="infoStats__total" color="textSecondary">
            {new Date(lastUpdate).toDateString()} / lastUpdate
          </Typography>
        </CardContent>
      </Card>
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__title" color="textSecondary">
            Deaths
          </Typography>
          <Typography className="infoStats__cases" variant="h5">
            <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
          </Typography>
          <Typography className="infoStats__total" color="textSecondary">
            {new Date(lastUpdate).toDateString()} / lastUpdate
          </Typography>
        </CardContent>
      </Card>
    </div>
    <div className="app__stats">
      Last update {new Date(lastUpdate).toDateString()} · Source:{' '}
      <a
        className="YjZvJe"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/mathdroid/covid-19-api"
      >
        <span className="bGEAFd">mathdroid/covid-19-api</span>
      </a>
    </div>
  </div>
);

export default Cards;
