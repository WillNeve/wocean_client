import { staticComponentProps } from '../types/types';

export const ModalFade: React.FC<staticComponentProps> = ({children}) => {
  return (
    <div className="min-w-80 md:min-w-96 mx-auto my-5 shadow-sm shadow-gray-100/10 w-fit border border-gray-600 rounded-md gradient-whitespace fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      {children}
    </div>
  )
}


export const ModalClear: React.FC<staticComponentProps> = ({children}) => {
  return (
    <div className="min-w-80 md:min-w-96 mx-auto my-5 shadow shadow-gray-200/20 w-fit border border-gray-600 rounded-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
      {children}
    </div>
  )
}
