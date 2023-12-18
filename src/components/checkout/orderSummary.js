import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MiniCartItem = ({ item }) => (
  <div className="flex items-center justify-between mb-2">
    <img src={item.image} alt={item.title} className="w-8 h-12 object-cover" />
    <div className="flex-1 ml-2">
      <p className="text-xs font-semibold justify-start">{item.title}</p>
      <p className="text-sm mr-32">ksh {item.price.toFixed(2)}</p>
    </div>
    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
  </div>
);

const SummaryCard = () => {
  const products = useSelector((state) => state.amazonReducer.products);

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
    <div>
      <div className="bg-white h-auto w-96 flex items-center p-4 rounded-lg">
        <div className="text-center w-full">
          <p className="font-semibold text-mdpb-3">
            Order Summary
          </p>

          <div className="mt-4">
            <div className="max-h-32 overflow-y-auto">
              {products.map((item) => (
                <MiniCartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="flex justify-between text-sm items-center">
              <span className="font-medium">Subtotal :</span>
              <span>ksh {totalAmt}</span>
            </p>
         

            <p className="flex justify-between items-center text-sm pb-3">
              <span className="font-medium">Tax :</span>
              <span>ksh {"00"}</span>
            </p>

            <p className="flex justify-between items-center text-xs pb-3">
              <span>Your Basket Collection Point (Default Pickup Location)</span>
              <button className="border border-gray-600 w-9" > Edit</button>
            </p>

            <p className="flex justify-between items-center text-xs border-b-2 border-b-gray-350 pb-1">
              <span className="text-gray-400">Enter Coupon code</span>
              <button className="bg-green-800  text-white w-12 py-1" > Apply</button>
            </p>
            <br/>
            <p className="flex justify-between items-center border-b-2 text-sm border-b-gray-400 pb-3">
              <span className="font-semibold">Total :</span>
              <span className="font-semibold">ksh {totalAmt}</span>
            </p>
          </div>

          <div className="mt-4">
            <Link to="/checkout">
              <button className="w-60 font-titleFont border-b-2 font-medium text-sm bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="mt-2 text-center">
            <span>or</span>
          </div>
          <div className="relative inline-block mt-2">
            <button className="bg-yellow-400 py-2 px-4 text-sm rounded-lg inline-flex items-center">
              Checkout Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
