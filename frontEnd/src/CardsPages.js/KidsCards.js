import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Card from '../Card';
import kidsImg1 from '../Images/Woman/5.jpg'; // Update with your image paths
import kidsImg2 from '../Images/Woman/4.jpg'; // Update with your image paths

const KidsCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const cardData = [
    {
      id: 1, // Add unique id for each card
      imageSrc: kidsImg1,
      hoveredImageSrc: kidsImg2,
      cardName: 'Kids Outfit 1',
      category: 'Kids Fashion',
      cutPrice: '$30',
      originalPrice: '$40',
      discount: '25'
    },
    {
      id: 2, // Add unique id for each card
      imageSrc: kidsImg2,
      hoveredImageSrc: kidsImg1,
      cardName: 'Kids Outfit 2',
      category: 'Kids Fashion',
      cutPrice: '$25',
      originalPrice: '$35',
      discount: '28'
    },
    // Add more card data as needed
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const toggleFavorite = (index) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((fav) => fav !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <div key={card.id} className="relative">
          <Link to={`/details/${card.id}`}>
            <Card
              imageSrc={hoveredIndex === index ? card.hoveredImageSrc : card.imageSrc}
              cardName={card.cardName}
              category={card.category}
              cutPrice={card.cutPrice}
              originalPrice={card.originalPrice}
              discount={card.discount}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="border border-gray-300 rounded overflow-hidden shadow-md relative" // Tailwind CSS classes for card styling
            />
          </Link>
          <div
            className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
            onClick={() => toggleFavorite(index)}
          >
            <AiOutlineHeart
              className={`text-red-500 ${favorites.includes(index) ? 'fill-current' : 'stroke-current'}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KidsCards;
