import React, { createRef, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IsWebpSupportContext from '../contexts/IsWebpSupportContext';

export default function FlexImg({ src, srcPng, imageRef, className, alt }) {
  const isWebpSupportDevice = useContext(IsWebpSupportContext);
  const [currentSrc, setCurrentSrc] = useState(src);
  useEffect(() => {
    if (isWebpSupportDevice) {
      setCurrentSrc(src);
    } else {
      setCurrentSrc(srcPng);
    }
  }, [isWebpSupportDevice, src, srcPng]);
  return (
    <img
      ref={imageRef}
      className={className}
      src={currentSrc}
      onError={() => {
        if (currentSrc !== srcPng) {
          setCurrentSrc(srcPng);
        }
      }}
      alt={alt}
    />
  );
}

FlexImg.propTypes = {
  src: PropTypes.string.isRequired,
  srcPng: PropTypes.string.isRequired,
  imageRef: PropTypes.instanceOf(Object),
  className: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

FlexImg.defaultProps = {
  imageRef: createRef(),
};
