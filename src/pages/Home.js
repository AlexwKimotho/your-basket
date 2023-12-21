import React from "react";
import Products from "../components/home/Products";
import Header from "../components/header/Header";
const Home = () => {
  return (
    <div>
      <Header/>
      <div className="w-full bg-gray-100 -mt-16 lgl:-mt-24 xl:-mt-36 py-10">
        <Products />
      </div>
    </div>
  );
};

export default Home;
