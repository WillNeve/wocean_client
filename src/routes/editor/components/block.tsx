import React, { FormEvent, ReactNode, useState, useContext, useEffect } from 'react';
import { CursorContext } from '../../../contexts/cursor';

interface TextBlockProps {
  children: ReactNode;
  blockType: string;
  handleChange: (content: string) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ children, blockType, handleChange }) => {
  const { cursorPosition, setCursorPosition } = useContext(CursorContext);

  const [content, setContent] = useState<string>(() => {
    // Set initial content
    if (typeof children === 'string') {
      return children;
    }
    return '';
  });

  const handleInput = (e: FormEvent) => {
    const selection = window.getSelection();
    const offset = (selection?.anchorOffset ?? 0)
    if (setCursorPosition) {
      setCursorPosition({...cursorPosition, row: offset, node: (e.target as HTMLElement)})
    }

    const target = e.target as HTMLInputElement;
    setContent(target.innerText);
    handleChange(target.innerText);
  };

  useEffect(() => {
    if (cursorPosition.node && cursorPosition.node.childNodes[0]) {
      const range = document.createRange();
      range.setStart(cursorPosition.node.childNodes[0], cursorPosition.row);
      range.setEnd(cursorPosition.node.childNodes[0], cursorPosition.row);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [children, cursorPosition])

  const createMarkup = () => {
    return { __html: content };
  };

  switch (blockType) {
    case 'p':
      return (
        <div>
          <p
            className='w-100 py-2 px-1  focus:bg-indigo-800 outline-none'
            contentEditable={true}
            onInput={handleInput}
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>
      );
      break;
    case 'h1':
        return (
          <div>
            <h1
            className='w-100 py-2 px-1 focus:bg-indigo-800 text-5xl outline-none'
            contentEditable={true}
            onInput={handleInput}
            dangerouslySetInnerHTML={createMarkup()}
            />
          </div>
        )
      break;
    default:
      return null;
  }
};

export default TextBlock;
