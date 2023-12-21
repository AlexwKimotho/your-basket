import React, { useState, useEffect, useRef } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartPopup from "../popUpCart/cartPopUp";
import "../../styles/styles.css";
import { useSelector } from "react-redux";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const ref = useRef();
  const [isCartOpen, setCartOpen] = useState(false);
  const products = useSelector((state) => state.amazonReducer.products);



  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);

  const handleCartToggle = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-item" />
        <div className="div" />
        <div className="header-item-2" />
        <div className="header-item-3" />
        <div className="cart">
          {/* Use Link to navigate to the /cart route */}
          <button
          className="flex items-start justify-center headerHover relative"
          onClick={handleCartToggle}
        >
          <ShoppingCartIcon />
          <p className="hidden mdl:inline-flex text-xs font-semibold mt-3 text-black">Cart</p>
          <span className="absolute text-xs top-0 left-6 w-4 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center">
            {products.length > 0 ? products.length : 0}
          </span>
        </button>
        </div>
      </div>
      {isCartOpen && <CartPopup isOpen={isCartOpen} onClose={handleCartToggle} />}
    </div>
  );
};

export default Header;
