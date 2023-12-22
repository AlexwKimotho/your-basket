import React from "react";
import "../../styles/styles.css";

 const Payment = () => {
  return (
    <div
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      width: "600px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div className="payment-container">
      <div className="title  text-xl font-semibold">
        <div className="text-wrapper">Payment Details</div>
      </div>
      <div className="payment-details">
        <div className="frame">
          <div className="div  text-md font-semibold">
            <div className="text-wrapper-2">Payment Method</div>
            <div className="text-wrapper-3">Visa Card</div>
            <div className="text-wrapper-3">Brian Mugo</div>
          </div>
          <div className="div  text-md font-semibold">
            <div className="text-wrapper-2">Payment Date</div>
            <div className="text-wrapper-3">December 4th, 2023 09:00</div>
          </div>
        </div>
        <div className="div-2">
          <div className="div-3">
            <div className="text-wrapper-4">Subtotal</div>
            <div className="text-wrapper-4">Ksh. 10,000</div>
          </div>
          <div className="div-3">
            <div className="text-wrapper-4">Tax</div>
            <div className="text-wrapper-4">Ksh. 30</div>
          </div>
          <div className="div-3">
            <div className="text-wrapper-4">Delivery</div>
            <div className="text-wrapper-4">Free</div>
          </div>
          <div className="div-3">
            <div className="text-wrapper-4">Coupon</div>
            <div className="text-wrapper-4">-Ksh. 300</div>
          </div>
        </div>
        <div className="div-2">
          <img className="divider" alt="Divider" src="divider.svg" />
          <div className="div-3  text-md font-semibold">
            <div className="text-wrapper  text-md font-semibold">Total</div>
            <div className="text-wrapper-5">Ksh. 0,400,000</div>
          </div>
          <img className="img" alt="Divider" src="image.svg" />
        </div>
      </div>
    </div>
    </div>
  );
};
export default Payment