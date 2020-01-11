import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import ProcessStep from './ProcessStep';
import DirectionLine from './DirectionLine';
import { FlexBox, Text } from '/client/components/atoms';
import './styles.scss';

const Process = ({ steps }) => {
  const [text, setText] = useState('');

  const showText = (index) => () => {
    setText(steps[index].text);
  };

  const resetText = () => {
    setText('');
  };

  return (
    <FlexBox column justify className="pages_process-steps-container">
      <FlexBox align fullWidth>
        {steps.map((stepData, index) => (
          <Fragment key={stepData.text}>
            <ProcessStep
              {...stepData}
              resetText={resetText}
              bottom={index % 2 === 0}
              showText={showText(index)}
            />
            { index !== steps.length - 1
              ? <DirectionLine down={index % 2 === 1} />
              : null}
          </Fragment>
        ))}
      </FlexBox>
      {text
        && (
        <FlexBox align className="page_process-steps-text">
          <Text>{text}</Text>
        </FlexBox>
        )}
    </FlexBox>
  );
};

Process.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Process;
