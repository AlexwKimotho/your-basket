import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/amazonSlice";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
import { aspira, ipay, mpesa } from "../assets";

const Cart = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownClose, setDropdownClose] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setDropdownClose(!isDropdownClose);
  };

  const handleCheckboxChange = (itemId) => {
    const updatedSelectedItems = [...selectedItems];
    const itemIndex = updatedSelectedItems.indexOf(itemId);

    if (itemIndex === -1) {
      updatedSelectedItems.push(itemId);
    } else {
      updatedSelectedItems.splice(itemIndex, 1);
    }

    setSelectedItems(updatedSelectedItems);
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : products.map((item) => item.id));
  };

  const handleDeleteSelected = () => {
    dispatch(deleteItem(selectedItems));
  };

  const handleDeleteUnselected = () => {
    const unselectedItems = products
      .filter((item) => !selectedItems.includes(item.id))
      .map((item) => item.id);
    dispatch(deleteItem(unselectedItems));
  };

  const handleDeselectAll = () => {
    dispatch(resetCart());
  };

  const [totalAmt, setTotalAmt] = useState("");
  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  return (
    <div className="w-full bg-gray-100 p-8 ">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-6 gap-8">
          <div className="w-full bg-white px-4 col-span-5 xl:col-span-4">
            <div className="font-titleFont hidden xl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <h1 className="text-3xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDeleteSelected}
                  className="bg-red-500 w-24 py-1 rounded-lg text-white mt-2 text-sm hover:bg-red-700 active:bg-red-900 duration-300"
                >
                  Delete Selected
                </button>
                <button
                  onClick={handleDeleteUnselected}
                  className="bg-red-500 w-32 py-1 rounded-lg text-white mt-2 text-sm hover:bg-red-700 active:bg-red-900 duration-300"
                >
                  Delete Unselected
                </button>
                <button
                  onClick={() => dispatch(resetCart())}
                  className="bg-red-500 w-24 py-1 rounded-lg text-white mt-2 text-sm hover:bg-red-700 active:bg-red-900 duration-300"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleDeselectAll}
                  className="bg-red-500 w-24 py-1 rounded-lg text-white mt-2 text-sm hover:bg-red-700 active:bg-red-900 duration-300"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className={`w-full border-b-[1px] border-b-gray-300 p-4 md:p-0 md:py-4 flex items-center gap-6 ${
                    selectedItems.includes(item.id) ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="w-full flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-2/5 xl:w-1/5">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <img
                        className="w-full h-44 object-contain"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2 xl:gap-1">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="xl:pr-10 text-sm">{item.description}</p>
                      <p className="text-base">
                        Price: <span>ksh {item.price}</span>
                      </p>
                      <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p
                          onClick={() => {
                            dispatch(decreaseQuantity(item.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-400 font-semibold duration-300"
                        >
                          -
                        </p>
                        <p className="font-titleFont text-base text-amazon_blue">
                          {item.quantity}
                        </p>
                        <p
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-400 font-semibold duration-300"
                        >
                          +
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(deleteItem(item.id))}
                        className="bg-red-500 w-24 py-1 rounded-lg text-white mt-2 text-sm hover:bg-red-700 active:bg-red-900 duration-300"
                      >
                        Delete Item
                      </button>
                    </div>
                    <div className="w-full md:w-24">
                      <p className="text-lg xl:w-24 font-titleFont ">
                        ksh{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div onClick={() => dispatch(resetCart())} className="w-full py-3">
              <button className="px-5 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide">
                Clear Cart
              </button>
            </div>
          </div>
          <div className=" bg-blue-100 h-96 w-96 flexitems-center p-4  ">
            <div className="text-center">
              <div className="text-center">
                <p className="flex gap-2  text-2xl ont-semibold border-b-[2px] border-b-gray-400 py-3">
                  Order Summary
                </p>
              </div>
              <div>
                <p className="font-semibold px-6 py-1 flex items-center justify-between">
                  Sub Total : ksh {totalAmt}
                </p>
              </div>
              <div>
                <p className="font-semibold px-6 py-1 flex items-center justify-between">
                  Delivery Fees : ksh {totalAmt}
                </p>
              </div>
              <div>
                <p className="font-semibold px-6 py-1 flex items-center justify-between border-b-[2px] border-b-gray-400">
                  Total : ksh {totalAmt}
                </p>
              </div>
              <div className="text-center">
                <span>Accepted Payment methods</span>
                <br />
                <div className="grid ">
                  <div className="flex justify-between mx-auto items-center gap-2">
                    <img
                      src={ipay}
                      alt="iPay Logo"
                      className="max-w-full h-auto"
                    />
                    <br />
                    <img
                      src={aspira}
                      alt="Aspira Logo"
                      className="max-w-full h-auto"
                    />
                    <br />
                    <img
                      src={mpesa}
                      alt="M-Pesa Logo"
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <Link to="/checkout">
                <button className="w-full font-titleFont border-b-[2px] font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                  Proceed to Checkout
                </button>
              </Link>
              <br />
              <div className="text-center">
                <span>or quickly checkout with </span>
              </div>
              <div className="relative inline-block">
                <button
                  onClick={toggleDropdown}
                  className="bg-yellow-400 py-2 px-4  inline-flex items-center"
                >
                  Checkout Later
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-4 py-10"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="w-96 p-4 bg-white flex  flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
