import React from "react"
import './Header.scss'

const Header = () => {
    return(
        <div className="head">
        <img className="head-logo" src="/asset/images/idea.png" alt="logo" />
        <div className="head-content">
          <div className="head-content-profile">
            <img src="/asset/svg/profile.svg" alt="logo" />
            Unknown
          </div>
        </div>
      </div>
    );
}

export default Header;