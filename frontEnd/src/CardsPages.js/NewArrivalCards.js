import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Card from '../Card';
import newArrivalImg1 from '../Images/Woman/1.jpg'; // Update with your image paths
import newArrivalImg2 from '../Images/Woman/2.jpg'; // Update with your image paths

const NewArrivalCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const cardData = [
    {
      id: 1, // Add unique id for each card
      imageSrc: newArrivalImg1,
      hoveredImageSrc: newArrivalImg2,
      cardName: 'New Arrival 1',
      category: 'New Arrivals',
      cutPrice: '$70',
      originalPrice: '$90',
      discount: '22'
    },
    {
      id: 2, // Add unique id for each card
      imageSrc: newArrivalImg1,
      hoveredImageSrc: newArrivalImg2,
      cardName: 'New Arrival 2',
      category: 'New Arrivals',
      cutPrice: '$80',
      originalPrice: '$100',
      discount: '20'
    },
    // Add more card data as needed
  ];

  const handleImageChange = (index) => {
    setHoveredIndex(index);
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

export default NewArrivalCards;
