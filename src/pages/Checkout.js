import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteItem, resetCart, increaseQuantity, decreaseQuantity} from "../redux/amazonSlice";
import Header from "../components/header/Header";
import { motion } from "framer-motion";
import { emptyCart } from "../assets";
import { Link } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownClose, setDropdownClose] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("M-Pesa");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setDropdownClose(!isDropdownClose);
  };

  const handleInputChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "");
    setSelectedPaymentMethod(numericValue);
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

  // Calculate the height dynamically based on the number of items
  const cardHeight = products.length * 120; // Adjust the multiplier as needed

  return (
    <div>
    <Header/>
    <div className="w-full bg-gray-100 p-8 ">
      {products.length > 0 ? (
        <div className="container mx-auto h-auto grid grid-cols-9 gap-8">
          <div className="w-full bg-white px-4 col-span-5 xl:col-span-4">
            <div className="font-titleFont hidden xl:flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
              <h1 className="text-3xl font-semibold">CHeckout summa Cart</h1>
              <h3 className="text-xl font-medium">Subtotal</h3>
            </div>
            <div>
              {products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-b-gray-300 p-4 md:p-0 md:py-4 flex items-center gap-6"
                >
                  <div className="w-full flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-2/5 xl:w-1/5">
                      <img
                        className="w-full h-44 object-contain"
                        src={item.image}
                        alt="productImg"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2 xl:gap-1">
                      <h2 className="font-semibold text-lg">{item.title}</h2>
                      <p className="text-base">
                        Price: <span>ksh {item.price}</span>
                      </p>
                      <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-24 py-1 text-center drop-shadow-lg rounded-md">
                        <p
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-gray-400 font-semibold duration-300"
                        >
                          -
                        </p>
                        <p className="font-titleFont text-base text-amazon_blue">
                          {item.quantity}
                        </p>
                        <p
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-gray-400 font-semibold duration-300"
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
    </div>

  );
};

export default Cart;
