import { staticComponentProps } from '../types/types';

export const ButtonCTA: React.FC<staticComponentProps> = ({ children }) => {
  return (
    <a
      type="button"
      href='/signup'
      aria-label="Sign Up Button"
      className="
                 bg-indigo-600
                 w-fit p-4 m-4
                 hover:bg-indigo-500
                 rounded-md
                 border
                 border-gray-500
                 font-medium
                 text-gray-200
                 cursor-pointer
                 transition"
    >
      {children}
    </a>
  );
};

interface ButtonFormProps extends staticComponentProps {
  // Add your custom props here
  className?: string,
}

export const ButtonForm: React.FC<ButtonFormProps> = ({ children, className }) => {
  return (
    <button
      type="submit"
      className={`
                 bg-indigo-600
                 w-fit p-4 m-4
                 hover:bg-indigo-500
                 rounded-md
                 border
                 border-gray-500
                 font-medium
                 text-gray-200
                 cursor-pointer
                 transition
                 ${className}`}
    >

      {children}
    </button>
  );
};
