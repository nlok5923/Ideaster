import React from "react";
import Navigation from "../Shared/Navigation/Navigation";
import "./Dashboard.scss";
import IdeaCard from "../Shared/Card/Card";
import { Button, Form, Input } from "semantic-ui-react";

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="page">
          <div className="body-area">
            <Navigation />
            <div className="body-area-content">
              <div className="body-area-content-box">
                <div className="status">
                  <div className="status-actions">
                    <div className="status-actions-element">
                      <h1 className="colored"> Your Ideas</h1>
                    </div>
                    <div className="status-actions-element">
                      <Form>
                        <Form.Field
                          id="form-input-control-last-name"
                          control={Input}
                          name="amount"
                          placeholder="Enter amount to add"
                          type="number"
                        />
                      </Form>
                    </div>
                    <div className="status-actions-element">
                      <Button content="Add money" color="red" icon="money" />
                    </div>
                  </div>
                  <div className="status-state">Your Balance: 0.0 eth</div>
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
