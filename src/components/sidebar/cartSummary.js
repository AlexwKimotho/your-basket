// CartSummary.js
import React from "react";
import { increaseQuantity, decreaseQuantity } from "../../redux/amazonSlice";
import { useSelector, useDispatch } from "react-redux";
import SummaryCard from "../SummaryCard";

const CartSummary = () => {
  const products = useSelector((state) => state.amazonReducer.products);
  const dispatch = useDispatch();

  return (
    <div className="py-3 border-b-[1px] border-b-gray-300">
      <h3 className="text-lg font-titleFont font-semibold mb-1 px-6">
        Cart Summary
      </h3>
      <ul className="text-sm">
        {products.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-6 py-2"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="h-8 w-8 object-cover mr-2"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <div className="bg-[#F0F2F2] flex justify-center items-center gap-2 w-24 py-1 text-center drop-shadow-lg rounded-md">
                  <p
                    onClick={() => {
                      dispatch(decreaseQuantity(item.id));
                    }}
                    className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
                  >
                    -
                  </p>
                  <p className="font-titleFont text-base text-amazon_blue">
                    {item.quantity}
                  </p>
                  <p
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="cursor-pointer bg-gray-200 px-2 rounded-sm hover:bg-green-900 font-semibold duration-300"
                  >
                    +
                  </p>
                </div>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <span className="font-medium">{`$${
              item.price * item.quantity
            }`}</span>
          </li>
        ))}
      </ul>
      <SummaryCard />
    </div>
  );
};

export default CartSummary;
