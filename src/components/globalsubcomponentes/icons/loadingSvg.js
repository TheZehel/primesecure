import React from 'react';

// Update to handle size prop
const LoadingAnimation = ({ size = 24 }) => {
  // Convert size to number if it's a string
  const sizeValue = typeof size === 'string' ? parseInt(size) : size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={sizeValue}
      height={sizeValue / 3}
    >
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="2"
        r="2"
        cx="2"
        cy="100"
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="2s"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="2"
        r="2"
        cx="2"
        cy="100"
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="2s"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="2"
        r="2"
        cx="2"
        cy="100"
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="2s"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="2"
        r="2"
        cx="2"
        cy="100"
      >
        <animate
          attributeName="cx"
          calcMode="spline"
          dur="2s"
          values="35;165;165;35;35"
          keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
    </svg>
  );
};

export default LoadingAnimation;
