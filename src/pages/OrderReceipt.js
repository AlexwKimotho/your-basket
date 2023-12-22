import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import "../styles/styles.css";
import Payment from "../components/checkout/Payment";
import Tracking from "../components/checkout/Tracking";
import { Link } from "react-router-dom";

const Card = ({ header, items }) => (
  <div
    style={{
      padding: "10px",
      margin: "10px",
      width: "300px",
    }}
  >
    <h3>{header}</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const OrderReceipt = () => {
  const cardHeader = "Order Details";
  const cardHeader2 = "Delivery";
  const cardItems = ["Order No", "TMN098H"];
  const cardItems2 = ["Pickup Point", "Duhqa Shop Panagni"];
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((response) => response.json())
      .then((data) => {
        setOrderItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Calculate subtotal, tax, and total
  const subtotal = orderItems.reduce((acc, item) => acc + item.price, 0);
  const taxRate = 0.08; // 8% tax rate
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div>
       <Header />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Link to='/'>
        <button className="border-2 ml-3 rounded-md text-sm w-40 py-1 bg-yellow-400" onClick={() => console.log("Continue Shopping")}>Continue Shopping</button>
       </Link> <div>
          <button className="border rounded-md mr-5 text-sm w-32 py-1 border-green-800 text-green-800" onClick={() => console.log("Cancel Order")}>Cancel Order</button>
          <button  className="border-2 mr-5 text-sm rounded-md text-white w-40 py-1 bg-green-800 " onClick={() => console.log("Print Receipt")}>Print Receipt</button>
        </div>
      </div>
     
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Left side - Order details */}
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight: "20px" }}>
            <div
            className="text-md font-semibold"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                width: "300px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card header={cardHeader} items={cardItems} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div       
               className="text-md font-semibold"

              style={{
                padding: "10px",
                margin: "10px",
                width: "300px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card header={cardHeader2} items={cardItems2} />
            </div>
          </div>
        </div>

        {/* Right side - Payment details */}
        <div style={{ flex: 1 }}>
          <Payment />
        </div>
      </div>

      {/* Order Receipt start */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            backgroundColor: "white",
            borderRadius: "8px",
            width: "640px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="font-semibold text-xl">Order Receipt</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <div>{item.title}</div>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">--------------------------</td>
              </tr>
              <tr>
                <td>Subtotal</td>
                <td>${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax ({(taxRate * 100).toFixed(0)}%)</td>
                <td>${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="2">--------------------------</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div>
            <p>Thank you for your purchase!</p>
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>

        <Tracking />
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
