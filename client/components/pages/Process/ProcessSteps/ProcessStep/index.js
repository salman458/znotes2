import React from 'react';
import PropTypes from 'prop-types';
import { FlexBox, Text } from '/client/components/atoms';
import './styles.scss';

const ProcessStep = ({
  text,
  color,
  bottom,
  icon: Icon,
  className,
}) => (
  <div className={`round_container ${bottom ? 'bottom' : 'top'}`}>
    {!bottom && <Text className={`text ${className}`}>{text}</Text>}
    <FlexBox
      align
      justify
      className="round"
      style={{ backgroundColor: color }}
    >
      <FlexBox align justify className="inner">
        <Icon className="icon" />
      </FlexBox>
    </FlexBox>
    {bottom && <Text className={`text ${className}`}>{text}</Text>}
  </div>
);

ProcessStep.defaultProps = {
  bottom: false,
  text: '',
  color: '#D82057',
  icon: () => null,
  className: '',
};

ProcessStep.propTypes = {
  bottom: PropTypes.bool,
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.object,
  ]),
};

export default ProcessStep;
