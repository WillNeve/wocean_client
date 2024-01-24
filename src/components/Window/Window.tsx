import React, { ReactNode } from 'react'
import NavBar from '../NavBar/NavBar';

interface IWindow {
  children: ReactNode,
  requestNavigate: (path: string) => void,
  flexCol?: boolean,
}

const Window: React.FC<IWindow> = ({children, requestNavigate, flexCol}) => {

  return (
    <div className='flex flex-col h-svh w-svw'>
      <NavBar requestNavigate={requestNavigate}/>
      <div className='page my-5 px-4 mx-auto w-full max-w-5xl h-[60%] flex-grow'>
        <div className="dashboard-inner relative h-full text-gray-400 font-medium rounded-lg overflow-hidden shadow-2xl shadow-waveLight-500/10">
          <div className={`relative flex ${flexCol ? 'flex-col' : 'flex-row'} rounded-lg overflow-hidden shadow-inner h-full
                            border border-gray-600 gradient-brighten`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Window;
