import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { aspira, ipay, mpesa } from "../assets/index";
import { Link } from "react-router-dom";

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
      {/* Order Summary card */}
      <div className="bg-white h-120 w-96 flex items-center p-4">
        <div className="text-center w-full">
          <p className="font-semibold text-2xl border-b-2 border-b-gray-400 pb-3">
            Order Summary
          </p>

          <div className="mt-4">
            <p className="flex justify-between items-center">
              <span>Sub Total :</span>
              <span>ksh {totalAmt}</span>
            </p>
            <p className="flex justify-between items-center">
              <span>Delivery Fees :</span>
              <span>ksh {totalAmt}</span>
            </p>
            <p className="flex justify-between items-center border-b-2 border-b-gray-400 pb-3">
              <span>Total :</span>
              <span>ksh {totalAmt}</span>
            </p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-lg mb-2">
              Accepted Payment Methods
            </p>
          <div className="grid grid-cols-3 gap-2">
  {/* Payment Method 1 */}
  <div className="flex items-center flex-col">
    <input type="radio" id="ipay" name="paymentMethod" value="ipay" />
    <label htmlFor="ipay" className="ml-2">
      <img src={ipay} alt="iPay Logo" className="h-6 w-auto" />
      <span className="ml-2">iPay</span>
    </label>
  </div>

  {/* Payment Method 2 */}
  <div className="flex items-center flex-col">
    <input type="radio" id="aspira" name="paymentMethod" value="aspira" />
    <label htmlFor="aspira" className="ml-2">
      <img src={aspira} alt="Aspira Logo" className="h-6 w-auto" />
      <span className="ml-2">Aspira</span>
    </label>
  </div>

  {/* Payment Method 3 */}
  <div className="flex items-center flex-col">
    <input type="radio" id="mpesa" name="paymentMethod" value="mpesa" />
    <label htmlFor="mpesa" className="ml-2">
      <img src={mpesa} alt="M-Pesa Logo" className="h-6 w-auto" />
      <span className="ml-2">M-Pesa</span>
    </label>
  </div>
</div>

          </div>

          <div className="mt-4">
            <Link to="/checkout">
              <button className="w-full font-titleFont border-b-2 font-medium text-base bg-gradient-to-tr from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          <div className="mt-2 text-center">
            <span>or quickly checkout with </span>
          </div>
          <div className="relative inline-block mt-2">
            <button className="bg-yellow-400 py-2 px-4 inline-flex items-center">
              Checkout Later
            </button>
          </div>
        </div>
      </div>
      {/* End of Order Summary card */}
    </div>
  );
};

export default SummaryCard;