import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './Table.scss';

const Table = ({ countries }) => (
  <div className="container">
    <table className="container__table">
      <tbody className="container__table--tbody">
        {countries.map(({ country, cases }) => (
          <tr key={country}>
            <td>{country}</td>
            <td>{numeral(cases).format('0,0')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  countries: PropTypes.instanceOf(Array).isRequired,
};

export default Table;
