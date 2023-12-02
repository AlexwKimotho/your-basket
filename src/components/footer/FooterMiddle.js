import React from "react";

import { logo } from "../../assets/index";

const FooterMiddle = () => {
  return (
    <div className="w-full bg-amazon_light text-white">
  
      <div className="w-full flex gap-6 items-center justify-center py-6">
        <div>
          <img className="w-20 pt-3" src={logo} alt="logo" />
        </div>
        </div>
        <div className="flex flex-col justify-center items-center px-4">
        <div>
          <ul className="text-gray-300 text-sm gap-2 md:gap-4 py-2 mt-4 flex">
            <li className="font-normal text-[12px] hover:underline cursor-pointer text-[#DDD] leading-3">
              Conditions of Use
            </li>
            <li className="font-normal text-[12px] hover:underline cursor-pointer text-[#DDD] leading-3">
              Privacy Notice
            </li>
            <li className="font-normal text-[12px] hover:underline cursor-pointer text-[#DDD] leading-3">
              Your Ads Privacy Choices
            </li>
          </ul>
        </div>
        <div>
          <p className="font-normal text-[12px] text-[#DDD] leading-3">
            © 2023, Your Basket          </p>
        </div>
        <br/>
      </div>
     
    </div>
  );
};

export default FooterMiddle;
