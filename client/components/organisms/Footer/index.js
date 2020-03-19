import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  FlexBox,
  Image,
  Text,
  Link,
} from '/client/components/atoms';
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
      //fullWidth
      column
      justify
      align
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Icons />
      <FlexBox align>
        <Image className={classes.footerLogo} src="/img/logo_black.png" />
        <Text className={classes.preserveSpace}>
          {'   '}
          20 Ingram Street, Forest Hills NY,11249, United States
          {'   '}
          (000) 123-4567
          {'   '}
          info@znotes.org
        </Text>
      </FlexBox>
      <FlexBox align className={classes.footerMeta}>
        <Link to="/terms">Terms</Link>
        <Text className={classes.preserveSpace}>
          {'   '}
            |
          {'   '}
        </Text>
        <Link to="/privacy">Privacy</Link>
      </FlexBox>
      <Text className={classes.footerMeta}>© 2020 ZNotes, Inc.</Text>
    </FlexBox>
  );
};

Footer.propTypes = {
  sidebarWidth: PropTypes.number.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Footer;
