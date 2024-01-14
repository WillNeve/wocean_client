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
        bg-sky-600
        w-fit p-4 m-4
        hover:bg-sky-500
        rounded-md
        border
        border-gray-500
        font-medium
        text-gray-200
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
