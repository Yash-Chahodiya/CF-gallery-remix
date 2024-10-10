export interface AnimateErrorProps {
  circleClass?: string;
  lineClass?: string;
  dotClass?: string;
  color?: string;
  strokeCircleWidth?: string;
  strokeLineWidth?: string;
}
// Note: Important for svg animation (animation isn't working when we import svg).
export const AnimateError = ({
  circleClass = "",
  lineClass = "",
  dotClass = "",
  color = "#223558",
  strokeCircleWidth = "8",
  strokeLineWidth = "8",
}: AnimateErrorProps) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <circle
        className={`path animate-dash-circle ${circleClass}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeCircleWidth}
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <line
        className={`path line animate-dash-line ${lineClass}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeLineWidth}
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="66.4"
        y1="33"
        x2="66.4"
        y2="75.3"
      />
      <circle
        fill={color}
        className={`path line animate-dash-line ${dotClass}`}
        strokeMiterlimit="10"
        cx="66.4"
        cy="94.1"
        r="5"
      />
    </svg>
  );
};

export default AnimateError;
