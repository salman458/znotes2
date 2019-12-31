import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FlexBox, Text, Link } from '/client/components/atoms';
import Icons from './Icons';

import useStyles from './styles';

const Footer = ({
  open,
  withSidebar,
  sidebarWidth,
}) => {
  const classes = useStyles({ sidebarWidth, withSidebar });
  return (
    <FlexBox
      align
      justifyBetween
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Text>
Made with
        {' '}
        {'<3'}
        {' '}
by Znotes team
      </Text>
      <Icons />
      <FlexBox align justifyBetween>
        <Link to="#">Terms of Use</Link>
        {' '}
        <Text>Copyright @ 2019 ZNotes</Text>
      </FlexBox>
    </FlexBox>
  );
};

Footer.propTypes = {
  sidebarWidth: PropTypes.number.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Footer;
