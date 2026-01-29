/**
 * Spinner Component
 * Circular progress indicator (indeterminate)
 * Basado en Material Design 3 - Progress Indicators
 */
function Spinner({ size = 48, className = "" }) {
  return (
    <div className="spinner-wrapper">
      <div
        className={`spinner-container ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#006FE8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="94 188"
          />
        </svg>
      </div>
    </div>
  );
}

export default Spinner;
