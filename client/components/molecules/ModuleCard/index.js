import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  lighten,
  makeStyles,
} from '@material-ui/core/styles';
import {
  Text,
  Link,
  FlexBox,
} from '/client/components/atoms';
import { SanitizeName } from '/client/utils';
import Colors from './moduleColors';
import './styles.scss';

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: (props) => `linear-gradient(-40deg, ${props.primaryColor} 70%, ${props.secondaryColor} 70%)`,
  },
}));

const ModuleCard = ({
  id,
  subjectId,
  moduleName,
  subjectName,
}) => {
  const sanitizedModuleName = SanitizeName(moduleName);
  const moduleLetter = moduleName.split('')[0];
  const colorIndex = Math.floor(Math.random() * Colors.length);
  const primaryColor = Colors[colorIndex] || '#D82057';
  const secondaryColor = lighten(primaryColor, 0.5);
  const classes = useStyles({ primaryColor, secondaryColor });
  const to = `/explore/module/${subjectName}/${sanitizedModuleName}?subjectId=${subjectId}&moduleId=${id}`;
  return (
    <Link to={to} className="molecule_module-card">
      <FlexBox
        column
        justify
        align
        className={clsx(classes.root, 'molecule_module-card-container')}
      >
        <Text className="molecule_module-card-letter">
          {moduleLetter}
        </Text>
        <Text className="molecule_module-card-text">
          {moduleName}
        </Text>
      </FlexBox>
    </Link>
  );
};

ModuleCard.propTypes = {
  id: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
};

export default ModuleCard;
