import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { mpesa, Mastercard, vooma, visaLogo, american_express, Amex, unionPay, pesalink, airtel } from "../../assets/index";
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
      <div className="bg-white h-120 w-96 flex items-center p-4  rounded-lg">
        <div className="text-center w-full">
          <p className="font-semibold text-md border-b-2 border-b-gray-400 pb-3">
            Order Summary
          </p>

          <div className="mt-4">
            <p className="flex justify-between text-sm items-center">
              <span className="font-semibold">Subtotal :</span>
              <span>ksh {totalAmt}</span>
            </p>
            <p className="flex justify-between text-sm items-center">
              <span className="font-semibold">Delivery Fees :</span>
              <span>based on delivery option</span>
            </p>
            <p className="flex justify-between items-center border-b-2 text-sm border-b-gray-400 pb-3">
              <span className="font-semibold">Total :</span>
              <span>ksh {totalAmt}</span>
            </p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-md mb-2">
              Accepted Payment Methods
            </p>

            <div className="grid grid-cols-1 gap-2 justify-end">
              {/* Payment Method 1 */}
              <div className="flex items-center">
                <label htmlFor="ipay" className="ml-2">
                  <span className="mr-2 text-sm">Debit/Credit card</span>
                </label>
                <div className="flex w-11 h-8 gap-1">
                <img src={visaLogo} alt="debit/credit" className=" w-auto border-[1px] border-gray-300 rounded-md px-2 py-1" />
                
                <img src={Mastercard} alt="debit/credit" className=" w-auto border-[1px] border-gray-300 rounded-md px-2 py-1" />
                
                <img src={american_express} alt="debit/credit" className=" w-auto border-[1px] border-gray-300 rounded-md px-2 py-1" />
                
                <img src={Amex} alt="debit/credit" className=" w-auto " />
                </div>
              </div>

              {/* Payment Method 2 */}
              <div className="flex items-center">
                <label htmlFor="bankTransfer" className="ml-2">
                  <span className="mr-2 text-sm">Bank transfer</span>
                </label>
                <div className="flex gap-1">
                <img src={vooma} alt="bankTransfer" className="w-auto" />
               
                <img src={pesalink} alt="bankTransfer" className=" w-auto" />
                </div>
              </div>

              {/* Payment Method 3 */}
              <div className="flex justify-start items-center">

                <label htmlFor="mobileMoney" className="ml-2">
                  <span className="mr-2 text-sm">Mobile Money</span>
                </label>
                <div className="flex gap-1">
                <img src={mpesa} alt="mpesa" className=" w-auto border-[1px] border-gray-300 rounded-md px-2 py-1" />
                <div></div>
                <img src={airtel} alt="airtel" className=" w-auto " />
                </div>
              </div>

              {/* Payment Method 4 */}
              <div className="flex justify-start items-center">

                <label htmlFor="other" className="ml-2">
                  <span className="mr-2 text-sm">Other</span>
                </label>
                <img src={unionPay} alt="other" className=" w-auto border-[1px] border-gray-300 rounded-md px-2 py-1" />
              </div>
              
            </div>
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
      {/* End of Order Summary card */}
    </div>
  );
};

export default SummaryCard;
