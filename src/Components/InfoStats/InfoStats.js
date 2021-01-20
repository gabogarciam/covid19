import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoStats.scss';

const Stats = ({ title, cases, total }) => (
  <Card className="infoStats">
    <CardContent>
      <Typography className="infoStats__title" color="textSecondary">
        {title}
      </Typography>
      <h2 className="infoStats__cases">{cases}</h2>
      <Typography className="infoStats__total" color="textSecondary">
        {total} Total
      </Typography>
    </CardContent>
  </Card>
);

export default Stats;
