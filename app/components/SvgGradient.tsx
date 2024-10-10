import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface SvgGradientProps {
  id: string;
  icon: IconProp;
  colors: Array<any>;
  iconClass?: string;
  className?: string;
}

const SvgGradient = ({
  id,
  icon,
  colors,
  className = "",
  iconClass = "w-4 h-4",
}: SvgGradientProps) => {
  const style: any = { ["--fillsvg"]: `url(#${id})` };
  return (
    <svg className={`linear-gradient-svg w-4 h-4 ${className}`} style={style}>
      <FontAwesomeIcon icon={icon} className={`${iconClass}`} />
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          {colors?.map((color: any, key: number) => (
            <stop {...color} key={key} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgGradient;
