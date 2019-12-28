import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
} from '@material-ui/core/styles';
import {
  Text,
  FlexBox,
} from '/client/components/atoms';
import Subjects from './subjectData';
import './styles.scss';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: (props) => `linear-gradient(-40deg, ${props.primaryColor} 70%, ${props.secondaryColor} 70%)`,
  },
}));

const SubjectCard = ({
  code,
  subject,
  subjectName,
}) => {
  const { color, icon: Icon = () => null } = Subjects[subject.toLowerCase()] || {};
  const primaryColor = color || '#D82057';
  const secondaryColor = lighten(primaryColor, 0.5);
  const classes = useStyles({ primaryColor, secondaryColor });
  return (
    <FlexBox
      column
      justify
      align
      className={clsx(classes.root, 'subject-card-container')}
    >
      <div className="subject-card-icon">
        <Icon />
      </div>
      <div className="subject-card-text">
        <Text className="subject-card-code">{code}</Text>
        <Text className="subject-card-subject">{subjectName}</Text>
      </div>
    </FlexBox>
  );
};

SubjectCard.propTypes = {
  subject: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default SubjectCard;
