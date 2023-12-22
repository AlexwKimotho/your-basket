import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Accordion, AccordionTab } from "primereact/accordion";
import { aspira, ipay, mpesa } from "../assets/index";
import OrderSummary from "../components/checkout/orderSummary";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/accordion.css"

const Checkout = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  return (
    <div>
      <Header />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
        <div className="col-12 md:col-6 md:ml-20">
          <div className="card bg-white p-4 w-[700px] rounded-lg mb-4 px-3">
            <h5 className="text-lg font-semibold mb-3 ">Payment</h5>
            <Accordion className="px-4 py-2 " activeIndex={0}>
              <AccordionTab header="Pay Now" className="mb-6 font-semibold custom-tab">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <select
                    className="border p-2 rounded-md px-5 font-medium text-sm"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    <p>Choose Payment Method</p>
                    <option value="">Select Payment Method</option>
                    <option value="mpesa">M-pesa</option>
                    <option value="">Airtel Money</option>
                    <option value=""> Pesalink</option>
                    <option value="">Amex</option>
                    <option value="">Debit/Credit card</option>
                  </select>
                  {selectedPaymentMethod === "mpesa" && (
                    <div className="mt-2">
                      <select
                        className="border p-2 rounded-md w-20 text-sm font-medium "
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        <option value="+254">+254</option>
                        <option value="+254">+254 (Kenya)</option>
                        <option value="+255">+255 (Test)</option>
                        <option value="+256">+256 (Test)</option>
                      </select>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        maxLength={9}
                        value={"7*******"}
                        className="font-medimum text-sm border p-2 rounded-md"
                      />
                      <Link to="/receipt">
                      <button className="bg-yellow-400 hover:bg-green-800 hover:text-white text-white px-4 py-2 rounded-md ml-2">
                        Pay Now
                      </button>
                      </Link>
                    </div>
                  )}
                </div>{" "}
              </AccordionTab>
              <AccordionTab
                header="Pay Later with Aspira"
                className="mb-6 font-semibold"
              >
                {" "}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h1 className="font-semibold text-sm py-2">Aspira</h1>
                  <p className="font-medium text-sm py-2">
                    YourBasket is offering to give you flexibility in your
                    spending. Simply checkout and our agents will contact you
                    with more details on your order. Prices might change when
                    paying with Aspira.
                  </p>
                  <button className="bg-yellow-500 hover:bg-green-800 hover:text-white text-white px-4 py-1 rounded-md ml-2">
                    Pay Later
                  </button>
                </div>
              </AccordionTab>
              <AccordionTab
                className="font-semibold mb-6 "
                header="Pay on Delivery"
              >
                <div className="bg-gray-100  p-4 rounded-lg">
                  <p className="font-medium text-sm text-gray-700 py-1">
                    {" "}
                    Choose preffered payment method
                  </p>
                  <select
                    className="border p-2 rounded-md px-5 font-medium text-sm"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    <p>Choose Payment Method</p>
                    <option value="">Select Payment Method</option>
                    <option value="mpesa">M-pesa</option>
                    <option value="">Airtel Money</option>
                    <option value=""> Pesalink</option>
                    <option value="">Amex</option>
                    <option value="">Debit/Credit card</option>
                  </select>
                  <p className="font-medium text-sm text-gray-700 py-2">
                    Our authorized Agent will prompt you for mobile money
                    payment to save your time. Always verify the identity of the
                    Delivery Agent to match the Delivery Notification messages
                    from YourBasket before making any payments.
                  </p>
                  <button className="bg-yellow-500 hover:bg-green-800 hover:text-white text-white px-4 py-1 rounded-md ml-2">
                    Pay on Delivery
                  </button>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>

        {/* Payment Dropdowns and Pay Now Button */}
        <div className="col-12 md:col-6 md:ml-40">
          <OrderSummary
            totalAmt={totalAmt}
            ipay={ipay}
            aspira={aspira}
            mpesa={mpesa}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
