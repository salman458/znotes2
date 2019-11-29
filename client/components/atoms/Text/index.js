import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const TextBlock = ({ className, ...props }) => (
  <Typography className={`atom_text-block ${className}`} {...props} />
);

TextBlock.defaultProps = {
  className: '',
};

TextBlock.propTypes = {
  className: PropTypes.string,
};

export default TextBlock;
