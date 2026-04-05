export default function Arrow() {
  return (
    <div className="arrow" aria-hidden="true">
      <svg
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Default state (11px version from Figma) */}
        <path
          className="arrow__path arrow__path--default"
          d="M11 5.56383L5.74933 11L4.64537 9.83003L7.8955 6.38556H0V4.73079H8.00528L4.64537 1.16997L5.74933 0L11 5.56383Z"
          fill="currentColor"
        />
        {/* Hover state (14px version from Figma) */}
        <path
          className="arrow__path arrow__path--hover"
          d="M14 5.56383L8.74933 11L7.64537 9.83003L10.8955 6.38556H0V4.73079H11.0053L7.64537 1.16997L8.74933 0L14 5.56383Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}
