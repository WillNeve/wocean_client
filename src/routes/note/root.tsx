// react
import React, { useEffect, useRef, useState, useContext, useCallback} from 'react'
import { useNavigate, useParams} from "react-router-dom";
// user context
import { UserContext } from '../../auth';
// styling
import './note.css';
//icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";

//components
import NoteBlock, { noteBlockType } from './components/Block';
import Title from './components/Title';
import NavBar from '../../components/NavBar/NavBar';
import { LoaderRect, LoaderGroup } from '../../styles/Utility';

interface noteProps {
  newNote: boolean,
}

const Note: React.FC<noteProps> = ({newNote}) => {
  const editor = useRef<HTMLDivElement>(document.createElement('div'));
  // user
  const { user, finishedLoadingUser } = useContext(UserContext);
  const navigate = useNavigate();
  // note id
  const { note_id } = useParams();

  const [noteId, setNoteId] = useState<string | undefined>(note_id)
  // note state
  const [title, setTitle] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const [updatedAt, setUpdatedAt] = useState('n/a');
  const [blocks, setBlocks] = useState<noteBlockType[]>([]);
  const [focusBlockId, setFocusBlockID] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  // const [contentHidden, setContentHidden] = useState<boolean>(true)
  //save optimisation
  const [typing, setTyping] = useState(0);
  const [saving, setSaving] = useState<boolean>(false);
  const [loaders, setLoaders] = useState<boolean>(true);

  const loadNote = useCallback(async (newNote: boolean) => {
    await new Promise((res) => setTimeout(res, 2000))
    let resp;
    if (newNote) {
      resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/notes/new`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user?.token,
        }
      })
    } else {
      resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/notes/${noteId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + user?.token,
        }
      })
    }
    const data = await resp.json();
    if (data.note) {
      setNoteId(data.note.id);
      setTitle(data.note.title);
      setInitialTitle(data.note.title);
      const date = new Date(data.note.updated_at);
      setUpdatedAt(date.toLocaleString('en-GB'))
      const blocks = await JSON.parse(data.note.body);
      blocks.forEach((block: noteBlockType) => block.id = parseInt((block.id as unknown as string)))
      setBlocks(blocks);
      setLoaders(false)
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
  }, [user, setBlocks, noteId])

  const saveNote = useCallback(async () => {
      setSaving(true);
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user?.token,
        },
        body: JSON.stringify({ title: title, body: blocks })
      })
      const data = await resp.json();
      setTimeout(() => {
        console.log(data); // save confirmation for now
        setSaving(false);
      }, 1000);
  }, [title, blocks, user, noteId])

  const trySave = useCallback(() => {
    if (typing <= 0) {
      saveNote();
    }
  }, [typing, saveNote])

  useEffect(() => {
    if (!loading) {
      trySave(); //debouncing
    }
  }, [typing, trySave, loading])

  const startTyping = useCallback(() => {
    setTyping((prevTyping) => prevTyping + 1);

    setTimeout(() => {
      endTyping();
    }, 1000);
  }, [])

  const endTyping = () => {
    setTyping((prevTyping) => prevTyping - 1);
  };


  const handleBlockChange = useCallback((newContent: string, index: number) => {
    const localBlocks = [...blocks];
    const updatedBlock = {
        ...blocks[index],
        content: newContent,
    };
    localBlocks[index] = updatedBlock;
    setBlocks(localBlocks);
    startTyping();
  }, [blocks, startTyping])

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
    startTyping();
  }, [startTyping])

  useEffect(() => {
    if (finishedLoadingUser && loading) {
      if (user) {
        if (noteId) {
          loadNote(false);
        } else if (newNote) {
          loadNote(true);
        }
      } else {
        navigate("/404");
      }
    }
  }, [newNote, navigate, user, loadNote, loading, noteId, finishedLoadingUser])

  const createNewBlock = (sourceId: number) => {
    const newBlockId = sourceId + 1;
    const localBlocks = [...blocks];
    localBlocks.forEach((block) => {
      if (block.id >= newBlockId) {
        block.id += 1;
      }
    })
    setBlocks([...localBlocks, { id: newBlockId, type: 'p', content: '' }]);
    setFocusBlockID(newBlockId);
  }

  const removeBlock = (id: number) => {
    if (blocks.length === 1) {
      return;
    }
    const localBlocks = blocks.filter((block) => block.id !== id );
    setBlocks(localBlocks);
    setFocusBlockID(id - 1);
  }

  const createNewCommandBlock = (id: number, block: noteBlockType) => {
    let localBlocks = blocks.filter((block) => block.id !== id );
    localBlocks = [...localBlocks, {...block, id: id}];
    setBlocks(localBlocks);
    setFocusBlockID(id);
  }

  return (
    <>
      <NavBar requestNavigate={navigate}/>
      <div className='wrapper w-100 max-w-5xl mx-auto'>
        <div className='meta w-full'>
          {loading ? (
            <LoaderGroup active={loaders} className="w-100 flex flex-col items-center mt-4 gap-y-2">
              <LoaderRect className='h-10 w-2/5 min-w-[100px] max-w-[160px]'></LoaderRect>
              <LoaderRect className='h-5 w-1/5 min-w-[80px] max-w-[180px]'></LoaderRect>
            </LoaderGroup>
          ) : (
            <>
              <Title handleChange={handleTitleChange} content={initialTitle}/>
              <p className='font-medium text-center text-gray-600 text-sm'>Updated at: <em className='not-italic font-semibold'>{updatedAt}</em></p>
            </>
          )}
        </div>
        <div className="wrapper relative">
            <div className="relative editor overflow-hidden flex flex-col outline-none rounded-lg bg-sky-900 p-4 m-4 font-medium min-h-[500px]" ref={editor}>
              {blocks.map(({ id, type, content }, index) => (
                <NoteBlock
                  focus={id === focusBlockId ? true : false}
                  key={index}
                  newBlock={createNewBlock}
                  newCommandBlock={createNewCommandBlock}
                  removeBlock={removeBlock}
                  block={{id, type, content}}
                  handleChange={(text) => {handleBlockChange(text, index)}}
                />
              ))}
              {loading ? (
                <LoaderGroup active={loaders} className='w-100 flex flex-col items-start gap-y-3'>
                  <LoaderRect className='h-14 w-3/5 min-w-[200px] max-w-[350px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                  <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                </LoaderGroup>
              ) : ''}
              <div className={`${loading ? 'hidden' : ''}
                              saving-notif
                              flex items-center gap-x-1
                              absolute top-2 right-2 w-fit
                              px-2 py-1 border border-gray-600 rounded-md bg-gray-200/100
                              font-normal text-sm text-gray-800 backdrop-blur-sm ${ saving ? '' : 'saved'}`}>
                <p className='w-fit'>{ saving ? 'Saving' : 'Saved'}</p>
                <div className="icon relative h-5 w-5">
                  <AiOutlineLoading3Quarters className='circ absolute w-100 h-100'/>
                  <GiConfirmed className='tick absolute w-100 h-100' />
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Note;
