// NewPostModal.js
import React, { useState } from 'react';
import './newPostModal.css';
import ImageUploader from '../../ImageUploader';

export default function NewPostModal({ onClose, onSubmit }) {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');

    const handleSubmit = () => {
        const postDetails = {
            title,
            category,
            image
        };
        onSubmit(postDetails);
    };

    return (
        <div className="newpostmodal-container">
            <div className="newpostmodal-image-container">
                {image && <img src={image} alt="Preview" className="newpostmodal-image-preview" />}
                {!image && <ImageUploader onImageSelect={setImage} onImageUpload={() => {}} />
                }
            </div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="newpostmodal-input" />
            <select value={category} onChange={e => setCategory(e.target.value)} className="newpostmodal-select">
                <option value="General">General</option>
                <option value="Notices">Requests/Alerts</option>
                <option value="Promotions">Promotions</option>
            </select>
            <button onClick={handleSubmit} className="newpostmodal-btn newpostmodal-submit-btn">Submit</button>
            <button onClick={onClose} className="newpostmodal-btn newpostmodal-close-btn">Close</button>
        </div>
    );
    
}
