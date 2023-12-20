import React, { useEffect, useRef, useState } from "react";
import { logo } from "../../assets/index";
import { Link } from "react-router-dom";

const Header = () => {
 
  const ref = useRef();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showAll && setShowAll(false);
      }
    });
  }, [ref, showAll]);

  return (
    <div className="sticky top-0 z-50">
      <div className="w-full bg-white text-black px-4 py-3 flex md:justify-between items-center gap-2 md:gap-4 lgl:gap-2 xl:gap-4" style={{ backgroundColor: 'white', color: 'black' }}>
        <Link to="/">
          <div className="headerHover">
            <img className="w-52 mt-2" src={logo} alt="logoImage" />
          </div>
        </Link>
        <div className="flex items-center justify-center flex-grow font-semibold text-xl mr-60">
          <h1>Cart</h1>
        </div>
        <div className="ml-auto">
          <button className="text-black border bg-yellow-400 hover:bg-green-800 hover:text-white px-4 py-1 rounded-md">
            Close
          </button>
        </div>
      </div>
    
    </div>
  );
};

export default Header;
