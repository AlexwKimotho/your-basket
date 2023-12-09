import React, { useRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import SideNavContent from "./SidebarSummary";
import { addToCart } from "../../redux/amazonSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";


const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.amazonReducer.userInfo);
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);

  return (
    <div>
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 xl:gap-4 px-4">
      {productsData.map((item) => (
        <div
          key={item.id}
          className="bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
        >
          <span className="text-xs capitalize italic absolute top-2 right-2 text-gray-500">
            {item.category}
          </span>
          {/* ========== Product Image Start here ============== */}
          <div className="w-full h-auto flex items-center justify-center relative group">
            <img
              className="w-52 h-64 object-contain"
              src={item.image}
              alt="ProductImg"
            />
            {/* ================== Product mini drop down Start here ============ */}
            <ul className="absolute w-full h-36 bg-gray-100 -bottom-[160px] group-hover:bottom-0 duration-700 flex flex-col justify-center items-end gap-2">
              <li className="productLi">
                Compare
                <span>
                  <ApiIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Cart
                <span>
                  <ShoppingCartIcon />
                </span>
              </li>
              <li className="productLi">
                View Details{" "}
                <span>
                  <ArrowCircleRightIcon />
                </span>
              </li>
              <li className="productLi">
                Add to Wish List{" "}
                <span>
                  <FavoriteIcon />
                </span>
              </li>
            </ul>
            {/* ================== Product mini drop down End here ============== */}
          </div>
          {/* ========== Product Image End here ================ */}
          {/* ========== Product Info Start here =============== */}
          <div className="px-4 bg-white flex flex-col gap-1 z-10">
            <div className="flex items-center justify-between">
              <h2 className="font-titleFont tracking-wide text-lg text-amazon_blue font-medium">
                {item.title.substring(0, 20)}
              </h2>
              <p className="text-sm text-gray-600 font-semibold">
                ksh {item.price}
              </p>
            </div>
            <div>
              <p className="text-sm">{item.description.substring(0, 100)}</p>
              <div className="text-yellow-500 flex">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    quantity: 1,
                  })
                );
                setSidebar(true);
              }}
              className="w-full py-1.5 rounded-md mt-4 font-titleFont font-small text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border border-yellow-500 hover:border-yellow-700 hover:from-yellow-300 to hover:to-yellow-400 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200"
            >
              Add to Cart |{" "}
              <span>
                <ShoppingCartIcon />
              </span>
            </button>
          </div>
        </div>
      ))}
     
    </div>
     {/* ======================= SideBar Start here =========================== */}
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[290px] md:w-[350px] h-full bg-white border border-black absolute top-0 right-0 z-50"
            >
              <div className="w-full bg-gray-400 text-black py-2 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userInfo.image}
                    alt="UserImg"
                  />
                ) : (
                  <AccountCircleIcon />
                )}
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  Hello, Sign In
                </h3>
              </div>
              {/* ============================ Content & Devices Start here ================ */}
              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Contact us"
              />
              {/* ============================ Content & Devices End here ================ */}
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
      {/* ======================= SideBar End here ============================= */}
    
    </div>
  );
};

export default Products;
