import React, { useState } from 'react';
import './TabsButton.css';

export default function TabsButton({ onTabChange }) {
    const [showTabs, setShowTabs] = useState(false);
    const [activeTab, setActiveTab] = useState('Random');

    // Mapping of tabs to their corresponding emojis
    const tabEmojis = {
        'Campus Alerts': '🚨',
        'Campus Issues': '🔧',
        'Campus Events': '🎉',
        'Help Needed': '🆘',
        'Lost & Found': '🔍'  // Using a magnifying glass for 'Lost & Found'
    };

    const handleTabClick = (tab) => {
        console.log(`Filter ${tab} clicked.`);
        setActiveTab(tab);
        onTabChange(tab);
    };

    const handleMainButtonClick = () => {
        setShowTabs(!showTabs);
    };

    return (
        <div className="tabs-button-container">
            <button onClick={handleMainButtonClick} className="main-tab-button">
                {showTabs ? '⚙️' : '⚙️'}
            </button>
            {showTabs && Object.keys(tabEmojis).map(tab => (
                <button
                    key={tab}
                    className="sub-tab-button"
                    onClick={() => handleTabClick(tab)}
                >
                    {tabEmojis[tab]}
                </button>
            ))}
        </div>
    );
}
