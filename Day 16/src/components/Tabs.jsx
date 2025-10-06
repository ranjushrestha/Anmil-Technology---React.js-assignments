import React, { useState, Children, cloneElement, useContext } from "react";
import { TabsContext, useTabs } from "../context/TabsContext";
import "./Tabs.css";

// Tabs container
const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext value={{ activeIndex, setActiveIndex }}>
      <div className="tabs-container">
        {Children.map(children, (child) =>
          React.isValidElement(child) ? child : child
        )}
      </div>
    </TabsContext>
  );
};

// Tab buttons 
const TabList = ({ children }) => {
  const { activeIndex, setActiveIndex } = useTabs();

  return (
    <div className="tab-list">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index),
          tabIndex: index === activeIndex ? 0 : -1
        })
      )}
    </div>
  );
};
TabList.displayName = "TabList";

// Single tab
const Tab = ({ children, isActive, onClick, tabIndex }) => {
  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={onClick}
      type="button"
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};

// Panel container 
const TabPanels = ({ children }) => {
  const { activeIndex } = useTabs();
  const panelsArray = Children.toArray(children);
  return <div className="tab-panels">{panelsArray[activeIndex] || null}</div>;
};
TabPanels.displayName = "TabPanels";

// Single panel
const TabPanel = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};

export { Tabs, TabList, Tab, TabPanels, TabPanel };
