import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // replace '#root' with the id of your app's root element

const Home = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalIsOpen(false);
  };
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const addToCart = async (product, quantity) => {
    try {
      const response = await axios.post(`http://localhost:8082/cart/1/product/${product.id}?quantity=${encodeURIComponent(quantity)}`);
      if (response.status === 200) {
        setCart([...cart, { ...product, quantity }]);
        setQuantity(1); // reset quantity after adding to cart
      } else {
        console.error('Failed to add product to cart', response);
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: "2rem",
    },
  };
  return (
    <div className="my-5">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in"
              onClick={() => openModal(product)}
            >
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product.imageUrl}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="mt-2 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        style={customStyles}
      >
        {selectedProduct && (
  <div className="p-4 bg-white rounded shadow-xl">
    <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
    <img
      className="max-w-96 h-auto mb-4 rounded shadow-md"
      src={selectedProduct.imageUrl}
      alt={selectedProduct.imageAlt}
    />
    <p className="text-xl mb-2 font-bold">Description:</p>
    <p className="text-xl mb-4">{selectedProduct.description}</p>
    <p className="text-xl mb-2 font-bold">Price:</p>
    <p className="text-xl mb-4">{selectedProduct.price}</p>
    <div className="flex justify-between">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={closeModal}
      >
        Close
      </button>
      <div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2 font-bold">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded w-20 text-center"
        />
      </div>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        onClick={() => {addToCart(selectedProduct, quantity); closeModal()}}
      >
        Add to Cart
      </button>
    </div>
  </div>
)}
      </Modal>
    </div>
  );
};

export default Home;
