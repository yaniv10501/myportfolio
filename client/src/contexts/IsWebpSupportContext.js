import React, { createContext, useContext } from 'react';
import PropsTypes from 'prop-types';

const IsWebpSupportContext = createContext();

const useIsWebpSupport = () => useContext(IsWebpSupportContext);

function IsWebpSupportProvider(props) {
  const { value, children } = props;
  return <IsWebpSupportContext.Provider value={value}>{children}</IsWebpSupportContext.Provider>;
}

export { useIsWebpSupport, IsWebpSupportProvider };

IsWebpSupportProvider.propTypes = {
  value: PropsTypes.bool.isRequired,
  children: PropsTypes.node.isRequired,
};
