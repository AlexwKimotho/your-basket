import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteSelectedItems,
  resetCart,
} from "../../redux/amazonSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Mastercard } from "../../assets";
import { PayPal } from "../../assets";
import { visaLogo } from "../../assets";
import { mpesa } from "../../assets";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, setSidebar }) => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (itemId) => {
    const updatedSelectedItems = [...selectedItems];
    const itemIndex = updatedSelectedItems.indexOf(itemId);

    if (itemIndex === -1) {
      updatedSelectedItems.push(itemId);
    } else {
      updatedSelectedItems.splice(itemIndex, 1);
    }

    setSelectedItems(updatedSelectedItems);
    setSelectedItemsCount(updatedSelectedItems.length);
    setIsChecked(!isChecked);
  };

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

  const handleDeleteSelected = () => {
    dispatch(deleteSelectedItems(selectedItems));
    setSelectedItems([]);
    setSelectedItemsCount(0);
  };

  const handleDeleteOthers = () => {
    const itemsToDelete = products
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => item.id);

    const itemsToKeep = products.filter(
      (item) => !selectedItems.includes(item.id)
    );

    dispatch(deleteSelectedItems(itemsToDelete));
    setSelectedItems(itemsToKeep.map((item) => item.id));
    setSelectedItemsCount(itemsToKeep.length);
  };

  // Calculate Subtotal, Delivery Fees, and Total
  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFees = "Based on delivery option";
  const total = subtotal;

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
                      Cart
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDeleteSelected}
                        className={`border-2 inline-flex items-center ${
                          selectedItemsCount > 0
                            ? "bg-green-800 text-white w-28"
                            : "border-green-900"
                        } py-1 rounded-lg text-green-900 mt-2 text-sm hover:bg-green-800 hover:text-white active:bg-green-300 duration-300 relative transition-width flex-shrink-0`}
                      >
                        <div className="flex items-center px-1">
                          <DeleteIcon />
                          {selectedItemsCount > 0 && (
                            <span className="ml-1 text-xs text-white">Selected </span>
                          )}
                          ({selectedItemsCount})
                        </div>
                      </button>

                      {selectedItemsCount > 0 && (
                        <button
                          onClick={handleDeleteOthers}
                          className="border-2 border-green-800 text-green-800 w-28 py-1 rounded-lg  mt-2 text-sm hover:bg-red-800 hover:text-white active:bg-gray-300 duration-300"
                        >
                          <DeleteIcon /> All Others
                        </button>
                      )}
                      <button
                        onClick={() => dispatch(resetCart())}
                        className="border-2 inline-flex items-center  border-green-800 w-12 py-1 rounded-lg text-green-800 mt-2 mx-1 text-sm hover:bg-red-300 active:bg-red-300 duration-300"
                      >
                        <DeleteIcon/> All
                      </button>
                    </div>
                  </div>
                  <ul className="text-sm">
                    {products.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between px-6 py-2"
                      >
                        <div className="flex items-center gap-5">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                            className={`appearance-none checked:bg-green-800 checked:border-green-800 checked:text-white bg-gray-300 border-gray-300 px-2 py-1 rounded cursor-pointer`}
                          />

                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-13 w-10 object-cover mr-2"
                          />
                          <div>
                            <p className="font-lg">{item.title}</p>
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* End Cart Summary */}
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
                        className=" w-auto border-[1px] py-2 px-2 border-gray-500 rounded-md"
                      />
                    </div>
                    <div className="flex items-center">
                      <img
                        src={Mastercard}
                        alt="debit/credit"
                        className=" w-auto border-[1px] py-1 px-2 border-gray-500 rounded-md"
                      />
                    </div>

                    {/* Payment Method 2 */}
                    <div className="flex items-center">
                      <img
                        src={PayPal}
                        alt="PayPal"
                        className="w-auto border-[1px] py-1 px-4 border-gray-500 rounded-md"
                      />
                    </div>

                    {/* Payment Method 3 */}
                    <div className="flex justify-start items-center">
                      <img
                        src={mpesa}
                        alt="mobileMoney"
                        className=" w-auto border-[1px] px-2 border-gray-500 rounded-md "
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
                  <span>{`${deliveryFees}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>{`KSH ${total}`}</span>
                </div>
                <div className="flex justify-center">
                  <div className="mt-2 flex items-center justify-center">
                    <Link to="/checkout">
                      <button className="w-32 font-titleFont border-b-2 font-medium text-sm bg-yellow-400 py-2 rounded-md mt-3">
                        Checkout Now
                      </button>
                    </Link>
                    <span className="mx-4">or</span>
                    <button className="border-2 w-32 mt-3 py-1 border-green-800 hover:bg-green-800 hover:text-white text-sm rounded-lg  items-center">
                      Checkout Later
                    </button>
                  </div>
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
