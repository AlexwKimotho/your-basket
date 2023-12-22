import React from "react";
import "../../styles/styles.css";

 const Tracking = () => {
  return (
    <div className="tracking-container"  style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "640px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}>
      <div className="title text-xl font-semibold">
        <div className="text-wrapper text-xl font-semibold">Tracking</div>
      </div>
      <div className="tracking-list">
        <div className="list-item">
          <img className="carbon-checkmark" alt="Carbon checkmark" src="carbon-checkmark-outline.svg" />
          <div className="tracking-details">
            <div className="tracking-title-and">
              <div className="div">Order Placed</div>
              <div className="text-wrapper-2">Dec 1, 2023</div>
            </div>
            <p className="p">Confirmation email received and payment processed successfully</p>
          </div>
        </div>
        <div className="list-item">
          <img className="carbon-checkmark" alt="Carbon checkmark" src="image.svg" />
          <div className="tracking-details">
            <div className="tracking-title-and">
              <div className="text-wrapper-3">Processing Order</div>
              <div className="text-wrapper-4">Dec 2, 2023</div>
            </div>
            <p className="text-wrapper-5">Items gathered, verified, and prepared for shipment.</p>
          </div>
        </div>
        <div className="list-item">
          <img className="carbon-checkmark" alt="Carbon checkmark" src="carbon-checkmark-outline-2.svg" />
          <div className="tracking-details">
            <div className="tracking-title-and">
              <div className="text-wrapper-3">Order Shipped</div>
              <div className="text-wrapper-4">Dec 3, 2023</div>
            </div>
            <p className="text-wrapper-5">Package handed to the carrier for delivery.</p>
          </div>
        </div>
        <div className="list-item">
          <img className="carbon-checkmark" alt="Carbon checkmark" src="carbon-checkmark-outline-3.svg" />
          <div className="tracking-details">
            <div className="tracking-title-and">
              <div className="text-wrapper-3">Out for Delivery</div>
              <div className="text-wrapper-4">Dec 4, 2023</div>
            </div>
            <p className="text-wrapper-5">Package scheduled for delivery on the same day.</p>
          </div>
        </div>
        <div className="list-item">
          <img className="carbon-checkmark" alt="Carbon checkmark" src="carbon-checkmark-outline-4.svg" />
          <div className="tracking-details">
            <div className="tracking-title-and">
              <div className="text-wrapper-3">Delivered</div>
              <div className="text-wrapper-4">Dec 4, 2023</div>
            </div>
            <p className="text-wrapper-5">Package successfully received by Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tracking;