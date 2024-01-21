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
                      relative flex  w-full h-auto aspect-square rounded-md
                      font-normal
                     hover:border-gray-200  ${checked ? 'border-amber-500' : ''}`}>
          <div className={`relative w-full h-full ${moving ? 'bg-gradient-to-r from-gray-500/10 to-gray-300/10' : 'gradient-brighten'} mask-folder`}>
            <p className={`${moving ? 'hidden' : '' } absolute top-1/2 left-0 w-full -translate-y-1/2 text-center`}>{note.title}</p>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 90 L 0 10 Q 0 0, 10 0 L 50 0 Q 60 0, 60 10 L 90 10 Q 100 10, 100 20 L 100 90 Q 100 100, 90 100, L 10 100, Q 0 100, 0 90 " fill="none" stroke="#6b7280" strokeWidth={moving ? '0' : '1'} />
            </svg>
          </div>
          <div className={`${moving ? 'hidden' : '' } absolute p-[2px] bottom-0 right-0 flex items-center gap-x-1`}>
            <button type='button'
                    aria-label='Drag Button'
                    className={`${checked ? 'hidden' : '' } p-1 rounded-md hover:opacity-85 cursor-grab`}
                    onMouseDown={(e) =>  {checked ? '' : onDragStart(e)}}
                    onTouchStart={(e) =>  {checked ? '' : onTouchStart(e)}}>
              <MdDragIndicator className='text-2xl'/>
            </button>
          </div>
        </a>
      ) : (
        <a
          href={`/notes/${note.id}`}
          ref={ref}
          data-index={index}
          className={`${moving ? `border-none cursor-grabbing` : `cursor-pointer`}
                      relative flex  w-full h-auto aspect-square rounded-md overflow-hidden
                      font-normal
                      border ${checked ? 'border-gray-300' : 'border-gray-500'}`}>
          <div className={`flex items-center justify-center font-medium w-full p-1 ${moving ? `bg-gradient-to-r from-gray-500/10 to-gray-300/10`
                          : `gradient-brighten`} py-1 ${checked ? 'opacity-75' : ''}`}>
            <h3 className={`${moving ? 'hidden' : '' }`}>{note?.title}</h3>
          </div>
          <div className={`${moving ? 'hidden' : '' } absolute bottom-0 p-[4px] right-0 flex items-center w-full justify-between`}>
            <button type='button'
                    aria-label='Check Tile Button'
                    className={`${checked ? 'bg-gray-300/20' : ''} p-1 rounded-md border border-gray-600`}
                    onClick={handleCheckBoxClick}>
              <FaCheck className={`text-lg scale-75 ${checked ? '' : 'opacity-0'}`}/>
            </button>
            <button type='button'
                    aria-label='Drag Button'
                    className={`${checked ? 'hidden' : '' } p-1 rounded-md hover:opacity-85 cursor-grab`}
                    onMouseDown={(e) =>  {checked ? '' : onDragStart(e)}}
                    onTouchStart={(e) =>  {checked ? '' : onTouchStart(e)}}>
              <MdDragIndicator className='text-2xl'/>
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
                    hover:border-gray-200 opacity-85`}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}>
            <div className='relative w-full h-full gradient-brighten mask-folder'>
              <p className={`absolute top-1/2 left-0 w-full -translate-y-1/2 text-center`}>{note.title}</p>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 90 L 0 10 Q 0 0, 10 0 L 50 0 Q 60 0, 60 10 L 90 10 Q 100 10, 100 20 L 100 90 Q 100 100, 90 100, L 10 100, Q 0 100, 0 90 " fill="none" stroke="#6b7280" strokeWidth="1px" />
              </svg>

          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className={`${active ? '' : 'hidden'} flex fixed top-50 left-50 -translate-x-1/2 -translate-y-1/2
                      rounded-md gradient-brighten cursor-grabbing
                      font-normal
                      border border-gray-500 opacity-85`}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}>
          <div className={`p-1 flex items-center justify-center font-medium w-full p-1bg-gradient-to-r from-waveLight-500 to-waveLight-600 py-1`}>
            <h3 className="text-center">{note?.title}</h3>
          </div>
        </div>
      ))
    );
  }
);

interface newNoteTileProps {
  folder: boolean,
  folderId: string | null,
  insertNewNote: (note: note) => void;
}

export const NewNoteTile: React.FC<newNoteTileProps> = ({folder, folderId, insertNewNote}) => {
  const { user } = useContext(UserContext);
  const [hovered, setHovered] = useState<boolean>(false);

  const createNote = async () => {
    if (user) {
      const path = `/notes/new${folderId ? `?folder=${folderId}` : ''}${folder ? `?isFolder=${folder}` : ''}`;
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

  if (folder) {
    return (
      <div className={`flex w-full h-auto aspect-square
                      font-normal
                    hover:border-amber-500 cursor-pointer`}
            onClick={handleClick}
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}>
        <div className='relative w-full h-full'>
          <div className="absolute z-10 w-full h-full flex items-center justify-center pointer-events-none">
            <HiOutlinePlus className={`${hovered ? 'scale-125' : ''} transition-transform text-2xl text-gray-300/50`}/>
          </div>
          <div className="w-[calc(70%-2px)] ml-[1px] h-[4px] absolute left-0 top-[12%] -translate-y-1/2 bg-wave-800"></div>
          <div className="p-1 pl-2 border border-gray-500 w-[70%] h-[12%] rounded-md rounded-b-none bg-wave-800">
          </div>
          <div className="border border-gray-500 w-full h-[88%] rounded-md rounded-tl-none bg-wave-800"></div>
        </div>
      </div>
    );
  } else {
    return (
      <button type='button'
              aria-label="New note button"
              className='w-full h-auto aspect-square flex items-center justify-center rounded-md
                        bg-wave-800 border border-gray-500 cursor-pointer'
              onClick={handleClick}
              onMouseOver={() => setHovered(true)}
              onMouseOut={() => setHovered(false)}>
        <HiOutlinePlus className={`${hovered ? 'scale-125' : ''} transition-transform text-2xl text-gray-300/50`}/>
      </button>
    );
  }
}
