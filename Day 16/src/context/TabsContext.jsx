import React, { createContext, useContext } from 'react';

// 1. Create the Context
export const TabsContext = createContext(null);

// 2. Custom Hook
export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
