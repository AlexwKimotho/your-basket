import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Accordion, AccordionTab } from "primereact/accordion";
import { aspira, ipay, mpesa } from "../assets/index";
import OrderSummary from "../components/checkout/orderSummary";
import { useSelector } from "react-redux";

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

  const handlePayNow = () => {
    // Handle payment logic here based on selectedPaymentMethod and countryCode
    // You can implement the logic to interact with your payment gateway
    console.log("Processing payment...");
  };

  return (
    <div>
      <Header />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-12 md:col-6">
          {/* Accordion Component */}
          <div className="card bg-white p-4 rounded-lg mb-4">
            <h5 className="text-lg font-semibold mb-2">AccordionPanel</h5>
            <Accordion activeIndex={0}>
              <AccordionTab header="Header I">
                <p>
                  <div className="bg-white p-4 rounded-lg">
                    <select
                      className="border p-2 rounded-md"
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="mpesa">M-pesa</option>
                      {/* Add more payment methods as needed */}
                    </select>
                    {selectedPaymentMethod === "mpesa" && (
                      <div className="mt-2">
                        <select
                          className="border p-2 rounded-md"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          <option value="">Select Country Code</option>
                          <option value="+254">+254 (Kenya)</option>
                          {/* Add more country codes as needed */}
                        </select>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                          onClick={handlePayNow}
                        >
                          Pay Now
                        </button>
                      </div>
                    )}
                  </div>{" "}
                </p>
              </AccordionTab>
              <AccordionTab header="Header II">
                <p>{/* Content for Header II */}</p>
              </AccordionTab>
              <AccordionTab header="Header III">
                <p>{/* Content for Header III */}</p>
              </AccordionTab>
            </Accordion>
          </div>
        </div>

        {/* Payment Dropdowns and Pay Now Button */}
        <div className="col-12 md:col-6">
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
