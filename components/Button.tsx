import { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  title: string;
  bgColor?: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  textColor?: string;
  handleClick?: MouseEventHandler;
};

const Button = ({
  title,
  bgColor,
  leftIcon,
  rightIcon,
  isSubmitting,
  type,
  textColor,
  handleClick,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting || false}
      className={`flexCenter gap-3 px-2 py-2 md:px-4 md:py-3 
    ${textColor ? textColor : "text-white"} 
    ${
      isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
    } rounded-xl text-sm font-medium self-start max-md:w-full`}
      onClick={handleClick}
    >
      {" "}
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  );
};

export default Button;
