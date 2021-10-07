import React from "react"
import "./Navigation.scss"

const Navigation = () => {
    return(
        <div className="body-area-navigation">
        <div className="body-area-navigation-element">
          <div className="body-area-navigation-element-sub">
            <img src="/asset/svg/projects.svg" alt="logo" />
            <div className="body-area-navigation-element-sub-text">Create Ideas</div>
          </div>
        </div>
        <div className="body-area-navigation-element">
          <div className="body-area-navigation-element-sub">
            <img src="/asset/svg/org-profile.svg" alt="logo" />
            <div className="body-area-navigation-element-sub-text">
              Update Profile
            </div>
          </div>
        </div>
        <div className="body-area-navigation-element">
          <div className="body-area-navigation-element-sub">
            <img src="/asset/svg/control.svg" alt="logo" />
            <div className="body-area-navigation-element-sub-text">
              Logout
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navigation;