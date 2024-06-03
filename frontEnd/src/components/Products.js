import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaSave, FaArrowLeft } from 'react-icons/fa';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { UserLoginContext } from "../context/userLoginContext";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userLoginCredential } = useContext(UserLoginContext);
  const [newProduct, setNewProduct] = useState({
    ProductName: '',
    CategoryName: '',
    Color: '',
    Size: [],
    StichType: '',
    SubCategory: '',
    imgUrl: '',
    Stock: 0,
    Price: 0,
    family: '',
    Material: '',
    Description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/admin/products', {params:userLoginCredential,
      });
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8000/admin/products/${id}`, {params:userLoginCredential,
      });
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(products.map(product =>
      product._id === id ? { ...product, Stock: newQuantity } : product
    ));
  };

  const handleSaveChanges = async (id) => {
    console.log(id);
    console.log(userLoginCredential);
    if (window.confirm('Do you want to save changes to this product?')) {
      const product = products.find(product => product._id === id);
      try {
        await axios.put(`http://localhost:8000/admin/products/${id}`,product,{params:userLoginCredential,
      });
        console.log('Changes saved for:', product);
      } catch (error) {
        console.error('Error saving changes:', error.message);
      }
    }
  };

  const filteredProducts = products ? products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : null;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Size') {
      setNewProduct({ ...newProduct, [name]: value.split(',').map(size => size.trim()) });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct({ ...newProduct, CategoryName: value });
  };

  const handleSaveNewProduct = async () => {
    console.log(newProduct);
    try {
      const response = await axios.post('http://localhost:8000/admin/products',  newProduct,{params:userLoginCredential,
    });
      const savedProduct = response.data;
      setProducts([...products, savedProduct]);
      closeModal();
    } catch (error) {
      console.error('Error saving new product:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="mb-4 flex justify-between items-center">
        <Link to="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <FaArrowLeft className="mr-2" /> Back
        </Link>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-2/3"
        />
        <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredProducts ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.productData.imgUrl} alt={product.ProductName} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="mt-2">
                <h3 className="text-xl font-bold">{product.ProductName}</h3>
                <p className="text-lg">Price: {product.Price}</p>
                <p>Stock: <input type="number" value={product.Stock} onChange={(e) => handleQuantityChange(product._id, e.target.value)} className="w-20 p-1 border border-gray-300 rounded" /></p>
                <p>Category: {product.CategoryName}</p>
                {product.CategoryName === 'Clothe' && (
                  <>
                    <p>SubCategory: {product.productData.SubCategory}</p>
                    <p>StitchType: {product.productData.StitchType}</p>
                    <p>Sizes: {product.productData.Size.join(', ')}</p>
                    <p>Colors: {product.productData.Color}</p>
                    <p>Material: {product.productData.Material}</p>
                    <p>Description: {product.productData.Description}</p>
                  </>
                )}
                {product.CategoryName === 'Fragrance' && (
                  <>
                    <p>SubCategory: {product.productData.SubCategory}</p>
                    <p>Type: {product.productData.type}</p>
                    <p>Family: {product.productData.family}</p>
                    <p>Size: {product.productData.Size.join(', ')}</p>
                    <p>Material: {product.productData.Material}</p>
                    <p>Description: {product.productData.Description}</p>
                  </>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center text-red-500"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                  <button
                    onClick={() => handleSaveChanges(product._id)}
                    className="flex items-center text-blue-500"
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <input
            type="text"
            name="ProductName"
            placeholder="Product Name"
            value={newProduct.ProductName}
            onChange={handleInputChange}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <select
            name="CategoryName"
            value={newProduct.CategoryName}
            onChange={handleCategoryChange}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="Clothe">Clothe</option>
            <option value="Fragrance">Fragrance</option>
          </select>
          {newProduct.CategoryName === 'Clothe' && (
            <>
              <select
                name="SubCategory"
                value={newProduct.SubCategory}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select SubCategory</option>
                <option value="ForMen">For Men</option>
                <option value="ForWomen">For Women</option>
                <option value="Kids">Kids</option>
              </select>
              <select
                name="StichType"
                value={newProduct.StichType}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Stich Type</option>
                <option value="Stich">Stich</option>
                <option value="Unstich">Unstich</option>
                <option value="WAISTCOAT">WAISTCOAT</option>
              </select>
              <input
                type="text"
                name="Size"
                placeholder="Sizes (comma separated)"
                value={newProduct.Size.join(', ')}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="Color"
                placeholder="Colors (comma separated)"
                value={newProduct.Color}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                value={newProduct.imgUrl}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="Material"
                placeholder="Material"
                value={newProduct.Material}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <textarea
                name="Description"
                placeholder="Description"
                value={newProduct.Description}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
            </>
          )}
          {newProduct.CategoryName === 'Fragrance' && (
            <>
              <select
                name="SubCategory"
                value={newProduct.SubCategory}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select SubCategory</option>
                <option value="ForMen">For Men</option>
                <option value="ForWomen">For Women</option>
                <option value="Kids">Kids</option>
              </select>
              <select
                name="type"
                value={newProduct.type}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Type</option>
                <option value="atar">Atar</option>
                <option value="perfume">Perfume</option>
              </select>
              <input
                type="text"
                name="family"
                placeholder="Family"
                value={newProduct.family}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="Size"
                placeholder="Sizes (comma separated)"
                value={newProduct.Size.join(', ')}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
              <input
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                value={newProduct.imgUrl}
                onChange={handleInputChange}
                className="mb-2 p-2 border border-gray-300 rounded w-full"
              />
            </>
          )}
          <input
            type="number"
            name="Stock"
            placeholder="Stock"
            value={newProduct.Stock}
            onChange={handleInputChange}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="number"
            name="Price"
            placeholder="Price"
            value={newProduct.Price}
            onChange={handleInputChange}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <button onClick={handleSaveNewProduct} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Save Product
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Products;
