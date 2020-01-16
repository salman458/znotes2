import React from 'react';
import PropTypes from 'prop-types';

// NOTE: Done because maybe later we will
// need to customize this
const Suggestion = ({
  name,
  levelName,
  boardName,
  subjectName,
}) => (
  <span>
    {`${name} ${subjectName || ''} ${levelName || ''} ${boardName || ''}`.trim()}
  </span>
);

Suggestion.defaultProps = {
  levelName: '',
  boardName: '',
  subjectName: '',
};

Suggestion.propTypes = {
  name: PropTypes.string.isRequired,
  levelName: PropTypes.string,
  boardName: PropTypes.string,
  subjectName: PropTypes.string,
};

export default Suggestion;
