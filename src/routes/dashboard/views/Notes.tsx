import { useEffect, useState } from 'react';
//styles
import styles from '../dashboard.module.css'

const NoteTile = () => {
  return (
    <div className='w-full h-auto aspect-square rounded-md bg-slate-900 border border-gray-500'></div>
  );
}

type note = {
  title?: string,
  body?: string
}

const Notes = () => {
  const [notes, setNotes] = useState<note[]>([])

  useEffect(() => {
    setNotes([{title: 'Doc1'},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}])
  }, [])

  return (
    <>
      <h2>Your notes ({notes.length}):</h2>
      <div className={`${styles.customScroll} pr-4 mt-4 w-full h-fit max-h-[90%] overflow-y-scroll grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 grid-rows-auto`}>
        {notes.map((_note, index) => (
          <NoteTile key={index}/>
        ))}
      </div>
    </>
  );
}

export default Notes;
