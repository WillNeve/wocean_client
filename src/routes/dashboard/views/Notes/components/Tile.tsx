import { forwardRef } from "react";
// types
import { note } from "../../../../../types/types";
// icons
import { HiOutlinePlus } from "react-icons/hi";

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
  ({ note, onDragStart, moving, onDragEnd, index, onTouchStart }, ref) => {

    return (
      <a
        href={`/notes/${note.id}`}
        ref={ref}
        data-index={index}
        className={`${moving ? `bg-wave-600/20 border-none cursor-grabbing` : `bg-wave-500 border-gray-600 cursor-pointer`} relative flex  w-full h-auto aspect-square items-center justify-center rounded-md
                      border border-gray-500
                    hover:border-2 hover:border-amber-500`}
        onMouseDown={onDragStart}
        onTouchStart={onTouchStart}
        onDragEnd={onDragEnd}
      >
        <h3 className={`${moving ? 'hidden' : '' } text-center`}>{note?.title}</h3>
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
                    items-center justify-center rounded-md bg-wave-500 cursor-grabbing
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
                    bg-wave-200 border border-gray-500
                      hover:border-2 hover:border-wave-500 cursor-pointer'>
      <HiOutlinePlus className='text-2xl'/>
    </a>
  );
}
