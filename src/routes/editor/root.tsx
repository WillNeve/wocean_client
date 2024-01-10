import React, { useEffect, useRef, useState, useContext, useCallback} from 'react'
import {useParams} from "react-router-dom";
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

// user context
import { UserContext } from '../../auth';
// styling
import './editor.css';

interface editorProps {
}

const Editor: React.FC<editorProps> = () => {
  // page id
  const { id } = useParams();
  const pageId = id;
  // doc section state
  const [title, setTitle] = useState('test');
  const [content, setContent] = useState<string | null>(null);
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
  const [command, setCommand] = useState('');
  const [commandActive, setCommandActive] = useState(false);
  const [suggestedCommands, setSuggestedCommands] = useState(commandList);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0);
  const commandBox = useRef<HTMLElement | null>(null);
  const editor = useRef<HTMLDivElement | null>(null);

  const loadPage = useCallback(async (pageId: string) => {
    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/note/${pageId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user?.token,
      }
    })
    const data = await resp.json();

    setTitle(data.page.title);
    const santizedString = DOMPurify.sanitize(data.page.body);
    setContent(santizedString);
  }, [user, setContent])

  useEffect(() => {
    if (pageId) {
      console.log(pageId);
      loadPage(pageId);
      if (content !== null && editor.current !== null) {
        editor.current.innerHTML = parse(content).join('');
      }
    } else {
      // handle error
    }
  }, [])

  useEffect(() => {
    if (commandActive) {
      // show the command box
      commandBox.current?.classList.add('active');
    } else {
      // hide the command box and empty it
      console.log('removing suggestions!!!!');

      commandBox.current?.classList.remove('active');
    }
  }, [commandActive])

  const clearCommand = useCallback((node: HTMLElement) => {
    console.log('Command to remove:', `-/${command}-`);

    node.innerHTML = node.innerHTML.replace(`/${command}`, '');
    setCommandActive(false);
    setCommand('');
  }, [command])

  const handleEditorInput = (e) => {
    // console.log(e.nativeEvent.key);
    const input = e.nativeEvent.key;
    if (commandActive) {
      console.log('in command mode');

      // we are adding text to command
      if (input === 'Enter') {
        // run command
        e.preventDefault();
        e.target.focus()
        console.log('Running command:', command);
        clearCommand(e.target);
      } else if (input === 'Delete') {
        if (command.length > 0) {
          setCommand(command.slice(1, -1))
        } else {
          clearCommand(e.target);
        }
      } else {
        setCommand(command + input);
      }
    } else {
      // we assume we are adding text to content
      if (input === '/') {
        console.log('command key');
        setCommandActive(true);
      } else {
        // regular input
        // make post request to server
      }
    }
  }

  return (
    <div className='wrapper w-100 max-w-5xl mx-auto'>
      <div className='w-full'>
        <h1 className='font-medium text-4xl text-center my-4'>{title}</h1>
        <p className='text-center'>Last edited: 10:39 24/12/23</p>
      </div>
      <div className="editor outline-none rounded-lg bg-indigo-900 p-4 m-4 font-medium min-h-[500px]" contentEditable={true} onKeyDown={handleEditorInput} ref={editor}>
      </div>
      <ul ref={commandBox} className="commandBox w-fit bg-indigo-200 min-w-[300px] rounded-md flex-col overflow-hidden" contentEditable={false}>
        {/* add options here dpeending on the command being typed out (autocomplete) */}
        {suggestedCommands.map(({name, descriptor}, index) => (
          <li className={`p-2 text-gray-900 font-semibold ${index === highlightedSuggestion ? 'bg-indigo-500 text-gray-200' : ''}`}
              key={index}>
          {name} - {descriptor}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Editor;
