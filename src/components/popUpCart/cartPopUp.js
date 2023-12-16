import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  deleteSelectedItems,
  deleteUnselectedItems,
  deselectAllItems,
} from "../../redux/amazonSlice";
import { emptyCart } from "../../assets/index";
import { aspira, ipay, mpesa } from "../../assets/index";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SummaryCard from "./summaryCard";

const CartPopup = ({ isOpen, onClose }) => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
    dispatch(deleteSelectedItems(selectedItems));
    setSelectedItems([]);
  };

  const handleDeleteUnselected = () => {
    const unselectedItems = products
      .filter((item) => !selectedItems.includes(item.id))
      .map((item) => item.id);
    dispatch(deleteUnselectedItems(unselectedItems));
  };

  const handleDeselectAll = () => {
    dispatch(deselectAllItems());
    setSelectedItems([]);
    setSelectAll(false);
  };

  const [totalAmt, setTotalAmt] = useState("");
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed w-[1150px] h-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-8 rounded-md z-50 overflow-y-auto">
        {products.length > 0 ? (
          <div className="container grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
            <div className="bg-white p-4 rounded-lg w-[650px] overflow-y-auto">
              <div className="font-titleFont flex items-center justify-between border-b-[1px] border-b-gray-400 py-3 overflow-y-auto">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                  <h1 className="text-lg font-semibold">Cart</h1>
                </div>
                <div className="flex  gap-2">
                  <button
                    onClick={handleDeleteSelected}
                    className="border border-green-900 w-32 py-1 rounded-lg text-green-900 mt-2 text-sm hover:bg-red-300 active:bg-red-300 duration-300"
                  >
                    Delete Selected
                  </button>
                  <button
                    onClick={handleDeleteUnselected}
                    className="border border-green-900 w-32 py-1 rounded-lg text-green-900 mt-2 text-sm hover:bg-red-300 active:bg-red-300 duration-300"
                  >
                    Delete Unselected
                  </button>
                  <button
                    onClick={() => dispatch(resetCart())}
                    className="border border-green-900 w-24 py-1 rounded-lg text-green-900 mt-2 text-sm hover:bg-red-300 active:bg-red-300 duration-300"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleDeselectAll}
                    className="border border-green-900 w-24 py-1 rounded-lg text-green-900 mt-2 text-sm hover:bg-gray-300 active:bg-gray-300 duration-300"
                  >
                    Deselect All
                  </button>
                </div>
              </div>
              <div>
                {products.map((item) => (
                  <div
                    key={item.id}
                    className={`w-full border-b-[1px] border-b-gray-300 p-4 flex items-center ${
                      selectedItems.includes(item.id) ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className="w-2/5 md:w-2/5">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <img
                        className="w-20 h-20 mx-6 object-contain"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-3/5 md:w-2/5 ">
                      <h2 className="font-semibold text-md">{item.title}</h2>
                      {/* <p className="text-sm">{item.description}</p> */}
                      <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p
                          onClick={() => {
                            dispatch(decreaseQuantity(item.id));
                          }}
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
                        >
                          -
                        </p>
                        <p className="font-titleFont text-sm text-amazon_blue">
                          {item.quantity}
                        </p>
                        <p
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="cursor-pointer bg-green-800 text-white px-2 rounded-sm hover:bg-gray-400 hover:text-black font-semibold duration-300"
                        >
                          +
                        </p>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
            <div className=" mx-40">
            <SummaryCard
            totalAmt={totalAmt}
            ipay={ipay}
            aspira={aspira}
            mpesa={mpesa}
          />
          </div>
            {/* End of Order Summary card */}
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
            <div className="w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold">
                Nothing to see here{" "}
              </h1>

              <Link to="/">
                <button className="mt-6 bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold text-lg">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
