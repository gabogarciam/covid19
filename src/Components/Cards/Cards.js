import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import './Cards.scss';

const Cards = ({ data: { cases, recovered, deaths, updated } }) => (
  <div>
    <div className="infoStats">
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__infoStats__card--title" color="textSecondary">
            Total Cases
          </Typography>
          <Typography className="infoStats__infoStats__card--cases" variant="h5">
            {cases >= 0 ? (
              <CountUp start={0} end={cases} duration={2.5} separator="," />
            ) : (
              'No data'
            )}
          </Typography>
        </CardContent>
      </Card>
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__infoStats__card--title" color="textSecondary">
            Recovered
          </Typography>
          <Typography className="infoStats__infoStats__card--cases" variant="h5">
            {recovered > 0 ? (
              <CountUp start={0} end={recovered} duration={2.5} separator="," />
            ) : (
              'No data'
            )}
          </Typography>
        </CardContent>
      </Card>
      <Card className="infoStats__card">
        <CardContent>
          <Typography className="infoStats__infoStats__card--title" color="textSecondary">
            Deaths
          </Typography>
          <Typography className="infoStats__infoStats__card--cases" variant="h5">
            {deaths > 0 ? (
              <CountUp start={0} end={deaths} duration={2.5} separator="," />
            ) : (
              'No data'
            )}
          </Typography>
        </CardContent>
      </Card>
    </div>
    <div className="statsFooter">
      Last update {new Date(updated).toDateString()} · Source:
      <a
        className="statsFooter__source"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/disease-sh/API"
      >
        <span className="statsFooter__source--name"> disease-sh</span>
      </a>
    </div>
  </div>
);

Cards.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Cards;
