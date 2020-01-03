import React, { useState, useEffect, useContext } from 'react';
import {
  GetPermissionLevel,
  USER_PERMISSIONS,
} from '/client/utils';
import PropTypes from 'prop-types';

const PermissionContext = React.createContext(USER_PERMISSIONS.visiting);

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};

export const PermissionProvider = ({ children }) => {
  const [role, setRole] = useState(USER_PERMISSIONS.visiting);

  useEffect(() => {
    const fetchPermissionLevel = async () => {
      const currentPermission = await GetPermissionLevel();
      setRole(currentPermission);
    };
    fetchPermissionLevel();
  }, []);

  return (
    <PermissionContext.Provider value={role}>
      {children}
    </PermissionContext.Provider>
  );
};

PermissionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.node,
  ]).isRequired,
};
