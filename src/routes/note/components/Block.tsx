import React, { useEffect, useState, useRef } from 'react';
import DOMPurify from 'dompurify';

export type noteBlockType = {
  id?: number,
  type: string,
  content: string
}

interface NoteBlockProps {
  index: number,
  block: noteBlockType
  handleChange: (content: string) => void,
  newBlock: (sourceIndex: number) => void,
  requestFocusShift: (index: number) => void,
  newCommandBlock: (sourceIndex: number, block: noteBlockType) => void,
  removeBlock: (index: number) => void,
  focus: boolean
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

const NoteBlock: React.FC<NoteBlockProps> = ({index, block, handleChange, newBlock, newCommandBlock, removeBlock, focus, requestFocusShift}) => {
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
        return;
      } else if (/^(\w|\s|Backspace)$/.test(e.key)) {
        handleChange(text);
      }

    }
    if (e.key === 'ArrowUp') {
      requestFocusShift(index - 1)
    } else if (e.key === 'ArrowDown') {
      requestFocusShift(index + 1)
    }
  };

  const handleCommands = (e: React.KeyboardEvent<HTMLElement>) => {
    const text = (e.target as HTMLInputElement).innerText;
    setEmpty(text.length === 0);
    if (commandsActive) {
      if (e.key === 'Backspace' && text.length < 1) {
        setCommandsActive(false);
        setHighlightedSuggestion(0);
      } else if (e.key === 'Enter') {
        const commandBlock = suggestedCommands[highlightedSuggestion].block;
        newCommandBlock(index, commandBlock)
        setCommandsActive(false);
      } else if (e.key === ' ') {
        setCommandsActive(false);
      } else if (e.key !== 'Tab') {
        setHighlightedSuggestion(0);
        setWrittenCommand(text.substring(1))
      }
    }
  }

  const createMarkup = (content: string) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  useEffect(() => {
    if (blockRef.current) {
      if (focus) {
        blockRef.current.focus();
      } else {
        blockRef.current.blur();
      }
    }
  }, [focus, block])

  const formBlock = (block: noteBlockType) => {
    switch (block.type) {
      case 'p':
        return (
          <div className='w-full'>
            <p className={`${empty && focus ? '' : 'hidden'} absolute pointer-events-none w-full py-1 px-1 focus:bg-gray-800/20 outline-none opacity-20`}>
              Start typing or press '/' for commands
            </p>
            <p
              className={`w-full py-1 px-1 focus:bg-gray-800/20 outline-none`}
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
              className={`w-full py-2 px-1 focus:bg-gray-800/20 text-5xl outline-none`}
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
            className={`w-full py-1 px-1 focus:bg-gray-800/20 text-3xl outline-none`}
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
            className={`block w-full py-1 px-1 focus:bg-gray-800/20 outline-none`}
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
            className={`block w-full py-1 px-1 focus:bg-gray-800/20 outline-none`}
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
                      commandBox bg-gray-400 text-gray-800 font-medium text-xl
                      p-2
                      border border-gray-600 rounded-b-lg
                      `}>
        <ul>
          {suggestedCommands.length > 0 ? (
            suggestedCommands.map((command, index) => (
              <li key={index}
              className={`${index === highlightedSuggestion ? 'font-bold bg-sky-500' : ''}
                          p-1 text-sm `}>
                {command.name}
              </li>
            ))
          ) : (
            <p className={`${index === highlightedSuggestion ? 'font-bold bg-sky-500' : ''}
            p-1 text-sm `}>No commands found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoteBlock;
