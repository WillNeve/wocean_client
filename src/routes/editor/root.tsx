// react
import React, { useEffect, useRef, useState, useContext, useCallback} from 'react'
import {useNavigate, useParams} from "react-router-dom";
// libraries
import debounce from 'lodash/debounce'; // debouce library, to not send stale requests / spam api

// cursor context
import { CursorContextProvider } from '../../contexts/cursor';
// user context
import { UserContext } from '../../auth';

// styling
import './editor.css';
//components
import TextBlock from './components/block';

interface BlockObject {
  type: string; // You might want to use more specific types based on your use case
  content: string;
}

const Editor: React.FC= () => {
  const editor = useRef<HTMLDivElement>(document.createElement('div'));
  const commandBox = useRef<HTMLUListElement>(document.createElement('ul'));
  const navigate = useNavigate();
  // note id
  const { id } = useParams();
  const noteId = id;
  // doc section state
  const [title, setTitle] = useState('test');
  const [updatedAt, setUpdatedAt] = useState('n/a');
  const [blocks, setBlocks] = useState<BlockObject[]>([]);
  // user
  const { user } = useContext(UserContext);
  // command
  const commandList = [
    {
      name: 'h1',
      descriptor: 'Heading 1',
      output: `<h1></h1>`
    }
  ]
  // const [command, setCommand] = useState('');
  // const [commandActive, setCommandActive] = useState(false);
  const [suggestedCommands] = useState(commandList);
  const [highlightedSuggestion] = useState(0);
  const [loading, setLoading] = useState(true);


  const handleBlockChange = useCallback((newContent: string, index: number) => {
    const localBlocks = [...blocks];
    const updatedBlock = {
        ...blocks[index],
        content: newContent,
    };
    localBlocks[index] = updatedBlock;
    setBlocks(localBlocks)
    console.log('blocks have been set');
  }, [blocks])

  const loadNote = useCallback(async (noteId: string) => {
    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/note/${noteId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user?.token,
      }
    })
    const data = await resp.json();
    if (data.note) {

      setTitle(data.note.title);
      const date = new Date(data.note.updated_at);
      setUpdatedAt(date.toLocaleString('en-GB'))
      const blocks = await JSON.parse(data.note.body);
      setBlocks(blocks);
      setLoading(false);
    }
  }, [user, setBlocks])

  const saveNote = useCallback(async (noteId: string) => {
    if (!loading) {

      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/note/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + user?.token,
        },
        body: JSON.stringify({ body: blocks })
      })
      const data = await resp.json();
      console.log(data); // remove this and append some saved notifcation with minimal attention
    }
  }, [user, blocks, loading])

  useEffect(() => {
    if (noteId) {
      loadNote(noteId);
    } else {
      // handle error
      navigate("/404");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const debouncedsaveNote = debounce(saveNote, 2000);

  useEffect(() => {
    if (noteId) {
      debouncedsaveNote(noteId)
    }
  }, [blocks, noteId, debouncedsaveNote])

  return (
    <div className='wrapper w-100 max-w-5xl mx-auto'>
      <div className='meta w-full'>
        <h1 className='font-medium text-4xl text-center mt-4'>{title}</h1>
        <p className='text-center font-medium text-gray-600 text-sm'>Updated at: <em className='not-italic font-semibold'>{updatedAt}</em></p>
      </div>
      <CursorContextProvider>
        <div className="wrapper relative">
          <div className="editor outline-none rounded-lg bg-blue-900 p-4 m-4 font-medium min-h-[500px]" ref={editor}>
            {blocks.map(({ type, content }, index) => (
              <TextBlock
                key={index}
                blockType={type}
                handleChange={(newContent) => {
                  handleBlockChange(newContent, index);
                }}
              >
                {content}
              </TextBlock>
            ))}
          </div>
          <ul ref={commandBox} className="absolute left-[20px] commandBox w-fit bg-blue-200 min-w-[300px] rounded-md flex-col overflow-hidden">
            {/* add options here dpeending on the command being typed out (autocomplete) */}

            {suggestedCommands.map(({name, descriptor}, index) => (
              <li className={`p-2 text-gray-900 font-semibold ${index === highlightedSuggestion ? 'bg-blue-500 text-gray-200' : ''}`}
                  key={index}>
              {name} - {descriptor}
              </li>
            ))}
          </ul>
        </div>
      </CursorContextProvider>
    </div>
  )
}

export default Editor;
