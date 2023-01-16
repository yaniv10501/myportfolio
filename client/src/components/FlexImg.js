import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIsWebpSupport } from '../contexts/IsWebpSupportContext';

export default function FlexImg({
  src,
  srcSet,
  sizes,
  srcPng,
  imageRef,
  className,
  alt,
  height,
  width,
  style,
}) {
  const isWebpSupportDevice = useIsWebpSupport();
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
      srcSet={srcSet}
      sizes={sizes}
      height={height}
      width={width}
      onError={() => {
        if (currentSrc !== srcPng) {
          setCurrentSrc(srcPng);
        }
      }}
      alt={alt}
      style={style}
    />
  );
}

FlexImg.propTypes = {
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  sizes: PropTypes.string,
  srcPng: PropTypes.string.isRequired,
  imageRef: PropTypes.instanceOf(Object),
  className: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.instanceOf(Object),
};

FlexImg.defaultProps = {
  imageRef: createRef(),
  height: '',
  width: '',
  srcSet: '',
  sizes: '',
  style: {},
};
