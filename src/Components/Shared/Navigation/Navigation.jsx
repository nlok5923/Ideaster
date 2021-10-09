import React from "react";
import "./Navigation.scss";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="body-area-navigation">
      <div className="body-area-navigation-element">
        <div className="body-area-navigation-element-sub">
          <img src="/asset/svg/projects.svg" alt="logo" />
          <div className="body-area-navigation-element-sub-text">
            <Link to="/user/dashboard/create">Create Ideas</Link>
          </div>
        </div>
      </div>
      <div className="body-area-navigation-element">
        <div className="body-area-navigation-element-sub">
          <img src="/asset/svg/org-profile.svg" alt="logo" />
          <div className="body-area-navigation-element-sub-text">
            <Link to="/user/dashboard/profile">Update Profile</Link>
          </div>
        </div>
      </div>
      <div className="body-area-navigation-element">
        <div className="body-area-navigation-element-sub">
          <img src="/asset/svg/control.svg" alt="logo" />
          <div className="body-area-navigation-element-sub-text">
            <Link to="/user/dashboard/exploration">Explore ideas</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
