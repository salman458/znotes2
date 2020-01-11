import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FlexBox } from '/client/components/atoms';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
  round: {
    backgroundColor: (props) => props.color,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ProcessStep = ({
  color,
  bottom,
  icon: Icon,
  showText,
  resetText,
}) => {
  const classes = useStyles({ color });
  return (
    <div className={clsx('round_container', bottom ? 'bottom' : 'top')}>
      <FlexBox
        align
        justify
        onMouseEnter={showText}
        onMouseLeave={resetText}
        className={clsx('round', classes.round)}
      >
        <FlexBox align justify className="inner">
          <Icon className="icon" />
        </FlexBox>
      </FlexBox>
    </div>
  );
};

ProcessStep.defaultProps = {
  bottom: false,
  color: '#D82057',
  className: '',
};

ProcessStep.propTypes = {
  bottom: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
  resetText: PropTypes.func.isRequired,
  showText: PropTypes.func.isRequired,
};

export default ProcessStep;
