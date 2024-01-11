import React, { createContext, ReactNode, useState } from 'react';


type cursorPosition = {
  row: number,
  col: number,
  node?: HTMLElement
}

interface CursorContextProps {
  cursorPosition: cursorPosition,
  setCursorPosition?: (position: cursorPosition) => void;
}

const defaultCursorContextValue = {
  cursorPosition: {
    row: 0,
    col: 0
  }
}

export const CursorContext = createContext<CursorContextProps>(defaultCursorContextValue);

export const CursorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<cursorPosition>(defaultCursorContextValue.cursorPosition);

  const setCursorPosition = (position: cursorPosition) => {
    setCursorState(position);
  };

  return (
    <CursorContext.Provider value={{ cursorPosition: cursorState, setCursorPosition }}>
      {children}
    </CursorContext.Provider>
  );
};
