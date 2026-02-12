import React from 'react';
import './Sprite.css';

const Sprite = ({ type, value, size = 'md', className = '' }) => {
  // Construct the class names based on type and value
  // Example: sprite-rank-1, sprite-faction-might, sprite-icon-heart
  const spriteClass = `sprite-${type}-${String(value).toLowerCase()}`;

  return (
    <div className={`sprite ${spriteClass} size-${size} ${className}`} aria-label={`${type} ${value}`}>
      {/* Fallback text for debugging/placeholders if images fail or css is missing */}
      <span className="sprite-fallback">{value}</span>
    </div>
  );
};

export default Sprite;
