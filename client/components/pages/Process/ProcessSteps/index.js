import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProcessStep from './ProcessStep';
import DirectionLine from './DirectionLine';
import { FlexBox } from '/client/components/atoms';
import './styles.scss';

const Process = ({ steps }) => (
  <FlexBox align className="pages_process-steps-container">
    {steps.map((stepData, index) => (
      <Fragment key={stepData.text}>
        <ProcessStep
          {...stepData}
          bottom={index % 2 === 0}
        />
        { index !== steps.length - 1
          ? <DirectionLine down={index % 2 === 1} />
          : null}
      </Fragment>
    ))}
  </FlexBox>
);

Process.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Process;
