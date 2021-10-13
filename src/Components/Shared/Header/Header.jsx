import React, { useContext } from "react";
import "./Header.scss";
import { UserContext } from "../../../Provider/UserAddressProvider";

const Header = () => {
  const info = useContext(UserContext);
  const { userAddress } = info;
  console.log(userAddress);
  return (
    <div className="head">
      <img className="head-logo" src="/asset/images/idea.png" alt="logo" />
      <div className="head-content">
        <div className="head-content-profile">
          <img src="/asset/svg/profile.svg" alt="logo" />
          {userAddress}
        </div>
      </div>
    </div>
  );
};

export default Header;
