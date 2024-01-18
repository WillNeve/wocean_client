import React, { forwardRef, useContext, useState } from "react";
// types
import { note } from "../../../types/types";
// icons
import { HiOutlinePlus } from "react-icons/hi";
import { MdDragIndicator } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../../../auth";



interface noteTileProps {
  note: note,
  moving: boolean,
  onDragStart: (e: React.MouseEvent) => void,
  onTouchStart: (e: React.TouchEvent) => void,
  onDragEnd: (e: React.DragEvent) => void,
  onCheckedChange: (checked: boolean) => void,
  requestFolderId: (id: string) => void,
  index: number,
}

interface noteTileCloneProps {
  note: note,
  active: boolean,
  onMouseUp: (e: React.MouseEvent) => void,
  onTouchEnd: (e: React.TouchEvent) => void,
}

export const NoteTile = forwardRef<HTMLAnchorElement, noteTileProps>(
  ({ note, onDragStart, moving, index, onTouchStart, onCheckedChange, requestFolderId }, ref) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleCheckBoxClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onCheckedChange(!checked);
      setChecked(!checked);
    }



    return (
      (note.folder ? (
        <a
          onClick={() => requestFolderId(`${note.id}`)}
          ref={ref}
          data-index={index}
          className={`${moving ? `cursor-grabbing` : `cursor-pointer`}
                      relative flex  w-full h-auto aspect-square rounded-md overflow-hidden
                      font-normal
                     hover:border-amber-500`}>
          <div className='relative w-full h-full'>
            <div className={`${moving ? 'hidden' :  ''} bg-gradient-to-r from-waveLight-300 to-waveLight-400
                            w-[calc(70%-2px)] ml-[1px] h-[4px] absolute left-0 top-[12%] -translate-y-1/2`}></div>

            <div className={`${moving ? `bg-gradient-to-r from-gray-700/20 to-gray-500/20`
                             : `bg-gradient-to-r from-waveLight-300 to-waveLight-400 border`}
                             p-1 pl-2 text-gray-500 border-gray-600 w-[70%] h-[12%] rounded-md rounded-b-none`}>
              <p className={`${moving ? 'hidden' : ''} relative z-10`}>{note.title}</p>
            </div>

            <div className={`${moving ? `bg-gradient-to-r from-gray-700/20 to-gray-500/20`
                             : `bg-gradient-to-r from-waveLight-300 to-waveLight-400 border`}
                             border-gray-600 w-full h-[88%] rounded-md rounded-tl-none`}></div>
          </div>
          <div className={`${moving ? 'hidden' : '' } absolute bottom-1 right-1 flex items-center gap-x-1`}>
            <button type='button'
                    aria-label='Drag Button'
                    className="p-1 bg-waveLight-300 hover:bg-amber-500 rounded-md border border-gray-600 cursor-grab"
                    onMouseDown={(e) =>  {checked ? '' : onDragStart(e)}}
                    onTouchStart={(e) =>  {checked ? '' : onTouchStart(e)}}>
              <MdDragIndicator className='text-lg'/>
            </button>
          </div>
        </a>
      ) : (
        <a
          href={`/notes/${note.id}`}
          ref={ref}
          data-index={index}
          className={`${moving ? `border-none cursor-grabbing` : `border-gray-600 cursor-pointer`}
                      relative flex  w-full h-auto aspect-square rounded-md overflow-hidden
                      font-normal
                      border border-gray-500
                    hover:border-amber-500`}>
          <div className={`w-full p-1 ${moving ? `bg-gradient-to-r from-gray-700/20 to-gray-500/20` : `bg-gradient-to-r from-waveLight-500 to-waveLight-600`} py-1 ${checked ? 'opacity-75' : ''}`}>
            <h3 className={`${moving ? 'hidden' : '' }`}>{note?.title}</h3>
          </div>
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
                    onMouseDown={(e) =>  {checked ? '' : onDragStart(e)}}
                    onTouchStart={(e) =>  {checked ? '' : onTouchStart(e)}}>
              <MdDragIndicator className='text-lg'/>
            </button>
          </div>
        </a>
      ))
    );
  }
);


export const NoteTileClone = forwardRef<HTMLDivElement,  noteTileCloneProps>(
  ({ note, active, onMouseUp, onTouchEnd }, ref) => {

    return (
      (note.folder ? (
        <div
          ref={ref}
          className={`${active ? '' : 'hidden'} flex fixed top-50 left-50 -translate-x-1/2 -translate-y-1/2
                      overflow-hidden
                      font-normal
                    hover:border-amber-500`}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}>
          <div className='relative w-full h-full'>
            <div className="w-[calc(70%-2px)] ml-[1px] h-[4px] absolute left-0 top-[12%] -translate-y-1/2 bg-gradient-to-r from-waveLight-300 to-waveLight-400"></div>
            <div className="p-1 pl-2 border text-gray-500 border-gray-600 w-[70%] h-[12%] rounded-md rounded-b-none bg-gradient-to-r from-waveLight-300 to-waveLight-400">
              <p className="relative z-10">{note.title}</p>
            </div>
            <div className="border border-gray-600 w-full h-[88%] rounded-md rounded-tl-none bg-gradient-to-r from-waveLight-300 to-waveLight-400"></div>
          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`${active ? '' : 'hidden'} flex fixed top-50 left-50 -translate-x-1/2 -translate-y-1/2
                      rounded-md bg-gradient-to-r from-waveLight-500 to-waveLight-600 cursor-grabbing
                      font-normal
                      border-2 border-amber-500`}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}>
          <div className={`w-full p-1bg-gradient-to-r from-waveLight-500 to-waveLight-600 py-1`}>
            <h3>{note?.title}</h3>
          </div>
        </div>
      ))
    );
  }
);

interface newNoteTileProps {
  folderId: string | null,
  insertNewNote: (note: note) => void;
}

export const NewNoteTile: React.FC<newNoteTileProps> = ({folderId, insertNewNote}) => {
  const { user } = useContext(UserContext);

  const createNote = async () => {
    if (user) {
      const path = `/notes/new${folderId ? `?folder=${folderId}` : ''}`;
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}${path}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Replace "user.token" with the actual token
          },
        }).catch(() => 'Server is unresponsive'),
        new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve('Server is unresponsive');
          }, 5000);
        })
      ])
      if (resp instanceof Response) {
        if (resp.status === 200) {
          const data = await resp.json();
          insertNewNote(data.note)
          // show a notice to user
        } else {
          // show a notice to user
        }
      }
    }
  }

  const handleClick = () => {
    createNote();
  }

  return (
    <button type='button'
            aria-label="New note button"
            className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                      text-gray-600/60
                    bg-waveLight-300 border border-gray-500
                      hover:border-2 hover:border-waveLight-600 cursor-pointer'
            onClick={handleClick}>
      <HiOutlinePlus className='text-2xl'/>
    </button>
  );
}
