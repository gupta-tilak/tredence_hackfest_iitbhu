// ImageUpload.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ setState, actionProvider }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      // Replace 'YOUR_API_ENDPOINT' with your actual Flask API endpoint
      axios.post('http://0.0.0.0:80', formData)
        .then(response => {
          // Handle the response from Flask API
          actionProvider.handleImageResponse(response.data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // Handle error if needed
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
