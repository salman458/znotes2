import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Spinner = ({ className, isLoading, type, width, height, color }) => {
  if (isLoading) {
    return (
      <div className={className}>
        <Loader type={type} color={color} height={height} width={width} />
      </div>
    );
  } else return null;
};

Spinner.defaultProps = {
  isLoading: false,
  height: 25,
  width: 25,
  color: "#DA1D56",
  type: "Oval",
  className: "loader"
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default Spinner;
