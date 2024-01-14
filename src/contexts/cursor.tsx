import React, { createContext, ReactNode, useState } from 'react';


type cursorPosition = {
  col: number,
  node?: HTMLElement
}

interface CursorContextProps {
  restoreCursorPosition?: () => void,
  saveCursorPosition?: (target: HTMLElement) => void;
}

export const CursorContext = createContext<CursorContextProps>({});

export const CursorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorPosition, setCursorPosition] = useState<cursorPosition>({
    col: 0,
  });

  const saveCursorPosition = (target: HTMLElement) => {
    const selection = window.getSelection();
    const offset = (selection?.anchorOffset ?? 0)
    if (setCursorPosition) {
      setCursorPosition({...cursorPosition, col: offset, node: target})
    }
  };

  const restoreCursorPosition = () => {
    if (cursorPosition.node && cursorPosition.node.childNodes[0]) {
      const col = Math.min(cursorPosition.col, cursorPosition.node.childNodes[0].length);
      const range = document.createRange();
      range.setStart(cursorPosition.node.childNodes[0], col);
      range.setEnd(cursorPosition.node.childNodes[0], col);

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <CursorContext.Provider value={{ restoreCursorPosition, saveCursorPosition }}>
      {children}
    </CursorContext.Provider>
  );
};
