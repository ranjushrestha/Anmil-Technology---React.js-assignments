import { useState, createContext, useContext, cloneElement, Children } from "react";
import "./Tabs.css";


const TabsContext = createContext();


const useTabs = () => useContext(TabsContext);

// Main Tabs container
export const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs-container">{children}</div>
    </TabsContext.Provider>
  );
};

// Container for tab buttons
export const TabList = ({ children }) => {
  const { activeIndex, setActiveIndex } = useTabs();

  return (
    <div className="tab-list">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index),
        })
      )}
    </div>
  );
};

// Single tab button
export const Tab = ({ children, isActive, onClick }) => (
  <button className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
    {children}
  </button>
);

// Container for tab panels
export const TabPanels = ({ children }) => {
  const { activeIndex } = useTabs();
  const childrenArray = Children.toArray(children); 
  return <div className="tab-panels">{childrenArray[activeIndex]}</div>;
};

// Single tab panel
export const TabPanel = ({ children }) => <div className="tab-panel">{children}</div>;
