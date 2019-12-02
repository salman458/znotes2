import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const DirectionLine = ({ down }) => (
  <div
    className="arrow"
    style={{ transform: `rotate(${down ? '' : '-'}45deg)` }}
  />
);

DirectionLine.defaultProps = {
  down: false,
};

DirectionLine.propTypes = {
  down: PropTypes.bool,
};

export default DirectionLine;
