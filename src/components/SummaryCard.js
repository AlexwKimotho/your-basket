import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mpesa, Mastercard, PayPal, visaLogo } from "../assets/index";
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
            <div className="grid grid-cols-1 gap-2 justify-end">
              {/* Payment Method 1 */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="debit/credit"
                  name="paymentMethod"
                  value="debit/credit"
                />
                <label htmlFor="ipay" className="ml-2">
                  <span className="mr-2">Debit/Credit card</span>
                </label>
                <img src={visaLogo} alt="debit/credit" className=" w-auto" />
                <div></div>
                <img src={Mastercard} alt="debit/credit" className=" w-auto" />

              </div>

              {/* Payment Method 2 */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="paypal"
                />
                <label htmlFor="paypal" className="ml-2">
                  <span className="mr-2">Paypal</span>
                </label>
                <img src={PayPal} alt="PayPal" className="w-auto" />
              </div>

              {/* Payment Method 3 */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="mobileMoney"
                  name="paymentMethod"
                  value="mobileMoney"
                />
                <label htmlFor="mobileMoney" className="ml-2">
                  <span className="mr-2">Mobile Money</span>
                </label>
                <img src={mpesa} alt="mobileMoney" className=" w-auto" />
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
