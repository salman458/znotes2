import React from 'react';
import PropTypes from 'prop-types';

const PageContainer = ({
  children,
  className,
  ...props
}) => (
  <div
    className={`atom_page-container ${className}`}
    {...props}
  >
    {children}
  </div>
);

PageContainer.defaultProps = {
  className: '',
};

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  className: PropTypes.string,
};

export default PageContainer;
