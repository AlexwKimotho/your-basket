// Sidebar.js
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
} from "../../redux/amazonSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Mastercard } from "../../assets";
import { PayPal } from "../../assets";
import { visaLogo } from "../../assets";
import { mpesa } from "../../assets";

const Sidebar = ({ sidebar, setSidebar }) => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSidebar]);

  // Calculate Subtotal, Delivery Fees, and Total
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFees = 0;
  const total = subtotal + deliveryFees;

  return (
    <>
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={sidebarRef}
              initial={{ x: 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[350px] md:w-[480px] h-full bg-white border border-black absolute top-0 right-0 z-50 overflow-y-auto flex flex-col rounded-lg"
            >
              {/* Cart Summary */}
              <div className="flex-grow overflow-y-auto">
                <div className="py-3 border-b-[1px] border-b-gray-300">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                      Cart Summary
                    </h3>
                    <button
                      onClick={() => dispatch(resetCart())}
                      className="border border-green-800 w-20 py-1 rounded-lg text-green-800 mt-1 text-sm hover:bg-red-300 active:bg-red-300 duration-300"
                    >
                      Clear Cart
                    </button>
                  </div>
                  <ul className="text-sm">
                    {products.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between px-6 py-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-13 w-10 object-cover mr-2"
                          />

                          <div>
                            <p className="font-medium">{item.title}</p>
                            {/* <p className="font-medium">{item.description}</p> */}
                            <p className="text-gray-500">
                              Quantity: {item.quantity}
                            </p>

                            <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-16 py-1 text-center drop-shadow-lg rounded-md">
                              <p
                                onClick={() => {
                                  dispatch(decreaseQuantity(item.id));
                                }}
                                className="cursor-pointer bg-gray-200 px-1 rounded-sm hover:bg-green-800 font-semibold duration-300"
                              >
                                -
                              </p>
                              <p className="font-titleFont text-base text-amazon_blue">
                                {item.quantity}
                              </p>
                              <p
                                onClick={() =>
                                  dispatch(increaseQuantity(item.id))
                                }
                                className="cursor-pointer bg-gray-200 px-1 rounded-sm hover:bg-green-800 font-semibold duration-300"
                              >
                                +
                              </p>
                            </div>
                          </div>
                        </div>
                        <span className="font-medium py-[32px]">{`Ksh ${
                          item.price * item.quantity
                        } `}</span>
                        <DeleteIcon
                          onClick={() => dispatch(deleteItem(item.id))}
                          className="ml-2 text-green-800 hover:text-red-800 cursor-pointer"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                {/* End Cart Summary */}
              </div>

              {/* Subtotal, Delivery Fees, and Total */}
              <div className="px-4 py-4 border-t-[1px] border-t-gray-400 ">
                <div className="mt-4">
                  <p className="font-semibold text-md text-center">
                    Accepted Payment Methods
                  </p>
                  <div className="flex gap-4 justify-center py-2 px-2">
                    {/* Payment Method 1 */}
                    <div className="flex items-center">
                      <img
                        src={visaLogo}
                        alt="debit/credit"
                        className=" w-auto border-[1px] py-2 px-2 border-gray-900 rounded-md"
                      />
                    </div>
                    <div className="flex items-center">
                      <img
                        src={Mastercard}
                        alt="debit/credit"
                        className=" w-auto border-[1px] py-1 px-2 border-gray-900 rounded-md"
                      />
                    </div>

                    {/* Payment Method 2 */}
                    <div className="flex items-center">
                      <img
                        src={PayPal}
                        alt="PayPal"
                        className="w-auto border-[1px] py-1 px-4 border-gray-900 rounded-md"
                      />
                    </div>

                    {/* Payment Method 3 */}
                    <div className="flex justify-start items-center">
                      <img
                        src={mpesa}
                        alt="mobileMoney"
                        className=" w-auto border-[1px] px-2 border-gray-900 rounded-md "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex text-sm justify-between">
                  <span>Subtotal:</span>
                  <span>{`KSH ${subtotal}`}</span>
                </div>
                <div className="flex text-sm justify-between">
                  <span>Delivery Fees:</span>
                  <span>{`KSH ${deliveryFees}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Total:</span>
                  <span>{`KSH ${total}`}</span>
                </div>
              </div>
              {/* End Subtotal, Delivery Fees, and Total */}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;