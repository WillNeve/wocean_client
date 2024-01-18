import React, { ReactNode, useContext } from 'react'
import { GoGraph, GoGear, GoFileDirectory } from "react-icons/go";
import { ViewNameContext } from '../root';
import { UserContext } from '../../../auth';


interface MenuButtonProps {
  children: ReactNode,
  onClick: (viewName: string) => void,
  viewName: string,
  name: string
}


const MenuButton: React.FC<MenuButtonProps> = ({children, onClick, name, viewName}) => {
  const handleClick = () => {
    onClick(name)
  }
  return (
    <button type='button'
            onClick={handleClick}
            className={`font-normal ${name === viewName ? 'bg-waveLight-500 font-normal' : ''}
            text-gray-600 hover:bg-waveLight-500 border border-gray-500 hover:font-normal
                        flex gap-x-4 justify-center min-[700px]:justify-start items-center p-2 rounded-md`}
            >
      {children}
    </button>
  );
}

const DividerBar = () => {
  return (
    <div className='h-[1px] mb-2 bg-gray-600'></div>
  );
}


const ViewList = () => {
  const {viewName, setViewName} = useContext(ViewNameContext)

  const handleViewChange = (viewName: string) => {
    if (setViewName) {
      setViewName(viewName);
    }
  }
  return (
    <div className="menu h-100 text-gray-600 font-light">
      <div className="submenu">
        <h2 className='text-sm text-center min-[700px]:text-start'>Notes</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
          <MenuButton onClick={handleViewChange} name={'notes'} viewName={viewName}>
            <GoFileDirectory className='text-lg'/><p className='hidden min-[700px]:block'>All</p>
          </MenuButton>
        </ul>
      </div>
      <DividerBar />
      <div className="submenu">
        <h2 className='text-sm text-center min-[700px]:text-start'>Tools</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
          <MenuButton onClick={handleViewChange} name={'overview'} viewName={viewName}>
            <GoGraph className='text-lg'/><p className='hidden min-[700px]:block'>Overview</p>
          </MenuButton>
        </ul>
      </div>
      <DividerBar />
      <div className="submenu">
        <h2 className='text-sm text-center min-[700px]:text-start'>Settings</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
          <MenuButton onClick={handleViewChange} name={'account'} viewName={viewName}>
            <GoGear className='text-lg'/><p className='hidden min-[700px]:block'>Account</p>
          </MenuButton>
        </ul>
      </div>
    </div>
  );
}



const MenuSide: React.FC = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return (
      <div className='min-w-[85px] w-[20%] min-[700px]:w-[30%] border-r-[1px] bg-gray-100 px-4 py-1 border-gray-600'>
        <div className="hidden top mb-4 min-[700px]:block">
          <h1 className='text-2xl text-gray-700'>Dashboard</h1>
          <p className='font-light text-gray-700'>Welcome, <em className='not-italic'>{user.username}</em></p>
        </div>
        <ViewList />
      </div>
    )
  }
}

export default MenuSide;
