// Sidebar.js
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../../redux/amazonSlice";
import SummaryCard from "../SummaryCard";

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

  return (
    <>
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={sidebarRef}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[290px] md:w-[350px] h-full bg-white border border-black absolute top-0 right-0 z-50 overflow-y-auto"
            >
              {/* Cart Summary */}
              <div className="py-3 border-b-[1px] border-b-gray-300">
                <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
                  Cart Summary
                </h3>
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
                          className="h-8 w-8 object-cover mr-2"
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-24 py-1 text-center drop-shadow-lg rounded-md">
                            <p
                              onClick={() => {
                                dispatch(decreaseQuantity(item.id));
                              }}
                              className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
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
                              className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
                            >
                              +
                            </p>
                          </div>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">{`$${
                        item.price * item.quantity
                      }`}</span>
                    </li>
                  ))}
                </ul>
                <SummaryCard />
              </div>
              {/* End Cart Summary */}

              <span
                onClick={() => setSidebar(false)}
                className="cursor-pointer absolute top-0 left-[300px] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 hover:bg-red-500 hover:text-white duration-300"
              >
                <CloseIcon />
              </span>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
