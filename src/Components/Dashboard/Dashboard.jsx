import React from "react";
import Navigation from "../Shared/Navigation/Navigation";
import "./Dashboard.scss";
import Header from "../Shared/Header/Header";
import IdeaCard from "../Shared/Card/Card";

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="page">
          <Header />
          <div className="body-area">
            <Navigation />
            <div className="body-area-content">
              <div className="body-area-content-box">
                <div className="status">
                  <div className="status-actions">
                    <div className="status-actions-element">
                      <h1 className="colored"> Your Ideas</h1>
                    </div>
                  </div>
                </div>
                <div className="contain">
                    <IdeaCard />
                    <IdeaCard />
                    <IdeaCard />
                    <IdeaCard />
                    <IdeaCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
