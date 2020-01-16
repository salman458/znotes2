import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FlipNumbers from 'react-flip-numbers';

import {
  Highlighted,
  FlexBox,
  Image,
  Title,
} from '/client/components/atoms';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

const Hits = ({ progress }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        opacity: `calc(${progress})`,
      }}
      className="page_hits-container"
    >
      <div className={classes.toolbar} />
      <FlexBox
        column
        align
        justify
        className="page_hits-wrapper"
        fullWidth
      >
        <Title
          variant="h3"
          style={{
            transform: `translate3d(0, calc(-25vh + 20vh * ${progress}), 0)`,
          }}
          className="page_hits-title"
        >
        The
          {' '}
          <Highlighted
            color="primary"
          >
            ultimate
          </Highlighted>
          {' '}
        revision platform with over
        </Title>
        <FlipNumbers
          height={120}
          width={90}
          perspective={2000}
          color="#EE285D"
          background="transparent"
          play
          numbers="150000"
        />
        <Title
          variant="h3"
          style={{
            transform: `translate3d(0, calc(25vh - 20vh * ${progress}), 0)`,
          }}
        >
        total hits
        </Title>
        <Image src="/img/map.svg" className={clsx('page_hits-background-svg', progress > 0.3 && 'animate')} />
      </FlexBox>
    </div>
  );
};

Hits.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default Hits;
