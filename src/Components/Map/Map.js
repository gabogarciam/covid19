import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { showDataOnMap } from '../../util/util';
import './Map.scss';

const Map = ({ countries, casesType, center, zoom }) => (
  <div className="map">
    <LeafletMap center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries, casesType)}
    </LeafletMap>
  </div>
);

Map.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object).isRequired,
  // center: PropTypes.objectOf(PropTypes.any).isRequired,
  zoom: PropTypes.number.isRequired,
};

export default Map;
