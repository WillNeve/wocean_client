import React, { ReactNode } from 'react'
import { GoGraph, GoGear, GoFileDirectory } from "react-icons/go";


interface MenuButtonProps {
  children: ReactNode
}

const MenuButton: React.FC<MenuButtonProps> = ({children}) => {
  return (
    <button type='button' className=' font-normal hover:bg-blue-500 hover:text-gray-200 flex gap-x-4 items-center p-2 rounded-md'>{children}</button>
  );
}

const DividerBar = () => {
  return (
    <div className='h-[1px] mb-2 bg-gray-400'></div>
  );
}

const MenuSide: React.FC = () => {

  return (
    <div className="menu h-100 px-4 mt-2 text-gray-400 font-light">
      <div className="submenu">
        <h2 className='text-sm'>Notes</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
          <MenuButton><GoFileDirectory className='text-lg'/>All</MenuButton>
        </ul>
      </div>
      <DividerBar />
      <div className="submenu">
        <h2 className='text-sm'>Tools</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
          <MenuButton><GoGraph className='text-lg'/>Overview</MenuButton>
        </ul>
      </div>
      <DividerBar />
      <div className="submenu">
        <h2 className='text-sm'>Settings</h2>
        <ul className='my-4 flex flex-col gap-y-1'>
        <MenuButton><GoGear className='text-lg'/>Account</MenuButton>
        </ul>
      </div>
    </div>
  )
}

export default MenuSide;
