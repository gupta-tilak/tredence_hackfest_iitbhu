// ImageWidget.jsx

import React from 'react';

const DamageWidget = ({ payload }) => {
  const { img1 } = payload;

  if (!img1) {
    console.log("empty")
    return null; // Handle case where predicted_image is not available
  }

  return (
    <div>
      <img
        src={img1}
        alt="Predicted"
        style={{ width: '100%', maxWidth: '400px' }} // Example dimensions
      />
    </div>
  );
};

export default DamageWidget;
