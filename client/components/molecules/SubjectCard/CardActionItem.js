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
import { SanitizeName } from '/client/utils';
import Subjects from './subjectData';
import './styles.scss';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: (props) => `linear-gradient(-40deg, ${props.primaryColor} 70%, ${props.secondaryColor} 70%)`,
  },
}));

const CardActionItem = ({
  code,
  subject,
  subjectName,
}) => {
  const sanitizedSubjectName = SanitizeName(subject);
  const { color, icon: Icon = () => null } = Subjects[sanitizedSubjectName] || {};
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

CardActionItem.propTypes = {
  subject: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default CardActionItem;
