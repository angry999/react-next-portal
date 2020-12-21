import cx from "classnames";

const Button = ({
  onClick,
  children,
  noPadding,
  smallPadding,
  unbold,
  center,
  between,
  fontSize,
  className,
  disabled,
  style,
  ...rest
}) => (
  <button
    className={cx(
      "h-12 flex pt-1 items-center rounded-full",
      "transition duration-300 ease-in-out",
      {
        "px-8": !noPadding && !smallPadding,
        "px-4": !noPadding && smallPadding,
        "justify-center": center || !between,
        "justify-between": between,
        "font-bold": !unbold,
        "bg-j-white": !className.includes("bg-"),
        "bg-opacity-25": disabled,
      },
      fontSize || "text-sm",
      className
    )}
    style={style}
    disabled={disabled}
    onClick={() => onClick && onClick()}
    {...rest}
  >
    {children}
  </button>
);

export const ArrowLinkButton = ({
  right,
  up,
  down,
  onClick,
  children,
  className,
}) => (
  <button
    className={cx(
      "leading-7 text-xs text-j-gray",
      {
        "arrow-right": right || (!up && !down),
        "arrow-up": up,
        "arrow-down": down,
      },
      className
    )}
    onClick={() => onClick && onClick()}
  >
    {children}
  </button>
);

export default Button;
