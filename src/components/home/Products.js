import React, { useRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import CartSidebar from "../sidebar/cartSidebar";
import { addToCart, decreaseQuantity } from "../../redux/amazonSlice";  // Assuming you have 'decreaseQuantity' action
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Box from "../../assets/box.png";

const Products = () => {
  const data = useLoaderData();
  const productsData = data.data;
  const dispatch = useDispatch();
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, sidebar]);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        quantity: (quantities[item.id] || 0) + 1,
      })
    );
    setQuantities({ ...quantities, [item.id]: (quantities[item.id] || 0) + 1 });
    openSidebar();

  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item.id));  // Assuming 'decreaseQuantity' takes the product ID as an argument
    setQuantities({ ...quantities, [item.id]: Math.max(0, (quantities[item.id] || 0) - 1) });
  };
  const openSidebar = () => {
    setSidebar(true);
  };
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-5 xl:grid-cols-5 gap-10 mt-32 xl:gap-5 px-4">
        {productsData.map((item) => (
          <div
            key={item.id}
            className="rounded-lg bg-white h-auto border-[1px] border-gray-200 py-6 z-30 hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative flex flex-col gap-4"
          >
            {/* ========== Product Image Start here ============== */}
            <div className="w-full  flex items-center justify-center relative group">
              <img
                src={Box}
                alt="box"
                className="box"
              />
              <span className="text-xs capitalize italic absolute top-1 right-6 text-gray-500">
                <OpenInFullIcon />
              </span>
            </div>
            {/* ========== Product Image End here ================ */}
            {/* ========== Product Info Start here =============== */}
            <div className="px-4 bg-white flex flex-col gap-1 z-10">
              <div className="flex items-center justify-between">
                <h2 className="font-titleFont tracking-wide text-sm font-semibold">
                Vitron 32 Inch Smart Android TV
                </h2>
              </div>
              <p className="text-gray-600 text-xs font-semibold">
                ksh {item.price}
              </p>
              {quantities[item.id] > 0 ? (
                <div className="flex items-center ml-14 mt-10">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="w-8 h-8 border border-black bg-black text-white hover:bg-white hover:text-black rounded-md mr-2"
                  >
                    -
                  </button>
                  <span className="text-black border-black">{quantities[item.id]}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-8 h-8 border border-black bg-black text-white hover:bg-white hover:text-black rounded-md ml-2"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-1.5 rounded-md mt-4 font-titleFont font-small text-base bg-black text-white"
                >
                  Add to Cart 
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* ======================= SideBar Start here =========================== */}
      <CartSidebar sidebar={sidebar} setSidebar={setSidebar} />
      {/* ======================= SideBar End here ============================= */}
    </div>
  );
};

export default Products;
