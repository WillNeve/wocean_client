import React, { useEffect, useState } from 'react'

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
    return { __html: content };
  };

  const handleInput = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    const text = (e.target as HTMLInputElement).innerText;
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      if (text.length <= 1) {
        setInvalid(true);
        handleChange('Title');
      }
    } else if (!/^[A-Za-z]$/.test(e.key) && text.length === 0) {
      e.preventDefault();
    } else {
      setInvalid(false);
      handleChange(text);
    }
  };

  return (
    <>
      <div className="relative w-fit h-fit  mt-4  mx-auto">
      <h1 className={`font-medium text-4xl
                      outline-none mx-auto w-fit m-w-5`}
              contentEditable={true}
              dangerouslySetInnerHTML={createMarkup(localContent)}
              onKeyDown={handleInput}>
              </h1>
      <h1 className={`${!invalid ? 'hidden' : ''} text-gray-400/50
                      font-medium text-4xl
                      outline-none
                      absolute top-0 left-0 pointer-events-none -translate-x-1/2`}
              onKeyDown={handleInput}>Title
              </h1>
      </div>
      <div className={`${!invalid ? 'hidden' : ''}
                      w-fit mx-auto text-red-300 font-medium
                      flex items-center gap-x-2`}><FiAlertOctagon className='mb-[1px]'/><p>Title must be provided</p></div>
    </>
  )
}

export default Title;
