import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Group {
  id: string | null;
  name: string | null;
}

interface CurrentGroupContextProps {
  currentGroup: Group | null;
  setCurrentGroup: (group: Group | null) => void;
}

const CurrentGroupContext = createContext<CurrentGroupContextProps | undefined>(undefined);

interface CurrentGroupProviderProps {
  children: ReactNode;
}

export const CurrentGroupProvider: React.FC<CurrentGroupProviderProps> = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null);

  return (
    <CurrentGroupContext.Provider value={{ currentGroup, setCurrentGroup }}>
      {children}
    </CurrentGroupContext.Provider>
  );
};

export const useCurrentGroup = (): CurrentGroupContextProps => {
  const context = useContext(CurrentGroupContext);
  if (!context) {
    throw new Error('useCurrentGroup must be used within a CurrentGroupProvider');
  }
  return context;
};
