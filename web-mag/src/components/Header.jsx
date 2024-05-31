import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';

const navigation = [{ name: "Main Page", href: "/", current: false }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    getCart(1); // replace 1 with the actual cart ID
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
  const [cart, setCart] = useState([]);
  const getCart = async (cartId) => {
    try {
      const response = await axios.get(`http://localhost:8082/cart/${cartId}`);
      if (response.status === 200) {
        setCart(response.data);

      } else {
        console.error("Failed to retrieve cart");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCart(1); // replace 1 with the actual cart ID
  }, []);


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


  const deleteItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8082/cart/1/product/${productId}`);
      if (response.status === 200) {
        // Update the cart state after successful deletion
        setCart(prevCart => ({
          ...prevCart,
          cartItems: prevCart.cartItems.filter(item => item.productId !== productId)
        }));
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };


  const navigate = useNavigate();

  const postOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/orders/1`, cart);
      if (response.status === 200) {
        // Handle successful order
        console.log('Order placed successfully');
        // Clear the cart after successful order
        setCart({ cartItems: [] });
        closeModal();
        // Redirect to the user data form page
        navigate('/user-data-form');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      if (error.response.status === 400) {
        setBlacklistError(true);
      }
    }
  };

  const [blacklistError, setBlacklistError] = useState(false);
  


  return (
    <Disclosure as="nav" className="header-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 flex">
                  <div>
                    <button
                      id="cartButton"
                      className="px-4 text-white"
                      onClick={openModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      contentLabel="Cart"
                      className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 bg-opacity-50"
                    >
                      <div className="bg-white rounded-lg w-1/2">
                        <div className="flex flex-col items-start p-4">
                          <div className="flex items-center w-full">
                            <div className="text-gray-900 font-medium text-lg">
                              Cart
                            </div>
                            
                            <svg
                              onClick={closeModal}
                              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                            >
                              <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z" />
                            </svg>
                          </div>
                          {
                              blacklistError ? (
                              <div className="w-full flex justify-center text-white bg-red-500">
                                <p>USER IS IN BLACKLIST</p>
                              </div>
                            ) : null
                            }
                          {Array.isArray(cart.cartItems) &&
                            cart.cartItems.map((item) => {
                              const product = products.find(
                                (product) => product.id === item.productId
                              );
                              return (
                                <div
                                  key={item.productId}
                                  className="w-full py-4 border-b flex justify-between items-center"
                                >
                                  <div>
                                  <div className="text-gray-900 font-medium">
                                    name: {product?.name}
                                  </div>
                                  <div className="text-gray-600 text-sm">
                                    Quantity: {item.quantity}
                                  </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      deleteItemFromCart(item.productId)
                                    }
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                  >
                                    Delete
                                  </button>
                                </div>
                              );
                            })}
                          <div className="w-full py-4">
                            <p className="text-gray-900 font-medium">
                              Total price: {cart.totalPrice} $
                            </p>
                          </div>
                          <div className="flex justify-between w-full">
                            <button
                              onClick={closeModal}
                              className="mt-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Close
                            </button>
                            <button
                              onClick={postOrder}
                              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Place Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to="/register"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Confirm account
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to="/admin"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Add or edit products
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to="/blacklist"
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Blacklist
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            onClick={() => console.log("sign out")}
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
