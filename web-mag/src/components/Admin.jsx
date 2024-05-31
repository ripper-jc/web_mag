import { Link } from "react-router-dom";
import { Tab } from "@headlessui/react";
import EditModal from "./EditModal";

import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

const Admin = () => {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    imageUrl: "",
  });

  const [editProduct, setEditProduct] = useState(null);
  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleSave = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:8082/product/${updatedProduct.id}`,
        updatedProduct
      );
      // Update the product in the products array
      setProducts(
        products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      // Close the edit form or modal
      setEditProduct(null);
    } catch (error) {
      // Handle error or show an error message
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/product", product);
      // Handle success or show a success message
    } catch (error) {
      // Handle error or show an error message
    }
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/product/${id}`);
      // Remove the product from the products array
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      // Handle error or show an error message
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900 rounded-xl">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
                    ${selected ? "bg-white shadow" : "text-blue-100"}`
            }
          >
            Add New
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg
                    ${selected ? "bg-white shadow" : "text-blue-100"}`
            }
          >
            Edit or Delete
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                autoComplete="off"
                onChange={handleChange}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                autoComplete="off"
                onChange={handleChange}
              ></textarea>

              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                autoComplete="off"
                onChange={handleChange}
              />

              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                autoComplete="off"
                onChange={handleChange}
              />

              <label htmlFor="imageUrl">Image URL:</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={product.imageUrl}
                autoComplete="off"
                onChange={handleChange}
              />

              <button
                type="submit"
                className="my-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-600"
              >
                Create Product
              </button>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in"
                >
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="mt-2 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {product.price}
                    </p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
          {editProduct && (
            <EditModal
              product={editProduct}
              onSave={handleSave}
              onCancel={() => setEditProduct(null)}
            />
          )}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
};

export default Admin;
