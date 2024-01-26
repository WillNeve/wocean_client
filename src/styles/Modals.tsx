import { staticComponentProps } from '../types/types';


export const ModalPopup: React.FC<staticComponentProps> = ({children}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6
                    border border-gray-500 rounded-lg gradient-brighten text-gray-300
                    min-w-[320px]">
      {children}
    </div>
  );
}
