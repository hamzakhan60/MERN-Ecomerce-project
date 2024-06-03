// MenCards.js
import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import Card from '../Card';
import menImg1 from '../Images/men/1.jpg'; // Update with your image paths
import menImg2 from '../Images/men/4.jpg'; // Update with your image paths
import axios from 'axios';
import {UserSearch} from "../context/userContext";


const MenCards = () => {
  const navigate=useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mensData, setMensData] = useState([]);
  const {userSearch}=useContext(UserSearch);
  const [products,setProducts]=useState([]);
  const url = "http://localhost:8000/collection/ForMen";
  useEffect(() => {
    const data = async () => {
      const response = await axios.get(url);
      console.log(response.data);
      setMensData(response.data);
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
        setMensData(filtered);
      };
      handleSearch();
    }
    else
      setMensData(products);
  },[userSearch])




 

  const handleImageChange = (index) => {
    setHoveredIndex(index);
  };



  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {mensData.map((card, index) => {

        const clothItem = card.clothId;
        const fragranceItem = card.fragranceId;
        const imageSrc = (clothItem && clothItem.imgUrl) || (fragranceItem && fragranceItem.imgUrl);
        const cutPrice= card.Price+500;
       
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
            
              />
            </Link>
            <div
              className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
          
            >
              <AiOutlineHeart
                className="text-red-500 "
              />
            </div>

          </div>
        );

      })}
    </div>
  );
};

export default MenCards;
