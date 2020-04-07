import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { FlexBox, Text } from "/client/components/atoms";
import { Down } from "/client/components/icons";

import "./styles.scss";

const HelperScroll = ({ className, onDownPress }) => {

  return (
    <div
      onClick={() => {
        onDownPress();
      }}
      style={{ zIndex: 1 }}
    >
      <FlexBox
        column
        align
        justify
        className={clsx("atom_helper-scroll", className)}
      >
        <Text>Scroll Down</Text>
        <Down />
      </FlexBox>
    </div>
  );
};

HelperScroll.defaultProps = {
  className: ""
};

HelperScroll.propTypes = {
  className: PropTypes.string
};

export default HelperScroll;
