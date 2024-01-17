import React, { ReactNode, useContext } from 'react'
import { GoGraph, GoGear, GoFileDirectory } from "react-icons/go";
import { ViewNameContext } from '../root';


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
            className={`font-normal ${name === viewName ? 'bg-sky-500 text-gray-200' : ''}
                        hover:bg-sky-500 hover:text-gray-200
                        flex gap-x-4 justify-center min-[700px]:justify-start items-center p-2 rounded-md`}
            >
      {children}
    </button>
  );
}

const DividerBar = () => {
  return (
    <div className='h-[1px] mb-2 bg-gray-400'></div>
  );
}

const MenuSide: React.FC = () => {
  const {viewName, setViewName} = useContext(ViewNameContext)

  const handleViewChange = (viewName: string) => {
    if (setViewName) {
      setViewName(viewName);
    }
  }

  return (
    <div className="menu h-100 px-2 min-[700px]:px-4 mt-2 text-gray-400 font-light">
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
  )
}

export default MenuSide;
