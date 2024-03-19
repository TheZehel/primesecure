const LoadingAnimation = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={style}>
    <circle
      color="#03a8db"
      fill="none"
      stroke="#03a8db"
      strokeWidth="0.5"
      cx="100"
      cy="100"
      r="1"
    >
      <animate
        attributeName="r"
        calcMode="spline"
        dur="2s"
        values="1;80"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-width"
        calcMode="spline"
        dur="2s"
        values="0;25"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-opacity"
        calcMode="spline"
        dur="2s"
        values="1;0"
        keyTimes="0;1"
        keySplines="0 .2 .5 1"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default LoadingAnimation;
