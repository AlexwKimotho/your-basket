import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  deleteSelectedItems,
  deleteUnselectedItems,
  deselectAllItems,
} from "../redux/amazonSlice";
import OrderSummaryCard from "../components/SummaryCard"
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";
import { aspira, ipay, mpesa } from "../assets";

const Cart = () => {
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
          <div className="w-full bg-white px-4 col-span-5 xl:col-span-4 rounded-lg">
            <div className="font-titleFont hidden xl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <h1 className="text-3xl font-semibold">Cart</h1>
              </div>
              <div className="flex items-center gap-4">
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
                        className="w-full h-24 object-contain"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2 xl:gap-1">
                      <h2 className="font-semibold text-md">{item.title}</h2>
                      <p className="xl:pr-10 text-sm">{item.description}</p>
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
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
                        >
                          +
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-24">
                      <p className="text-md xl:w-24 font-titleFont font-bold">
                        ksh {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <OrderSummaryCard
            totalAmt={totalAmt}
            ipay={ipay}
            aspira={aspira}
            mpesa={mpesa}
          />
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
          <div className="w-96 p-4 bg-white flex  flex-col items-center rounded-md shadow-lg">
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
  );
};

export default Cart;
