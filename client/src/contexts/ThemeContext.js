import React, { createContext, useContext } from 'react';
import PropsTypes from 'prop-types';

const ThemeContext = createContext();

const useThemeContext = () => useContext(ThemeContext);

function ThemeContextProvider(props) {
  const { value, children } = props;
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { useThemeContext, ThemeContextProvider };

ThemeContextProvider.propTypes = {
  value: PropsTypes.shape({ theme: PropsTypes.string, handleSetTheme: PropsTypes.func }).isRequired,
  children: PropsTypes.node.isRequired,
};
