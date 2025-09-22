
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LayoutContextType {
  isLogoVisible: boolean;
  setLogoVisible: (isVisible: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isLogoVisible, setLogoVisible] = useState(true);

  const value = {
    isLogoVisible,
    setLogoVisible,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
