// ActionButton.js
import React from 'react';
import './ActionButton.css';

export default function ActionButton({ onClick }) {
    return (
        <button className="action-button" onClick={onClick}>
            +
        </button>
    );
}
