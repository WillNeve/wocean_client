import React, { useState, createContext, ReactElement} from "react";
import { Dispatch, SetStateAction } from 'react';
// types
import { note, toggle } from "../../../types/types";
//components
import { NewNoteTile } from "./Tile";
//icons
import { HiOutlineChevronDoubleLeft } from "react-icons/hi";


interface sideMenuProps {
  children: ReactElement,
  handleNewNote: (note: note) => void,
  folderId: string | null,
}

interface sideMenuContext {
  setSideMenuOpen: Dispatch<SetStateAction<boolean>> | null,
  setSideMenuTempOpen: Dispatch<SetStateAction<boolean>> | null,
  sideMenuOpen: boolean,
  sideMenuTempOpen: boolean,
}

export const SideMenuContext = createContext<sideMenuContext>({ setSideMenuOpen: null, setSideMenuTempOpen: null, sideMenuOpen: true, sideMenuTempOpen: false});


const SideMenu: React.FC<sideMenuProps> = ({handleNewNote, folderId, children}) => {
  const [menuOpen, setMenuOpen] = useState<toggle>(true);
  const [menuTempOpen, setMenuTempOpen] = useState<toggle>(false);

  return (
    <SideMenuContext.Provider value={{ setSideMenuOpen: setMenuOpen, setSideMenuTempOpen: setMenuTempOpen, sideMenuOpen: true, sideMenuTempOpen: false}}>
      <div className="relative sideMenuWrapper py-4 gradient-brighten w-fit h-full border-r  border-gray-600 pr-2"
            onMouseOver={() => setMenuTempOpen(true)}
            onMouseLeave={() => setMenuTempOpen(false)}>
        <div className="top flex justify-end items-center">
          <button type='button'
                  aria-label='toggle side menu'
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`border-none outline-none z-10 p-1 rounded-md transition-transform ${menuOpen ? '' : 'rotate-180 text-waveLight-800'}`}>
              <HiOutlineChevronDoubleLeft className='text-xl'/>
          </button>
        </div>
        <div className={`flex flex-col gap-y-2 items-center h-full transition-all
                          ${menuTempOpen || menuOpen ? 'w-[100px] p-2 opacity-1' : 'w-[0px] p-0 pointer-events-none opacity-0'}
                          overflow-hidden`}>
              <NewNoteTile folder={false}
                          folderId={folderId}
                          insertNewNote={handleNewNote}/>
              <NewNoteTile folder={true}
                          folderId={folderId}
                          insertNewNote={handleNewNote}/>
        </div>
      </div>
      {children}
    </SideMenuContext.Provider>
  );
}

export default SideMenu;
