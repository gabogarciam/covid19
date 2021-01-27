import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const buildChartData = (data, casesType = 'cases') => {
  const chartData = [];
  let lastDataPoint;

  Object.keys(data[casesType]).forEach((date) => {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  });
  return chartData;
};

const Chart = (casesType) => {
  const [historyData, setHistoryData] = useState({});

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=100')
      .then((response) => response.json())
      .then((data) => {
        const chartData = buildChartData(data);
        setHistoryData(chartData);
      });
  }, [casesType]);

  return (
    <div>
      {historyData?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                borderColor: '#CC1034',
                data: historyData,
              },
            ],
          }}
          options={{
            legend: { display: false },
            elements: {
              point: {
                radius: 0,
              },
            },
            maintainAspectRatio: false,
            tooltips: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label(tooltipItem) {
                  return numeral(tooltipItem.value).format('+0,0');
                },
              },
            },
            scales: {
              xAxes: [
                {
                  type: 'time',
                  time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll',
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  ticks: {
                    callback(value) {
                      return numeral(value).format('0a');
                    },
                  },
                },
              ],
            },
          }}
        />
      )}
    </div>
  );
};

Chart.propTypes = {
  casesType: PropTypes.string.isRequired,
};

export default Chart;
