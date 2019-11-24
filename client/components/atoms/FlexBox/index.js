import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const FlexBox = ({
  justify,
  justifyBetween,
  justifyEnd,
  align,
  alignEnd,
  column,
  className,
  noShrink,
  fullWidth,
  ...props
}) => {
  const columnCN = column ? 'column' : '';
  const justifyCN = justify ? 'justify-center' : '';
  const alignCN = align ? 'align-center' : '';
  const justifyBetweenCN = justifyBetween ? 'justify-between' : '';
  const justifyEndCN = justifyEnd ? 'justify-end' : '';
  const alignEndCN = alignEnd ? 'align-end' : '';
  const fullWidthCN = fullWidth ? 'full-width' : '';
  const noShrinkCN = noShrink ? 'no-shrink' : '';
  const fullCN = `atom_flexbox ${fullWidthCN} ${columnCN} ${justifyCN} ${alignCN} ${justifyBetweenCN} ${justifyEndCN} ${alignEndCN} ${noShrinkCN} ${className}`;

  return (
    <div
      className={fullCN}
      {...props}
    />
  );
};

FlexBox.propTypes = {
  className: PropTypes.string,
  column: PropTypes.bool,
  justify: PropTypes.bool,
  align: PropTypes.bool,
  noShrink: PropTypes.bool,
  justifyBetween: PropTypes.bool,
  fullWidth: PropTypes.bool,
  justifyEnd: PropTypes.bool,
  alignEnd: PropTypes.bool,
};

FlexBox.defaultProps = {
  className: '',
  column: false,
  justify: false,
  align: false,
  noShrink: false,
  justifyBetween: false,
  fullWidth: false,
  justifyEnd: false,
  alignEnd: false,
};

export default FlexBox;
