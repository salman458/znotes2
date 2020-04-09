import React from 'react';
import PropTypes from 'prop-types';
import {
  Highlighted,
  FlexBox,
  Title,
} from '/client/components/atoms';
import {
  Diamond,
  Learning,
  Perfection,
  Proofread,
  Validate,
  Touch,
} from '/client/components/icons';
import ProcessSteps from './ProcessSteps';
import { HelperScroll } from '/client/components/molecules';


const steps = [
  {
    icon: Touch,
    color: '#26B3E8',
    text: 'High achieving students from across the world get in touch and decide to dedicate hours of time in constructing the first set of draft notes for a subject',
  },
  {
    icon: Validate,
    color: '#26B3E8',
    text: 'We get in touch with other students and content specialists to validate the content and thoroughly check against the syllabus',
  },
  {
    icon: Diamond,
    color: '#26B3E8',
    text: 'The team at ZNotes work with the students to bring the signature look and feel to the notes making sure they are beautiful yet concise',
  },
  {
    icon: Proofread,
    color: '#26B3E8',
    text: 'Final checks are conducted and the notes are proofread before being added to the website',
  },
  {
    icon: Perfection,
    color: '#26B3E8',
    text: 'Always striving for perfection! We keep a close eye on comments and record any typos or mistakes found, to correct and update immediately',
  },
  {
    icon: Learning,
    color: '#26B3E8',
    className: 'bigText',
    text: 'A huge community of learners on Discord study together, use the revision notes and help each other to make sure you do the very best on your exams. Join the community!',
  },
];

const Process = ({ progress,onDownPress }) => (
  <FlexBox
    align
    column
    fullWidth
    justifyBetween
    className="page_process-container"
    style={{
      // opacity: `calc(${progress + 0.5})`,
      opacity: `calc(1 - 0.6 * ${progress})`,
    }}
  >
    <Title
      variant="h3"
      gutterBottom
      style={{
        // transform: `translate3d(0, calc(10vh + 10vh * ${progress}), 0)`,
        transform: `translate3d(0, calc(15vh + 10vh * ${progress}), 0)`,
      }}
    >
      So
      {' '}
      <Highlighted color="primary">how</Highlighted>
      {' '}
      does it work?
    </Title>
    <ProcessSteps steps={steps} />
    <HelperScroll onDownPress={onDownPress}/>
  </FlexBox>
);

Process.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Process;
