import React from "react";

interface IProps {
  style: string;
  handleClick: () => void;
  disabled?: boolean;
  iconLeft?: boolean;
  text: string;
  icon?: React.ReactNode;
  innerRef?: React.MutableRefObject<HTMLButtonElement | null>;
}
const Button = ({
  innerRef,
  handleClick,
  style,
  text,
  icon,
  disabled,
  iconLeft,
}: IProps) => {
  return (
    <button
      disabled={disabled}
      ref={innerRef}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className={style}
      style={disabled ? { opacity: 0.2 } : undefined}
    >
      {iconLeft && icon ? icon : ""}
      {text}
      {!iconLeft && icon ? icon : ""}
    </button>
  );
};

export default Button;
