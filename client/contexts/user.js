import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Request } from "/client/utils";

const UserContext = React.createContext({});

export const useUserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = async id => {
    const data = await Request({
      action: "getUserData",
      body: id,
    });
    return data;
  };

  useEffect(() => {
    Tracker.autorun(async () => {
      const userData = Meteor.user() || {};
      if (userData && userData._id) {
        const userGetData = await getUserData(userData._id);
        const data = await setUser(userGetData[0]);
      } else {
        setUser(userData);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};
