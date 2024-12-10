"use client";

import { createContext, FC, ReactNode, useContext, useState } from "react";

interface MeetingsContextProps {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const MeetingsContext = createContext<MeetingsContextProps | undefined>(
  undefined
);

export const MeetingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);

  return (
    <MeetingsContext.Provider value={{ isOpen, openSheet, closeSheet }}>
      {children}
    </MeetingsContext.Provider>
  );
};

export const useMeetingsContext = () => {
  const context = useContext(MeetingsContext);

  if (!context) {
    throw new Error(
      "useMeetingsContext must be used within a MeetingsProvider"
    );
  }
  return context;
};
