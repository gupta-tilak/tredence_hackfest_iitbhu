import React from 'react';

const ImageWidget = ({ image }) => {
    return (
      <div className="image-widget">
        <img src={image} alt="" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    );
  };

export default ImageWidget;
