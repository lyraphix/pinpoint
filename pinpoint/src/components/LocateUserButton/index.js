import React from 'react';
import './LocateUserButton.css';


export default function LocateUserButton({ onClick }) {
    return (
        <button className="locate-user-button" onClick={onClick}>
            📍
        </button>
    );
}
