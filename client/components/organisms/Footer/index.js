import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Highlighted,
  FlexBox,
  Image,
  Title,
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
      fullWidth
      column
      justify
      align
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Title variant="h4" gutterBottom>
        Join our community and
        {' '}
        <Highlighted color="primary">connect</Highlighted>
        {' '}
        with us!
      </Title>
      <Icons />
      <FlexBox align justifyBetween fullWidth>
        <FlexBox align>
          <Image className={classes.footerLogo} src="/img/logo_black.png" />
          <div>
            <Text>Copyright @ 2020, ZNotes Inc.</Text>
            <Text>All rights reserved.</Text>
          </div>
        </FlexBox>
        <FlexBox column>
          <Link to="#">Terms of Use</Link>
          <Link to="#">Privacy Policy</Link>
        </FlexBox>
      </FlexBox>
      <Text>
Made with
        {' '}
        <span role="img" aria-label="heart">❤️</span>
        {' '}
by
        {' '}
        <Image className={classes.inlineLogo} src="/img/logo.png" />
        {' '}
team
      </Text>
    </FlexBox>
  );
};

Footer.propTypes = {
  sidebarWidth: PropTypes.number.isRequired,
  withSidebar: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Footer;
