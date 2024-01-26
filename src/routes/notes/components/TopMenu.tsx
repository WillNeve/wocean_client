import React, {useState, useEffect, Dispatch, SetStateAction } from 'react';
import { note, toggleBoolean } from '../../../types/types';
//icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDriveFileMoveRtl } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { CiFolderOn } from "react-icons/ci";
import { FaFolder } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuFolderPlus } from "react-icons/lu";
// components
import { LoaderGroup, LoaderRect } from '../../../styles/Utility';

interface topMenuProps {
  loaded: boolean,
  folderTitle: string | null,
  setFolderId: Dispatch<SetStateAction<string | null>>,
  notes: note[],
  checkedTileIds: number[],
  addNotesToFolder: (folderId: number) => void,
  deleteCheckedTiles: () => void,
  handleNewNote: (note: note) => void,
  folderId: string | null,
  createNote: (folderId: string | null, folder: boolean) => void,
  deleteNote: (noteId: string) => void,
}

interface newBarProps {
  folderId: string | null,
  createNote: (folderId: string | null, folder: boolean) => void,
}

const NewBar: React.FC<newBarProps> = ({ folderId, createNote}) => {
  const [menuOpen, setMenuOpen] = useState<toggleBoolean>(false);


  return (
    <div className="relative text-gray-400 text-sm font-l">
      <div className='flex items-center rounded border border-gray-500'>
        <button type="button"
                aria-label="create new note"
                className='p-[6px] flex items-center gap-x-1
                          hover:bg-gray-300/20'
                onClick={() => {
                  setMenuOpen(false);
                  createNote(folderId, false);
                  }}>
          <p>New Note</p><VscNewFile className="text-lg"/>
        </button>
        <button type="button"
                aria-label="toggle file creation menu"
                className='p-[6px] border-l border-gray-500
                           hover:bg-gray-300/20'
                onClick={() => {setMenuOpen(!menuOpen)}}>
          <IoMdArrowDropdown className="text-xl"/>
        </button>
      </div>
      <ul className={`${menuOpen ? '' : 'hidden'} flex flex-col gap-y-2
                      absolute max-[500px]:left-0 min-[500px]:right-0 -bottom-1 translate-y-full
                      border border-gray-500 min-w-[200px] p-2
                      popup-bg backdrop-blur-xl rounded-md z-20`}>
        <button type="button"
                aria-label="create new note"
                className="p-1 rounded-md flex items-center gap-x-1 justify-end
                           border border-gray-500 cursor-pointer hover:opacity-85"
                onClick={() => {
                  setMenuOpen(false);
                  createNote(folderId, false);
                  }}>
          <p>New Note</p><VscNewFile className="text-lg"/>
        </button>
        <button type="button"
                aria-label="create new folder"
                className="p-1 rounded-md flex items-center gap-x-1 justify-end
                           border border-gray-500 cursor-pointer hover:opacity-85"
                onClick={() => {
                  setMenuOpen(false);
                  createNote(folderId, true);
                  }}>
          <p>New Folder</p><LuFolderPlus className="text-lg"/>
        </button>
      </ul>
    </div>
  );
}

const TopMenu: React.FC<topMenuProps> = ({folderId,
                                          loaded,
                                          folderTitle,
                                          setFolderId,
                                          notes,
                                          checkedTileIds,
                                          addNotesToFolder,
                                          deleteCheckedTiles,
                                          createNote,
                                          deleteNote}) => {
  const [folderSelectionActive, setFolderSelectionActive] = useState<toggleBoolean>(false);
  const [folderMenuOpen, setFolderMenuOpen] = useState<toggleBoolean>(false);
  const [ folderDeletionModalVisible, setFolderDeletionModalVisible] = useState<toggleBoolean>(false);

  useEffect(() => {
    if (checkedTileIds.length === 0) {
      setFolderSelectionActive(false)
    }
  }, [checkedTileIds])

  return (
    (loaded ? (
      <div className="top px-8 gap-4 flex flex-wrap justify-start min-[600px]:justify-between w-full text-gray-400">
      {folderTitle ? (
        <button
          className='flex items-center gap-x-1 p-1 border border-gray-600 rounded h-fit
          hover:bg-gray-200/20'
          onClick={() => setFolderId(null)}>
          <IoIosArrowBack/>
          <p className='pr-1'>Back</p>
        </button>
      ) : ''}
      <div className='text-lg'>{loaded ? (
        <>
        {folderTitle ? (
        <div className="relative flex items-center gap-x-1">
          <div className='flex items-center gap-x-1'>
            <h2 className='not-italic font-bold text-xl
                            flex items-center gap-x-2'>
              <FaFolder/>
              <p className='text-transparent text-gradient-light'>{folderTitle}</p>
            </h2>
            <em className='not-italic text-sm'>({notes.length})</em>
          </div>
          <button type='button'
                  aria-label='Open folder menu'
                  onClick={() => setFolderMenuOpen(!folderMenuOpen)}
                  className='p-1 hover:bg-gray-200/20 rounded-md'>
            <IoMdArrowDropdown className='text-xl'/>
          </button>
          <div className={`${folderMenuOpen ? '' : 'hidden'} z-40 absolute right-0 -bottom-1 translate-y-full
                          border border-gray-500 rounded-lg popup-bg p-2`}>
            <ul className='flex flex-col items-end text-sm'>
              <button type='button'
                      onClick={() => {
                        if (!folderDeletionModalVisible) {
                          setFolderMenuOpen(false);
                          setFolderDeletionModalVisible(true);
                        }
                      }}
                      className='p-1 h-fit w-fit rounded border border-gray-500 hover:opacity-85 cursor-pointer'>
                <p>Delete Folder</p>
              </button>
            </ul>
          </div>
          <div className={`${folderDeletionModalVisible ? '' : 'hidden'} z-40 flex flex-col gap-y-1 w-[300px] absolute left-0 -bottom-1 translate-y-full
                          border border-gray-500 rounded-lg popup-bg p-2 text-sm`}>
            <p>Are you sure you want to delete this folder?</p>
            <p className='text-xs text-red-400'>Your included notes will be moved back to root</p>
            <div className='flex items-center gap-x-2'>
            <button type='button'
                    className='p-1 h-fit w-fit rounded border border-gray-500 hover:opacity-85 cursor-pointer'
                    onClick={() => {
                      setFolderDeletionModalVisible(false);
                    }}>
              <p>Cancel</p>
            </button>
            <button type='button'
                    className='p-1 h-fit w-fit rounded border border-gray-500 hover:bg-red-500/20 cursor-pointer'
                    onClick={() => {
                      if (folderId) {
                        setFolderMenuOpen(false);
                          setFolderDeletionModalVisible(false);
                        deleteNote(folderId);
                        setFolderId(null);
                      }
                    }}>
              <p>Yes, I'm sure</p>
            </button>
            </div>
          </div>
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
      <div className="right flex flex-col min-[350px]:flex-row min-[350px]:items-center gap-y-2 gap-x-4">
        <NewBar createNote={createNote} folderId={folderId} />
        <ul className='relative flex gap-x-2 text-gray-300 w-fit rounded-md'>
          <button type='button'
                  aria-label='Show add to folder options'
                  className={`${checkedTileIds.length > 0 ? 'cursor-pointer hover:bg-gray-200/20' : 'cursor-default opacity-25'}
                            p-2 border border-gray-500 rounded-sm`}
                  onClick={() => {if (checkedTileIds.length > 0) setFolderSelectionActive(!folderSelectionActive)}}>
            <MdDriveFileMoveRtl/>
          </button>
            <div className={`${folderSelectionActive ? '' : 'hidden'} absolute z-10 w-[200px] p-1 right-0 -bottom-1 translate-y-full
                            rounded-md border border-gray-500 text-gray-300  popup-bg
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
                  className={`${checkedTileIds.length > 0 ? 'cursor-pointer hover:opacity-85 hover:bg-red-500/50' : 'cursor-default opacity-25'}
                  p-2 border border-gray-500 rounded-sm`}
                  onClick={deleteCheckedTiles}>
            <RiDeleteBin6Line/>
          </button>
        </ul>
      </div>
    </div>
    ) : (
      <div className="top px-8 flex items-start justify-between w-full text-gray-300 h-[35px]">
        <LoaderGroup active={true} className='w-[10%] h-full'>
          <LoaderRect className='w-full h-full rounded-sm'></LoaderRect>
        </LoaderGroup>

        <LoaderGroup active={true} className='w-[20%] h-full'>
          <LoaderRect className='w-full h-full rounded-sm'></LoaderRect>
        </LoaderGroup>

        <LoaderGroup active={true} className='w-[30%] h-full'>
          <LoaderRect className='w-full h-full rounded-sm'></LoaderRect>
        </LoaderGroup>
      </div>
    ))

  )
}

export default TopMenu;
