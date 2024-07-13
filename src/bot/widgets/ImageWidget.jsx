// ImageWidget.jsx

import React from 'react';

const ImageWidget = ({ payload }) => {
  const { predicted_image } = payload;

  if (!predicted_image) {
    return null; // Handle case where predicted_image is not available
  }

  return (
    <div>
      <img
        src={predicted_image}
        alt="Predicted"
        style={{ width: '100%', maxWidth: '400px' }} // Example dimensions
      />
    </div>
  );
};

export default ImageWidget;
