import React, { useState } from 'react';
import './TabsButton.css';

export default function TabsButton({ onTabChange }) {
    const [showTabs, setShowTabs] = useState(false);
    const [activeTab, setActiveTab] = useState('Random');

    const handleTabClick = (tab) => {
        console.log(`Filter ${tab} clicked.`); // Added console log
        setActiveTab(tab);
        onTabChange(tab);
    };

    const handleMainButtonClick = () => {
        setShowTabs(!showTabs);
    };

    return (
        <div className="tabs-button-container">
            <button onClick={handleMainButtonClick} className="main-tab-button">
                {showTabs ? 'Close Filters' : 'Filters'}
            </button>
            {showTabs && ['Requests', 'Events', 'Alerts'].map(tab => (
                <button
                    key={tab}
                    className="sub-tab-button"
                    onClick={() => handleTabClick(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
