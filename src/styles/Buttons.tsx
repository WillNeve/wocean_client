import { forwardRef } from 'react';
import { staticComponentProps } from '../types/types';
import './buttons.css';

interface ButtonFormProps extends staticComponentProps {
  // Add your custom props here
  className?: string,
}

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ButtonFormRender: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonFormProps> = (
  { children, className},
  buttonRef
) => {
  return (
    <button
      ref={buttonRef}
      type="submit"
      className={`
        flex
        items-center
        gap-x-4
        bg-white
        w-fit p-4 m-4
        hover:bg-waveLight-600
        rounded-md
        border
        border-gray-500
        font-medium
        text-gray-600
        cursor-pointer
        transition
        button-loading
        ${className}`}
    >
      {children}
      <AiOutlineLoading3Quarters />
    </button>
  );
};

export const ButtonForm = forwardRef<HTMLButtonElement, ButtonFormProps>(ButtonFormRender);
