import React from 'react'

import { staticComponentProps } from '../types/types';

export const LoaderRect: React.FC<staticComponentProps>= ({children, className}) => {
  return (
    <div className={`${className} loader overflow-hidden`}><div>{children}</div></div>
  )
}

interface loaderProps extends staticComponentProps {
  active: boolean
}


export const LoaderGroup: React.FC<loaderProps> = ({children, className, active}) => {
  return (
    <div className={`${className} loader-group ${active ? 'active' : ''}`}>{children}</div>
  )
}
