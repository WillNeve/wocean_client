import React, {useState, useEffect, Dispatch, SetStateAction } from 'react'
import { note, toggle } from '../../../types/types';
//icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileMoveRtl } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";



interface topMenuProps {
  loaded: boolean,
  folderTitle: string | null,
  setFolderId: Dispatch<SetStateAction<string | null>>,
  notes: note[],
  checkedTileIds: number[],
  addNotesToFolder: (folderId: number) => void,
  deleteCheckedTiles: () => void,
}

const TopMenu: React.FC<topMenuProps> = ({loaded, folderTitle, setFolderId, notes, checkedTileIds, addNotesToFolder, deleteCheckedTiles }) => {
  const [folderSelectionActive, setFolderSelectionActive] = useState<toggle>(false);

  useEffect(() => {
    if (checkedTileIds.length === 0) {
      setFolderSelectionActive(false)
    }
  }, [checkedTileIds])

  return (
    <div className="top px-8 flex items-start justify-between w-full text-gray-300">
      {folderTitle ? (
        <button
          className='flex items-center gap-x-1 p-1 border border-gray-500 rounded-md
                    hover:opacity-75'
          onClick={() => setFolderId(null)}>
          <IoIosArrowBack/>
          <p className='pr-1'>Back</p>
        </button>
      ) : ''}
      <div className='text-lg'>{loaded ? (
        <>
        {folderTitle ? (
          <div className='flex items-center gap-x-1'>
          <h2 className='not-italic font-bold text-xl
                          flex items-center gap-x-2'>
            <FaFolder/>
            <p className='text-transparent text-gradient-light'>{folderTitle}</p>
          </h2>
          <em className='not-italic text-sm'>({notes.length})</em>
        </div>
        ) : (
          <div className='flex items-center gap-x-1'>
            <h2 className='not-italic text-transparent font-bold text-xl text-gradient-light
                            '>All notes</h2>
            <em className='not-italic text-sm'>({notes.length})</em>
          </div>
        )}
        </>
      )
      : (<>Loading...</>)}</div>
      <ul className='relative flex gap-x-2 text-gray-300 w-fit rounded-md'>
        <button type='button'
                aria-label='Show add to folder options'
                className={`${checkedTileIds.length > 0 ? 'cursor-pointer hover:opacity-85' : 'cursor-default opacity-30'}
                          p-2 border border-gray-500 rounded-sm hover:bg-gray-200/20`}
                onClick={() => {if (checkedTileIds.length > 0) setFolderSelectionActive(!folderSelectionActive)}}>
          <MdDriveFileMoveRtl/>
        </button>
          <div className={`${folderSelectionActive ? '' : 'hidden'} absolute z-10 w-[200px] p-1 right-0 -bottom-1 translate-y-full
                          rounded-md border border-gray-500 text-gray-200  popup-bg
                          text-sm font-light`}>
            <p className='text-center'>Add selected notes to:</p>
            <ul>
              {notes.filter((note) => note.folder).map((note, index) => (
                <button type='button'
                        key={index}
                        aria-label={`Add selected notes to '${note.title}' folder`}
                        className='flex items-center justify-center gap-x-2
                                  w-full cursor-pointer py-2
                                  border border-gray-500 rounded-sm mt-2 hover:opacity-75'
                        onClick={() => {
                          addNotesToFolder(note.id);
                          setFolderSelectionActive(false);
                        }}>
                  <CiFolderOn className='text-xl'/><p className='w-fit'>{note.title}</p>
                </button>
              ))}
            </ul>
          </div>
        <button type='button'
                aria-label='Delete checked notes'
                className={`${checkedTileIds.length > 0 ? 'cursor-pointer hover:opacity-85 hover:bg-red-500/50' : 'cursor-default opacity-30'}
                p-2 border border-gray-500 rounded-sm`}
                onClick={deleteCheckedTiles}>
          <RiDeleteBin6Line/>
        </button>
      </ul>
    </div>
  )
}

export default TopMenu;
