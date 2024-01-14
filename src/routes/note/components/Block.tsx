import React, { useEffect, useState, useRef } from 'react';

export type noteBlockType = {
  id: number,
  type: string,
  content: string
}

interface NoteBlockProps {
  block: noteBlockType
  handleChange: (content: string) => void,
  newBlock: (id: number) => void,
  newCommandBlock: (id: number, block: noteBlockType) => void,
  removeBlock: (id: number) => void,
  focus: boolean
}

type command = {
  name: string,
  match: RegExp,
  block: noteBlockType
}

const NoteBlock: React.FC<NoteBlockProps> = ({ block, handleChange, newBlock, newCommandBlock, removeBlock, focus}) => {
  const [content] = useState<string>(block.content)
  const blockRef = useRef<HTMLDivElement>(null);

  const commands: command[] = [
    {
      name: 'Heading 1',
      match: /^He?a?d?i?n?g?\s?1?$/i,
      block: { id: 0, type: 'h1', content: '' },
    },
    {
      name: 'Heading 2',
      match: /^He?a?d?i?n?g?\s?2?$/i,
      block: { id: 0, type: 'h2', content: '' },
    },
    {
      name: 'Paragraph',
      match: /^Pa?r?a?g?r?a?p?h?$/i,
      block: { id: 0, type: 'p', content: '' },
    },
    {
      name: 'Bold',
      match: /^Bo?l?d?$/i,
      block: { id: 0, type: 'strong', content: '' },
    },
    {
      name: 'Italic',
      match: /^It?a?l?i?c?$/i,
      block: { id: 0, type: 'em', content: '' },
    },
  ];

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
  }, [writtenCommand])

  const handleInput = (e: React.KeyboardEvent<HTMLElement>) => {
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
        newBlock(block.id);
        e.preventDefault();
        return;
      } else if (text.length === 0 && e.key === '/') {
        setCommandsActive(true)
      } else if (text.length === 0 && e.key === 'Backspace') {
        removeBlock(block.id);
        return;
      }
      if (/^(\w|\s|Backspace)$/.test(e.key)) {
        handleChange(text);
      }
    }
  };

  const handleCommands = (e: React.KeyboardEvent<HTMLElement>) => {
    const text = (e.target as HTMLInputElement).innerText;
    if (commandsActive) {
      if (e.key === 'Backspace' && text.length < 1) {
        setCommandsActive(false);
        setHighlightedSuggestion(0);
      } else if (e.key === 'Enter') {
        const commandBlock = commands[highlightedSuggestion].block;
        newCommandBlock(block.id, commandBlock)
        setCommandsActive(false);
      } else if (e.key !== 'Tab') {
        setHighlightedSuggestion(0);
        setWrittenCommand(text.substring(1))
      }
    }
  }



  const createMarkup = () => {
    return { __html: content };
  };

  useEffect(() => {
    if (blockRef.current) {
      if (focus) {
        blockRef.current.focus();
      } else {
        blockRef.current.blur();
      }
    }
  }, [focus])

  const formBlock = (block: noteBlockType) => {
    switch (block.type) {
      case 'p':
        return (
            <p
              className={`w-100 ${focus ? '' : ''} py-1 px-1 focus:bg-gray-800/20 outline-none`}
              contentEditable={true}
              ref={blockRef}
              onKeyDown={handleInput}
              onKeyUp={handleCommands}
              dangerouslySetInnerHTML={createMarkup()}
            />
        );
        break;
      case 'h1':
          return (
              <h1
              className={`w-100 py-2 px-1 focus:bg-gray-800/20 text-5xl outline-none`}
              contentEditable={true}
              ref={blockRef}
              onKeyDown={handleInput}
              onKeyUp={handleCommands}
              dangerouslySetInnerHTML={createMarkup()}
              />
          )
        break;
      case 'h2':
        return (
            <h1
            className={`w-100 py-2 px-1 focus:bg-gray-800/20 text-5xl outline-none`}
            contentEditable={true}
            ref={blockRef}
            onKeyDown={handleInput}
            onKeyUp={handleCommands}
            dangerouslySetInnerHTML={createMarkup()}
            />
        )
        break;
      case 'h3':
        return (
            <h1
            className={`w-100 py-2 px-1 focus:bg-gray-800/20 text-5xl outline-none`}
            contentEditable={true}
            ref={blockRef}
            onKeyDown={handleInput}
            onKeyUp={handleCommands}
            dangerouslySetInnerHTML={createMarkup()}
            />
        )
        break;
      default:
        return null;
    }
  }

  return (
    <div className={`w-100`} style={{order: block.id}}>
      {formBlock(block)}
      <div className={`${commandsActive ? 'flex flex-col' : 'hidden'}
                      commandBox bg-gray-400 text-gray-800 font-medium text-xl
                      p-2
                      border border-gray-600 rounded-b-lg
                      `}>
        <ul>
          {suggestedCommands.map((command, index) => (
            <li key={index}
            className={`${suggestedCommands[highlightedSuggestion]?.name === command.name ? 'font-bold bg-sky-500' : ''}
                        p-1 text-sm `}>
              {command.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoteBlock;
