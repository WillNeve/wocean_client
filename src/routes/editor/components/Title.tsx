import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';
//icons
import {FiAlertOctagon} from 'react-icons/fi';


interface titleProps {
  content: string,
  handleChange: (newTitle: string) => void
}

const Title: React.FC<titleProps> = ({content, handleChange}) => {
  const [localContent, setLocalContent] = useState(content);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setLocalContent(content);
  }, [content])

  const createMarkup = (content: string) => {
    return { __html: DOMPurify.sanitize(content) };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      if (invalid) {
        e.preventDefault();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLHeadElement>) => {
    const text = (e.target as HTMLInputElement).innerText;
    if (!invalid && text.length === 0 && e.key === 'Backspace') {
      setInvalid(true);
      handleChange('Title');
    } else if (/^[A-Za-z]$/.test(e.key) || (text.length > 0 && e.key === 'Backspace')) {
      setInvalid(false);
      handleChange(text);
    }
  };

  return (
    <>
      <div className="relative w-fit h-fit  mt-4  mx-auto">
      <h1 className={`text-gray-300 font-medium text-4xl
                      outline-none mx-auto w-fit m-w-5`}
              contentEditable={true}
              dangerouslySetInnerHTML={createMarkup(localContent)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}>
              </h1>
      <h1 className={`${!invalid ? 'hidden' : ''} text-gray-300/50
                      font-medium text-4xl
                      outline-none
                      absolute top-0 left-0 pointer-events-none -translate-x-1/2`}
              onKeyDown={handleKeyDown}>Title
              </h1>
      </div>
      <div className={`${!invalid ? 'hidden' : ''}
                      w-fit mx-auto text-red-500 font-medium
                      flex items-center gap-x-2`}><FiAlertOctagon className='mb-[1px]'/><p>Title must be provided</p></div>
    </>
  )
}

export default Title;
