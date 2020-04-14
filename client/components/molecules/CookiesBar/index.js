import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Close } from "/client/components/icons";
import { FlexBox, IconButton } from "/client/components/atoms";
import "./styles.scss";
import CookieConsent from "react-cookie-consent";
import { Link } from "/client/components/atoms";
const CookiesBar = ({}) => {
  if (!localStorage.getItem("cookieBannersDisplayed")) {
    return (
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        cookieName="zNotesCookies"
        style={{ background: "#383838" }}
        buttonStyle={{
          color: "#FFFFFF",
          fontSize: "13px",
          backgroundColor: "#DA1D56",
          borderRadius: "100px",
          // paddingLef: "5px",
          // paddingRight: "5px"
          width: "80px",
        }}
        expires={365}
        debug={true}
        //  acceptOnScroll={true}
        onAccept={({ acceptedByScrolling }) => {
          localStorage.setItem("cookieBannersDisplayed", "true");
          // if (acceptedByScrolling) {
          //     // triggered if user scrolls past threshold
          //     alert("Accept was triggered by user scrolling");
          // } else {
          //     alert("Accept was triggered by clicking the Accept button");
          // }
        }}
        // enableDeclineButton
        // onDecline={() => {alert("nay!")}}
      >
        We use cookies to give you the best online experience. By continuing to
        use our website, you agree to our use of cookies in accordance with our{" "}
        <Link className="page_register-link" to="/terms">
          terms of use
        </Link>{" "}
        and{" "}
        <Link className="page_register-link" to="/privacy">
          privacy policy
        </Link>
        .
      </CookieConsent>
    );
  } else return null;
};

CookiesBar.defaultProps = {};

CookiesBar.propTypes = {};

export default CookiesBar;
