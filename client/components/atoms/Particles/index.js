import React from 'react';
import PropTypes from 'prop-types';
import RParticles from 'react-particles-js';
import particleParams from './particle-config.json';

const Particles = ({ className }) => (
  <RParticles
    width="100vw"
    height="calc(100vh - 85px)"
    className={className}
    params={particleParams}
  />
);

Particles.defaultProps = {
  className: '',
};

Particles.propTypes = {
  className: PropTypes.string,
};

export default Particles;
