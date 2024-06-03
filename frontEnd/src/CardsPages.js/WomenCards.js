import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Card from '../Card';
import womenImg1 from '../Images/Woman/1.jpg'; // Update with your image paths
import womenImg2 from '../Images/Woman/2.jpg'; // Update with your image paths
import axios from 'axios';
import {UserSearch} from "../context/userContext";
const WomenCards = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [womenData, setWomenData] = useState([]);
  const [products,setProducts]=useState([]);
  const {userSearch}=useContext(UserSearch);
  const url = "http://localhost:8000/collection/ForWomen";


  useEffect(() => {
    const data = async () => {
      const response = await axios.get(url);
      console.log(response.data);
      setWomenData(response.data);
      setProducts(response.data);

    }
    data();
  }, []);
  useEffect(()=>{ 
    if(userSearch)
    {
      const handleSearch = () => {
        const filtered = products.filter((product) => {
          const lowerProductName = product.ProductName.toLowerCase();
          const lowerSubCategory =( product.clothId && product.clothId.SubCategory.toLowerCase()) || ( product.fragranceId && product.fragranceId.SubCategory.toLowerCase());
          return (
            lowerProductName.includes(userSearch.toLowerCase()) ||
            lowerSubCategory.includes(userSearch.toLowerCase())
          );
        });
        setWomenData(filtered);
      };
      handleSearch();
    }
    else
      setWomenData(products);
  },[userSearch])

  const cardData = [
    {
      id: 1, // Add unique id for each card
      imageSrc: womenImg1,
      hoveredImageSrc: womenImg2,
      cardName: 'Women Outfit 1',
      category: 'Women Fashion',
      cutPrice: '$60',
      originalPrice: '$80',
      discount: '25'
    },
    {
      id: 2, // Add unique id for each card
      imageSrc: womenImg1,
      hoveredImageSrc: womenImg2,
      cardName: 'Women Outfit 2',
      category: 'Women Fashion',
      cutPrice: '$55',
      originalPrice: '$70',
      discount: '21'
    },
    // Add more card data as needed
  ];

  const handleImageChange = (index) => {
    setHoveredIndex(index);
  };

  const toggleFavorite = (e) => {
    if (favorites.includes(e.target._id)) {
      setFavorites(favorites.filter((fav) => fav !== e.target._id));
    } else {
      setFavorites([...favorites, e.target._id]);
    }
  };
  console.log(favorites);

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {womenData.map((card, index) => {

        const clothItem = card.clothId;
        const fragranceItem = card.fragranceId;
        const imageSrc = (clothItem && clothItem.imgUrl) || (fragranceItem && fragranceItem.imgUrl);
        const cutPrice = card.Price + 500;

        const category = clothItem ? clothItem.StitchType : (fragranceItem ? fragranceItem.family : "N/A");


        return (
          <div key={card._id} className="relative">
            <Link to={`/details/${card._id}`}>
              <Card
                imageSrc={imageSrc}
                cardName={card.ProductName}
                category={category}
                cutPrice={cutPrice}
                originalPrice={card.Price}
                discount={20}
              // onMouseEnter={() => handleImageChange(index)}
              // onMouseLeave={() => handleImageChange(null)}
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
        );

      })}
    </div>
  );
};


export default WomenCards;
