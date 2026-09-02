function LoadingDots() {
  return (
    <svg
      className="w-12 text-white"
      viewBox="0 40 60 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </circle>

      <circle fill="currentColor" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>

      <circle fill="currentColor" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
    </svg>
  );
}

export default LoadingDots;