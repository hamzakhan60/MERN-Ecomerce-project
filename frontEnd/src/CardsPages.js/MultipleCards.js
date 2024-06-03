import React, { useState } from 'react';
import Card from '../Card';

const MultipleCards = ({ cardData }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageChange = (index) => {
    setHoveredIndex(index);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <div key={index} className="relative">
          <Card
            imageSrc={index === hoveredIndex ? card.hoveredImageSrc : card.imageSrc}
            cardName={card.cardName}
            category={card.category}
            cutPrice={card.cutPrice}
            originalPrice={card.originalPrice}
            discount={card.discount}
            onMouseEnter={() => handleImageChange(index)}
            onMouseLeave={() => handleImageChange(null)}
            className="border border-gray-300 rounded overflow-hidden shadow-md relative" // Tailwind CSS classes for card styling
          />
        </div>
      ))}
    </div>
  );
};

export default MultipleCards;
