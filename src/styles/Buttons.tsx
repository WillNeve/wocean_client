import { forwardRef } from 'react';
import { staticComponentProps } from '../types/types';

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
        w-fit p-4 m-4
        rounded-md
        border
        hover:opacity-85
        border-gray-600
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
