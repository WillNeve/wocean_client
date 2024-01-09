import React from 'react';
import { staticComponentProps } from '../types/types.ts';

//icon
import { MdOutlineEventNote } from "react-icons/md";

interface NavbarProps {
  currentPath: string;
}

import { useLocation } from 'react-router-dom';

const Navbar: React.FC<NavbarProps> = ({currentPath}) =>  {
  return (
    <div className='sticky top-0 left-0 w-full p-2 px-6 md:px-12
                    border-b
                  border-gray-500
                  bg-indigo-900 text-gray-200'>
      <div className='flex mx-auto justify-between items-center w-full max-w-screen-xl'>
        <MdOutlineEventNote className='text-2xl'/>
        <ul className='flex gap-x-4 justify-normal'>
          <li>
            <a href="#" className='border text-gray-200 bg-indigo-600 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>New Note</a> {/* add links */}
          </li>
          <li>
            <a href="#" className='border text-gray-300 border-gray-600 hover:border-gray-400 cursor-pointer p-1 rounded-md'>My Notes</a> {/* add links */}
          </li>
          <li>
            Path: {currentPath}
          </li>
        </ul>
      </div>
    </div>
  )
}

const ButtonCTA: React.FC<staticComponentProps> = ({ children }) => {
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

function Root() {
  const location = useLocation().pathname;
  return (
    <div className="App w-full h-lvh bg-gradient-to-tr from-slate-900 to-slate-800">
      <Navbar currentPath={location}/>
      <div className="fixed w-fit text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className='font-bold text-5xl mt-5 text-gray-200'>Nocean</h1>
        <p className='mt-2'>Start taking notes like never before</p>
        <ButtonCTA>
        Create your account
        </ButtonCTA>
      </div>
    </div>
  );
}

export default Root;
