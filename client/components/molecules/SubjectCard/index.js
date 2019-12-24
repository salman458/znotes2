import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  makeStyles,
} from '@material-ui/core/styles';
import {
  Text,
  FlexBox,
} from '/client/components/atoms';
import './styles.scss';

const useStyles = makeStyles(() => ({
  '@keyframes hoverEffect': {
    from: {
      backgroundPosition: '39% 25%',
    },
    to: {
      backgroundPosition: '0% 0%',
    },
  },
  root: {
    backgroundImage: (props) => `linear-gradient(-40deg, ${props.primaryColor} 70%, ${props.secondaryColor} 70%)`,
    backgroundPosition: '39% 25%',
    '&:hover': {
      animation: '$hoverEffect 0.5s cubic-bezier(0.4, 0, 0.6, 1)',
      backgroundPosition: '0% 0%',
    },
  },
}));

const SubjectCard = ({
  icon,
  primaryColor,
  secondaryColor,
  code,
  subjectName,
}) => {
  const classes = useStyles({ primaryColor, secondaryColor });
  return (
    <FlexBox
      column
      justify
      align
      className={clsx(classes.root, 'subject-card-container')}
    >
      <div className="subject-card-icon">{icon}</div>
      <div className="subject-card-text">
        <Text className="subject-card-code">{code}</Text>
        <Text className="subject-card-subject">{subjectName}</Text>
      </div>
    </FlexBox>
  );
};

SubjectCard.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
  primaryColor: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default SubjectCard;
