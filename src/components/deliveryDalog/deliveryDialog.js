import React from "react";

const DeliveryDialog = ({ onClose, onOptionSelect, currentOption }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-200 w-[700px] h-[350px] p-4 rounded-md flex ml-10 gap-4">
        {/* Left Card */}
        <div className="flex-1 h-[300px]  pr-6 rounded-md p-5 bg-white">
          <p className="text-lg font-semibold mb-4">Pickup</p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <p className="font-semibold mb-2">Counties in Kenya</p>
            <ul>
              <li>Nairobi</li>
              <li>Langata</li>
              <li>Westland</li>
            </ul>
          </div>
        </div>
        {/* Right Card */}
        <div className="bg-white h-[300px] rounded-md p-5 flex-1 pl-4">
          <p className="text-lg font-semibold mb-4">Door Delivery</p>
          <div className="mb-4">
            <input
              type="radio"
              id="placeA"
              name="pickupPoint"
              value="placeA"
              checked={currentOption === "placeA"}
              onChange={() => onOptionSelect("placeA")}
            />
            <label htmlFor="placeA" className="ml-2 font-medium">
              Your Basket Collection Point
            </label>
          </div>
          <p className="mt-[-15px] text-sm ml-[20px] mb-3 ">Opposite Jamii Mosque, 400m from Ngara Square</p>
          <button className="border bg-yellow-400 text-white hover:bg-green-800 hover:text-white w-12 rounded-md ml-[20px] mb-4 ">save</button>
          <div>
            <input
              type="radio"
              id="placeB"
              name="pickupPoint"
              value="placeB"
              checked={currentOption === "placeB"}
              onChange={() => onOptionSelect("placeB")}
              className="bg-yellow-400"
            />
            <label htmlFor="placeB" className="ml-2 font-medium">
              Your Basket Collection 2
            </label>
          </div>
          <p className="text-sm ml-[20px] mb-3 ">Opposite Jamii Mosque, 400m from Ngara Square</p>

        </div>{" "}
      </div>
    </div>
  );
};

export default DeliveryDialog;
