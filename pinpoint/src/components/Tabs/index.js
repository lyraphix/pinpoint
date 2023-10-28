import React from 'react';

const Tabs = ({ tabsStatus, onTabChange }) => {
  const tabs = ['Events', 'Locations', 'Details'];

  return (
    <div className="tabs-container">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab-button ${tabsStatus[tab] ? 'active' : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
