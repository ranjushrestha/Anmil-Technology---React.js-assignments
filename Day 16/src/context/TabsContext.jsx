import React, { createContext, useContext } from 'react';

export const TabsContext = createContext(null);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
