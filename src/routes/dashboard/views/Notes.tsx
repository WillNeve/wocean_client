import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../auth';
//styles
import styles from '../dashboard.module.css'
//icons
import { HiOutlinePlus } from "react-icons/hi";
import { LoaderGroup, LoaderRect } from '../../../styles/Utility';


type note = {
  id: number,
  title?: string,
  body?: string
}

interface noteTileProps {
  note: note,
  onMouseDown: (e: React.MouseEvent) => void,
  onMouseMove: (e: React.MouseEvent) => void,
  onMouseUp: (e: React.MouseEvent) => void,
}

interface noteTileStatic {
  
}

const NoteTile: React.FC<noteTileProps> = ({note, onMouseDown, onMouseMove, onMouseUp}) => {
  return (
    <a href={`/notes/${note.id}`}
       className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                  bg-slate-900 border border-gray-500
                     hover:border-2 hover:border-sky-500 cursor-pointer'
       draggable={'true'}
       onMouseDown={onMouseDown}
       onMouseMove={onMouseMove}
       onMouseUp={onMouseUp}>
      <h3 className='text-center'>{note.title}</h3>
    </a>
  );
}

const NoteTileFake: React.FC<noteTileStatic> = ({note}) => {

}

const NewNoteTile = () => {
  return (
    <a href={`/notes/new`}
       className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                    bg-slate-900/50 border border-gray-500
                      hover:border-2 hover:border-sky-500 cursor-pointer'>
      <HiOutlinePlus className='text-2xl'/>
    </a>
  );
}

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const { user } = useContext(UserContext);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [dragTarget, setDragTarget] = useState<number | null>(null);

  const handleNotePress = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    console.log(`Tile index ${index} pressed`);
    console.clear();
    console.log(e);
    setDragTarget(index);
    setDragActive(true);
  }

  const handleNoteMove = (e: React.MouseEvent, index: number) => {
    if (dragActive) {
      console.log(`Dragged tile index ${index} moving`, index === dragTarget);
    }
  }

  const handleNoteRelease = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    console.log(e, index);
    // ........
    setDragTarget(null)
    setDragActive(false);
  }

  const getNotes = async () => {
    if (user) {
      const resp: Response | string = await Promise.race([
        fetch(`${import.meta.env.VITE_SERVER_URL}/user/${user.id}/notes`, {
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
          setLoaded(true);
        }
        const data = await resp.json();
        setNotes(data.notes)
      }
    }
  }

  useEffect(() => {
    getNotes();
  }, [])

  return (
    <>

      <h2>{loaded ? (<>Your notes ({notes.length})</>) : (<>Loading...</>)}</h2>
      <div className={`${styles.customScroll} pr-4 mt-4 w-full h-fit max-h-[75%] overflow-y-scroll
                                              overflow-x-auto
                                              grid gap-4 min-[400px]:grid-cols-2
                                              sm:grid-cols-3 md:grid-cols-4
                                              min-[900px]:grid-cols-5 lg:grid-cols-6 grid-rows-auto
                                              `}>
        {loaded ? (
          <>
            <NewNoteTile/>
            {notes.map((note, index) => (
              <NoteTile key={note.id}
                        note={note}
                        onMouseDown={(e) => handleNotePress(e, index)}
                        onMouseMove={(e) => handleNoteMove(e, index)}
                        onMouseUp={(e) => handleNoteRelease(e, index)}/>
            ))}
          </>
        ):
        (
          <>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
            <LoaderGroup active={true} className={`w-full h-auto aspect-square`}>
              <LoaderRect className='w-full h-full'/>
            </LoaderGroup>
          </>
        )}
      </div>
    </>
  );
}

export default Notes;
