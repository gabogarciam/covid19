import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

const Table = ({ countries }) => (
  <div className="container">
    <table className="container__table">
      <tbody className="container__table--tbody">
        {countries.map(({ country, cases }) => (
          <tr key={country}>
            <td>{country}</td>
            <td>{cases}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  countries: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Table;
