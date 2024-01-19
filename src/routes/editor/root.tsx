// react
import React, { useEffect, useRef, useState, useContext, useCallback} from 'react'
import { useNavigate, useParams} from "react-router-dom";
// user context
import { UserContext } from '../../auth';
// styling
import './editor.css';
//icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";

//components
import NoteBlock, { noteBlockType } from './components/Block';
import Title from './components/Title';
import NavBar from '../../components/NavBar/NavBar';
import { LoaderRect, LoaderGroup } from '../../styles/Utility';

interface editorProps {
  newNote: boolean,
}

const Editor: React.FC<editorProps> = ({newNote}) => {
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
  const [focusedBlockIndex, setFocusedBlockIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextId, setNextId] = useState<number>(0);
  // const [contentHidden, setContentHidden] = useState<boolean>(true)
  //save optimisation
  const [typing, setTyping] = useState(0);
  const [saving, setSaving] = useState<boolean>(false);
  const [loaders, setLoaders] = useState<boolean>(true);

  const loadNote = useCallback(async (newNote: boolean) => {
    await new Promise((res) => setTimeout(res, 20000)) // USED FOR TESTING LOADING ANIMS
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
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].id = i;
      }
      setNextId(blocks.length)
      setBlocks(blocks);
      setLoaders(false)
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
  }, [user, setBlocks, setNextId, noteId])

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
      setTimeout(() => {
        if (resp.status === 200) {
          setSaving(false);
        }
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
    setFocusedBlockIndex(-1);
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

  const handleFocusShift = (newOrder: number) => {
    if (newOrder < 0) {
      setFocusedBlockIndex(0)
    } else if (newOrder > blocks.length - 1) {
      setFocusedBlockIndex(blocks.length - 1)
    } else {
      setFocusedBlockIndex(newOrder)
    }
  }

  const createNewBlock = (sourceIndex: number) => {
    const newBlock = {id: nextId, type: 'p', content: ''};
    setNextId(nextId + 1);
    const localBlocks = [
        ...blocks.slice(0, sourceIndex + 1),
        newBlock,
        ...blocks.slice(sourceIndex + 1)
    ];
    setBlocks(localBlocks);
    setFocusedBlockIndex(sourceIndex + 1);
  }

  const removeBlock = (sourceIndex: number) => {
    const localBlocks = blocks.filter((_: noteBlockType, i: number) => i !== sourceIndex);
    setFocusedBlockIndex(sourceIndex - 1);
    if (localBlocks.length === 0)  {
      const newBlock = {id: nextId, type: 'p', content: ''};
      setNextId(nextId + 1);
      localBlocks.push(newBlock)
    }
    setBlocks(localBlocks);
    setFocusedBlockIndex(sourceIndex > 0 ? sourceIndex - 1 : sourceIndex);
  }

  const createNewCommandBlock = (sourceIndex: number, block: noteBlockType) => {
    const newBlock = block;
    newBlock.id = nextId;
    setNextId(nextId + 1);
    const localBlocks = [
        ...blocks.slice(0, sourceIndex),
        newBlock,
        ...blocks.slice(sourceIndex + 1)
    ];
    setBlocks(localBlocks);
    setFocusedBlockIndex(sourceIndex);
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
              <p className='text-center text-gray-300 text-sm'>Updated at: <em className='not-italic text-gray-200'>{updatedAt}</em></p>
            </>
          )}
        </div>
            <div className="relative editor w-100 h-[80lvh] overflow-hidden flex flex-col outline-none rounded-lg text-gray-600 bg-white p-4 m-4 font-medium min-h-[500px]" ref={editor}>
              <div className="masked-list-vert py-[20px] customScroll blocks h-[100%] overflow-y-scroll">
                {blocks.map(({ id, type, content }, index) => (
                  <NoteBlock
                    key={id}
                    index={index}
                    block={{type, content}}
                    focused={index === focusedBlockIndex ? true : false}
                    newBlock={createNewBlock}
                    newCommandBlock={createNewCommandBlock}
                    removeBlock={removeBlock}
                    requestFocusShift={handleFocusShift}
                    handleChange={(text) => {handleBlockChange(text, index)}}
                  />
                ))}
                {loading ? (
                  <LoaderGroup active={loaders} className='absolute w-full flex flex-col items-start gap-y-3'>
                    <LoaderRect className='h-14 w-3/5 min-w-[200px] max-w-[350px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[250px] max-w-[450px]'></LoaderRect>
                    <LoaderRect className='h-10 w-4/5 min-w-[240px] max-w-[450px]'></LoaderRect>
                  </LoaderGroup>
                ) : ''}
              </div>
              <div className={`${loading ? 'hidden' : ''}
                              saving-notif
                              flex items-center gap-x-1
                              absolute top-2 right-2 w-fit
                              px-2 py-1 border border-gray-600 rounded-md bg-whitebright/100
                              font-normal text-sm text-gray-800 backdrop-blur-sm ${ saving ? '' : 'saved'}`}>
                <p className='w-fit'>{ saving ? 'Saving' : 'Saved'}</p>
                <div className="icon relative h-5 w-5">
                  <AiOutlineLoading3Quarters className='circ absolute w-100 h-100'/>
                  <GiConfirmed className='tick absolute w-100 h-100' />
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Editor;
