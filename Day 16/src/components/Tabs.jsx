import React, { useState, Children, cloneElement } from "react";
import "./Tabs.css";

/* ---------------------- Main Tabs Component ---------------------- */
export const Tabs = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const tabList = Children.toArray(children).find(
    (child) => child.type.displayName === "TabList"
  );

  const tabPanels = Children.toArray(children).find(
    (child) => child.type.displayName === "TabPanels"
  );

  return (
    <div className="tabs-container">
      {tabList && cloneElement(tabList, { activeIndex, setActiveIndex })}
      {tabPanels && cloneElement(tabPanels, { activeIndex })}
    </div>
  );
};

/* ---------------------- Tab List ---------------------- */
export const TabList = ({ children, activeIndex, setActiveIndex }) => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % Children.count(children));
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((prev) =>
        prev === 0 ? Children.count(children) - 1 : prev - 1
      );
    }
  };

  return (
    <div
      className="tab-list"
      role="tablist"
      aria-label="Tabs navigation"
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isActive: index === activeIndex,
          onClick: () => setActiveIndex(index),
          tabIndex: index === activeIndex ? 0 : -1,
        })
      )}
    </div>
  );
};
TabList.displayName = "TabList";

/* ---------------------- Individual Tab ---------------------- */
export const Tab = ({ children, isActive, onClick, tabIndex }) => {
  return (
    <button
      className={`tab ${isActive ? "active" : ""}`}
      onClick={onClick}
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};

/* ---------------------- Tab Panels Container ---------------------- */
export const TabPanels = ({ children, activeIndex }) => {
  const panelsArray = Children.toArray(children);
  return <div className="tab-panels">{panelsArray[activeIndex] || null}</div>;
};
TabPanels.displayName = "TabPanels";

/* ---------------------- Individual Tab Panel ---------------------- */
export const TabPanel = ({ children }) => {
  return <div className="tab-panel" role="tabpanel">{children}</div>;
};
