import React, { forwardRef, useState } from "react";
// types
import { note } from "../../../../../types/types";
// icons
import { HiOutlinePlus } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";



interface noteTileProps {
  note: note,
  moving: boolean,
  onDragStart: (e: React.MouseEvent) => void,
  onTouchStart: (e: React.TouchEvent) => void,
  onDragEnd: (e: React.DragEvent) => void,
  index: number,
}

interface noteTileCloneProps {
  note: note,
  active: boolean,
  onMouseUp: (e: React.MouseEvent) => void,
  onTouchEnd: (e: React.TouchEvent) => void,
}

export const NoteTile = forwardRef<HTMLAnchorElement, noteTileProps>(
  ({ note, onDragStart, moving, index, onTouchStart }, ref) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleCheckBoxClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setChecked(!checked);
    }



    return (
      <a
        href={`/notes/${note.id}`}
        ref={ref}
        data-index={index}
        className={`${moving ? `bg-wave-600/20 border-none cursor-grabbing` : `bg-waveLight-500 border-gray-600 cursor-pointer`}
                    p-1 relative flex  w-full h-auto aspect-square rounded-md
                    font-normal
                    border border-gray-500
                  hover:border-amber-500`}>
        <h3 className={`${moving ? 'hidden' : '' } text-center`}>{note?.title}</h3>
        <div className={`${moving ? 'hidden' : '' } absolute bottom-1 right-1 flex items-center gap-x-1`}>
          <button type='button'
                  aria-label='Check Tile Button'
                  className={`${checked ? 'bg-amber-500' : 'bg-waveLight-300'} p-1 rounded-md border border-gray-600`}
                  onClick={handleCheckBoxClick}>
            <FaCheck className={`text-lg scale-75 ${checked ? '' : 'opacity-0'}`}/>
          </button>
          <button type='button'
                  aria-label='Drag Button'
                  className="p-1 bg-waveLight-300 hover:bg-amber-500 rounded-md border border-gray-600 cursor-grab"
                  onMouseDown={onDragStart}
                  onTouchStart={onTouchStart}>
            <MdDragIndicator className='text-lg'/>
          </button>
        </div>
      </a>
    );
  }
);


export const NoteTileClone = forwardRef<HTMLDivElement,  noteTileCloneProps>(
  ({ note, active, onMouseUp, onTouchEnd }, ref) => {

    return (
      <div
        ref={ref}
        className={`${active ? '' : 'hidden'} flex fixed top-50 left-50 -translate-x-1/2 -translate-y-1/2
                    p-1 rounded-md bg-waveLight-500 cursor-grabbing
                    font-normal
                    border-2 border-amber-500`}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}>
        <h3 className={`text-center pointer-events-none`}>{note?.title}</h3>
      </div>
    );
  }
);

export const NewNoteTile = () => {
  return (
    <a href={`/notes/new`}
       className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                      text-gray-600/60
                    bg-waveLight-300 border border-gray-500
                      hover:border-2 hover:border-waveLight-600 cursor-pointer'>
      <HiOutlinePlus className='text-2xl'/>
    </a>
  );
}
