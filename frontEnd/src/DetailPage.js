import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserLoginContext } from "./context/userLoginContext";
import { UpdateCartContext } from "./context/updatedCartContext";

const DetailPage = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [card, setCard] = useState(null);
  const { userLoginCredential } = useContext(UserLoginContext);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const url = `http://localhost:8000/product/${_id}`;
  console.log("updateCart" + updateCart);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(url);
        setProductData(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    getProduct();
  }, [_id, url]);
  console.log(productData);

  useEffect(() => {
    if (productData) {
      const newCard = {
        id: productData._id,
        cardName: productData.ProductName,
        category: productData.clothId ? productData.clothId.StitchType : productData.fragranceId.SubCategory,
        cutPrice: productData.Price + 500,
        originalPrice: productData.Price,
        discount: '33',
        images: productData.clothId ? productData.clothId.imgUrl : productData.fragranceId.imgUrl,
        sizes: productData.clothId ? productData.clothId.Size : productData.fragranceId.Size,
        colors: productData.clothId ? productData.clothId.Color : null,
        family: productData.fragranceId ? productData.fragranceId.family : null,
        description: productData.clothId ? productData.clothId.Description : productData.fragranceId.Description,
      };
      setCard(newCard);
    }
  }, [productData]);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    if (!userLoginCredential) {
      alert("Please Login First");
      navigate("/login");
    } else {
      if (selectedSize ) {
        console.log(quantity);
        console.log(productData.Price);
        console.log(selectedSize);

        const body = {
          productId: productData._id,
          quantity: quantity,
          size: selectedSize,
          price: productData.Price,
          color: selectedColor,
        };

        axios.post("http://localhost:8000/cart", body, {
          params: userLoginCredential,
        })
          .then((response) => {
            setUpdateCart(true);
            alert("Product added to cart successfully!");
          })
          .catch((err) => {
            if (err.response) {
              alert(err.response.data);
            } else {
              alert("Server Not Found");
            }
          });
      } else {
        alert("Please enter the details");
      }
    }
  };

  if (!card) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded">
      <button className="mb-4 text-blue-500" onClick={() => window.history.back()}>Back</button>
      <div className="flex">
        <div className="w-full flex flex-row">
          <img
            src={card.images}
            alt={card.cardName}
            className="w-2/6 h-100 object-cover"
          />
          <div className="px-6 w-5/6 py-4">
            <div className="font-bold text-2xl mb-2">{card.cardName} <span className="text-gray-600">({card.category})</span></div>
            <div className="flex items-center mb-4">
              <span className="text-green-500 font-bold">{card.cutPrice}</span>
              <span className="text-gray-600 text-sm line-through ml-2">{card.originalPrice}</span>
              <span className="bg-yellow-500 text-white text-xs font-bold py-1 px-2 rounded-full ml-auto">{card.discount}% OFF</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">{card.description}</p>
            </div>
            <div className="flex items-center mb-4">
              <span className="mr-2 font-bold">Size:</span>
              {card.sizes ? (card.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`mr-2 px-3 py-1 rounded-full border ${selectedSize === size ? 'border-blue-500 text-blue-500' : 'border-gray-400'}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))) : (<p>loding..</p>)}
            </div>
            <div className="flex items-center mb-4">
              {card.colors ? (
                <>
                  <span className="mr-2 font-bold">Color:</span>
                  {card.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`mr-2 w-8 h-8 rounded-full border ${selectedColor === color ? 'border-blue-500' : 'border-gray-400'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </>
              ) : (
                <>
                <span className="mr-4 font-bold">Family:</span>
                <div className="  bg-white rounded-lg shadow-md p-2 mt-2">
                  <div className="text-center">
                    <p className="text-gray-500">{card.family}</p>
                  </div>
                </div>
                </>
              )}
            </div>

            <div className="flex items-center mb-4">
              <span className="mr-2 font-bold">Quantity:</span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 py-1 px-2 border border-gray-400 rounded"
              />
            </div>
            <button onClick={handleAddToCart} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
