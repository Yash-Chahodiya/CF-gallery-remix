export interface AnimateCheckmarkProps {
  circleClass?: string;
  pathClass?: string;
  color?: string;
  strokeCircleWidth?: string;
  strokePathWidth?: string;
}
// Note: Important for svg animation (animation isn't working when we import svg).
export const AnimateCheckmark = ({
  circleClass,
  pathClass,
  color = "#223558",
  strokeCircleWidth = "8",
  strokePathWidth = "8",
}: AnimateCheckmarkProps) => {
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
      <polyline
        className={`path check animate-dash-check ${pathClass}`}
        fill="none"
        stroke={color}
        strokeWidth={strokePathWidth}
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </svg>
  );
};

export default AnimateCheckmark;
