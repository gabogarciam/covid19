import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import './Cards.scss';

const Cards = ({ title, cases, today, onClick, active, isRed }) => (
  <Card
    className={`infoStats__card ${active && 'infoStats__card--selected'} ${
      isRed && 'infoStats__card--red'
    }`}
    onClick={onClick}
  >
    <CardContent>
      <Typography className="infoStats__card--title" color="textSecondary">
        {title}
      </Typography>
      <Typography
        className={`infoStats__card__cases ${!isRed && 'iinfoStats__card__cases--green'}`}
        variant="h5"
      >
        {cases >= 0 ? <CountUp start={0} end={cases} duration={2.5} separator="," /> : 'No data'}
      </Typography>
      <Typography className="infoStats__card__today">
        {today > 0 ? 'Today +' : ''}
        {today > 0 ? <CountUp start={0} end={today} duration={2.5} separator="," /> : 'No data'}
      </Typography>
    </CardContent>
  </Card>
);

export default Cards;
