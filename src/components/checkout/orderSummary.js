import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeliveryDialog from "../deliveryDalog/deliveryDialog"; 

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
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState("basketCollection");

  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price.toFixed(2));
  }, [products]);

  const handleEditClick = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="bg-white h-auto w-96 flex items-center p-4 rounded-lg">
        <div className="text-center w-full">
          <p className="font-semibold text-md pb-3">Order Summary</p>

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
              <span>Your Basket Collection Point ({selectedOption === "doorDelivery" ? "Door Delivery" : "Default Pickup Location"})</span>
              <button className="border border-gray-600 w-9" onClick={handleEditClick}>
                Edit
              </button>
            </p>

            <p className="flex justify-between items-center text-xs border-b-2 border-b-gray-350 pb-1">
              <span className="text-gray-400">Enter Coupon code</span>
              <button className="bg-green-800 text-white w-12 py-1">Apply</button>
            </p>
            <br />
            <p className="flex justify-between items-center text-sm pb-3">
              <span className="font-semibold">Total :</span>
              <span className="font-semibold">ksh {totalAmt}</span>
            </p>
          </div>
        </div>
      </div>

      {showDialog && (
        <DeliveryDialog
          onClose={handleCloseDialog}
          onOptionSelect={handleOptionSelect}
          currentOption={selectedOption}
        />
      )}
    </div>
  );
};

export default SummaryCard;