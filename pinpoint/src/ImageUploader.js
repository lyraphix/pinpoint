import React, { useState } from 'react';
import { storage } from './index'; // Import your Firebase storage instance
import './ImageUploader.css'

function ImageUploader() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on('state_changed', null, null, () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Do something with the uploaded image URL, e.g., save it in a database
            console.log('Image URL:', url);
          });
      });
    }
  };

  return (
    <div className="choose-file">
      <input type="file" onChange={handleImageChange} />
    </div>
  );
}

export default ImageUploader;
