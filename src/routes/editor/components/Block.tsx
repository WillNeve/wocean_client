import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';

export type noteBlockType = {
  id?: number, // auto assigned in editor thus not set when passing in a command block from here
  type: string,
  content: string
}

interface NoteBlockProps {
  index: number,
  block: noteBlockType,
  handleChange: (content: string) => void,
  newBlock: (sourceIndex: number) => void,
  requestFocusShift: (index: number) => void,
  newCommandBlock: (sourceIndex: number, block: noteBlockType) => void,
  removeBlock: (index: number) => void,
  focused: boolean
}

type command = {
  name: string,
  match: RegExp,
  block: noteBlockType
}

const commands: command[] = [
  {
    name: 'Heading 1',
    match: /^He?a?d?i?n?g?\s?1?$/i,
    block: { type: 'h1', content: '' },
  },
  {
    name: 'Heading 2',
    match: /^He?a?d?i?n?g?\s?2?$/i,
    block: { type: 'h2', content: '' },
  },
  {
    name: 'Paragraph',
    match: /^Pa?r?a?g?r?a?p?h?$/i,
    block: { type: 'p', content: '' },
  },
  {
    name: 'Bold',
    match: /^Bo?l?d?$/i,
    block: { type: 'strong', content: '' },
  },
  {
    name: 'Italic',
    match: /^It?a?l?i?c?$/i,
    block: { type: 'em', content: '' },
  },
]

const NoteBlock: React.FC<NoteBlockProps> = ({index, block, handleChange, newBlock, newCommandBlock, removeBlock, focused, requestFocusShift}) => {
  const [content] = useState<string>(block.content)
  const [empty, setEmpty] = useState<boolean>(content.length === 0);
  const blockRef = useRef<HTMLDivElement>(null);


  const [commandsActive, setCommandsActive] = useState(false);
  const [suggestedCommands, setSuggestedCommands] = useState(commands);
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(0);
  const [writtenCommand, setWrittenCommand] = useState('');

  useEffect(() => {
    if (commandsActive) {
      let suggestions;
      if (writtenCommand === '') {
        suggestions = commands;
      } else {
        suggestions = commands.filter((command) => command.match.test(writtenCommand))
      }
      setSuggestedCommands(suggestions);

    }
  }, [writtenCommand, commandsActive])

  const handleInput = (e: React.KeyboardEvent<HTMLElement>) => {
    // Keydown event, any preventative pre text change actions go here
    // console.log(e.key);
    const text = (e.target as HTMLInputElement).innerText;
    if (commandsActive) {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (highlightedSuggestion === suggestedCommands.length - 1) {
          setHighlightedSuggestion(0);
        } else {
          setHighlightedSuggestion(highlightedSuggestion + 1);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        if (highlightedSuggestion === 0) {
          setHighlightedSuggestion(suggestedCommands.length - 1);
        } else {
          setHighlightedSuggestion(highlightedSuggestion - 1);
        }
      } else if (e.key === 'ArrowDown') {
        if (highlightedSuggestion === suggestedCommands.length - 1) {
          setHighlightedSuggestion(0);
        } else {
          setHighlightedSuggestion(highlightedSuggestion + 1);
        }
      }
    } else {
      if (e.key === 'Enter') {
        newBlock(index);
        e.preventDefault();
        return;
      } else if (text.length === 0 && e.key === '/') {
        setCommandsActive(true)
      } else if (text.length === 0 && e.key === 'Backspace') {
        removeBlock(index);
        e.preventDefault();
        return;
      } else if (e.key === 'ArrowUp') {
        requestFocusShift(index - 1)
      } else if (e.key === 'ArrowDown') {
        requestFocusShift(index + 1)
      }
    }
  };

  const sendCommand = () => {
    const commandBlock = suggestedCommands[highlightedSuggestion]?.block;
    if (commandBlock) {
      newCommandBlock(index, commandBlock)
    }
    setCommandsActive(false);
  }

  const handleCommands = (e: React.KeyboardEvent<HTMLElement>) => {
    // keyup event, any post text change actions go here
    const text = (e.target as HTMLInputElement).innerText;
    setEmpty(text.length === 0);
    if (commandsActive) {
      if (e.key === 'Backspace' && text.length < 1) {
        setCommandsActive(false);
        setHighlightedSuggestion(0);
      } else if (e.key === 'Enter') {
        sendCommand();
      } else if (e.key === ' ') {
        setCommandsActive(false);
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        setHighlightedSuggestion(0);
        setWrittenCommand(text.substring(1))
      }
    } else {
      if (/^(\w|\s|Backspace)$/.test(e.key)) {
        // console.clear();
        // console.log('Saving text:', text);
        handleChange(text);
      }
    }
  }

  const createMarkup = (content: string) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  useEffect(() => {
    if (blockRef.current) {
      if (focused) {
        blockRef.current.focus();
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(blockRef.current);
        range.collapse(false); // Collapse the range to the end
        selection?.removeAllRanges();
        selection?.addRange(range);
      } else {
        blockRef.current.blur();
      }
    }
  }, [focused, block])

  const formBlock = (block: noteBlockType) => {
    switch (block.type) {
      case 'p':
        return (
          <div className='w-full relative'>
            <p className={`${empty && focused ? '' : 'hidden'} absolute pointer-events-none w-full py-1 px-1 text-gray-500 outline-none`}>
              Start typing or press '/' for commands
            </p>
            <p
              className={`${empty && focused ? '' : ''} w-full py-1 px-1 focus:bg-waveLight-500/50 outline-none`}
              contentEditable={true}
              ref={blockRef}
              onClick={() => {requestFocusShift(index)}}
              onKeyDown={handleInput}
              onKeyUp={handleCommands}
              dangerouslySetInnerHTML={createMarkup(content)}
            />
          </div>
        );
        break;
      case 'h1':
          return (
              <h1
              className={`w-full py-2 px-1 focus:bg-waveLight-500/50 text-5xl outline-none`}
              contentEditable={true}
              ref={blockRef}
              onClick={() => {requestFocusShift(index)}}
              onKeyDown={handleInput}
              onKeyUp={handleCommands}
              dangerouslySetInnerHTML={createMarkup(content)}
              />
          )
        break;
      case 'h2':
        return (
            <h2
            className={`w-full py-1 px-1 focus:bg-waveLight-500/50 text-3xl outline-none`}
            contentEditable={true}
            ref={blockRef}
            onClick={() => {requestFocusShift(index)}}
            onKeyDown={handleInput}
            onKeyUp={handleCommands}
            dangerouslySetInnerHTML={createMarkup(content)}
            />
        )
        break;
      case 'em':
        return (
            <em
            className={`block w-full py-1 px-1 focus:bg-waveLight-500/50 outline-none`}
            contentEditable={true}
            ref={blockRef}
            onClick={() => {requestFocusShift(index)}}
            onKeyDown={handleInput}
            onKeyUp={handleCommands}
            dangerouslySetInnerHTML={createMarkup(content)}
            />
        )
        break;
      case 'strong':
        return (
            <strong
            className={`block w-full py-1 px-1 focus:bg-waveLight-500/50 outline-none`}
            contentEditable={true}
            ref={blockRef}
            onClick={() => {requestFocusShift(index)}}
            onKeyDown={handleInput}
            onKeyUp={handleCommands}
            dangerouslySetInnerHTML={createMarkup(content)}
            />
        )
        break;
      default:
        return null;
    }
  }

  return (
    <div className={`w-full`} style={{order: index}}>
      {formBlock(block)}
      <div className={`${commandsActive ? 'flex flex-col' : 'hidden'}
                      commandBox bg-gray-200 text-gray-600 font-medium text-xl
                      p-2
                      border border-gray-600 rounded-b-lg
                      `}>
        <ul>
          {suggestedCommands.length > 0 ? (
            suggestedCommands.map((command, index) => (
              <li key={index}
                  className={`${index === highlightedSuggestion ? 'font-bold bg-waveLight-600' : ''}
                          p-1 text-sm cursor-pointer`}
                  onMouseOver={() => setHighlightedSuggestion(index)}
                  onClick={sendCommand}>
                {command.name}
              </li>
            ))
          ) : (
            <p className={`${index === highlightedSuggestion ? 'font-bold bg-waveLight-600' : ''}
            p-1 text-sm `}>No commands found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoteBlock;
