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
          console.log(response.data);
          actionProvider.handleImageResponse(response.data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
          // Handle error if needed
        });
    }
  };

  return (
    <div style={styles.container}>
      <input
        type="file"
        onChange={handleImageChange}
        style={styles.input}
        accept="image/*" // Limit file selection to images only
      />
      <button onClick={handleImageUpload} style={styles.button}>
        Upload Image
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'white',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};

export default ImageUpload;
