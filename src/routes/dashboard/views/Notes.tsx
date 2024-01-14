import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../auth';
//styles
import styles from '../dashboard.module.css'
//icons
import { HiOutlinePlus } from "react-icons/hi";


type note = {
  id: number,
  title?: string,
  body?: string
}

interface noteTileProps {
  note: note,
}

const NoteTile: React.FC<noteTileProps> = ({note}) => {
  return (
    <a href={`/notes/${note.id}`} className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                  bg-slate-900 border border-gray-500
                     hover:border-2 hover:border-sky-500 cursor-pointer'>
      <h3 className='text-center'>{note.title}</h3>
    </a>
  );
}

const NewNoteTile = () => {
  return (
    <a href={`/notes/new`} className='w-full h-auto flex items-center justify-center aspect-square rounded-md
                    bg-slate-900/50 border border-gray-500
                      hover:border-2 hover:border-sky-500 cursor-pointer'>
      <HiOutlinePlus className='text-2xl'/>
    </a>
  );
}


const Notes = () => {
  const [notes, setNotes] = useState<note[]>([])
  const { user } = useContext(UserContext);

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
      <h2>Your notes ({(notes as Array<note>).length}):</h2>
      <div className={`${styles.customScroll} pr-4 mt-4 w-full h-fit max-h-[75%] overflow-y-scroll
                                              overflow-x-auto
                                              grid gap-4 min-[400px]:grid-cols-2
                                              sm:grid-cols-3 md:grid-cols-4
                                              min-[900px]:grid-cols-5 lg:grid-cols-6 grid-rows-auto
                                              `}>
        <NewNoteTile/>
        {notes.map((note, index) => (
          <NoteTile key={index} note={note}/>
        ))}
      </div>
    </>
  );
}

export default Notes;
