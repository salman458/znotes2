import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const Layout = ({ className, ...props }) => (
  <div className={`molecule_layout ${className}`} {...props} />
);

Layout.defaultProps = {
  className: '',
};

Layout.propTypes = {
  className: PropTypes.string,
};

export default Layout;
