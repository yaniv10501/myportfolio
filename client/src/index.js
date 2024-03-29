import React, { useCallback, useMemo } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import App from './components/App';

let root;
const domNode = document.getElementById('root');
function Container() {
  const insertCss = useCallback((...styles) => {
    const removeCss = styles.map((style) => style?._insertCss());
    return () => removeCss.forEach((dispose) => dispose());
  }, []);
  return (
    <StyleContext.Provider value={useMemo(() => ({ insertCss }))}>
      <App />
    </StyleContext.Provider>
  );
}
if (domNode.hasChildNodes()) {
  root = hydrateRoot(domNode, <Container />);
} else {
  root = createRoot(domNode);
  root.render(<Container />);
}
