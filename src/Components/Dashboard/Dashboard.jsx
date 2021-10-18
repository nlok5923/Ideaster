import React, { useState, useContext, useEffect } from "react";
import Navigation from "../Shared/Navigation/Navigation";
import "./Dashboard.scss";
import IdeaCard from "../Shared/Card/Card";
import { Button, Form, Input } from "semantic-ui-react";
import { UserContext } from "../../Provider/UserAddressProvider";
import web3 from "../../ethereum/web3";
import Factory from "../../ethereum/Factory";
import { NavLink } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";

const Dashboard = () => {
  const info = useContext(UserContext);
  const { userAddress } = info;
  const [currentBalance, setCurrentBalance] = useState(0);
  const [addMoney, setAddMoney] = useState({ amt: "" });
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [myIdeas, setMyIdeas] = useState([]);
  const [fetchAllIdeas, setFetchedIdeas] = useState(false);

  useEffect(async () => {
    try {
      setFetchedIdeas(true);
      const balance = await Factory.methods.getUserBalance(userAddress).call();
      console.log("this is account balance", balance + " " + userAddress);
      const myIdeasAddress = await Factory.methods
        .getAllMyIdeas(userAddress)
        .call();
      console.log(myIdeasAddress);
      setMyIdeas(myIdeasAddress);
      // 1000000000000000000 10^18
      setCurrentBalance(balance / 1000000000000000000);
      setFetchedIdeas(false);
    } catch (err) {
      console.log(err.message);
    }
  }, [userAddress]);

  const initTransaction = async () => {
    try {
      setTransactionLoading(true);
      await Factory.methods.depositBalance().send({
        from: userAddress,
        value: web3.utils.toWei(addMoney.amt, "ether"),
        type: "0x2",
      });
      setTransactionLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {fetchAllIdeas && <Loader />}
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
                          name="amt"
                          onChange={(e) =>
                            setAddMoney({ [e.target.name]: e.target.value })
                          }
                          placeholder="Enter amount to add"
                          type="text"
                        />
                      </Form>
                    </div>
                    <div className="status-actions-element">
                      <Button
                        content="Add money"
                        color="red"
                        icon="money"
                        onClick={() => initTransaction()}
                        loading={transactionLoading}
                      />
                    </div>
                  </div>
                  <div className="status-state">
                    Your Balance: {currentBalance} eth
                  </div>
                </div>
                <div className="contain">
                  {myIdeas.map((address, index) => {
                    return (
                      <NavLink
                        key={index}
                        exact
                        activeClassName="current"
                        to={`/user/dashboard/your-idea/${address}`}
                      >
                        <IdeaCard data={address} />
                      </NavLink>
                    );
                  })}
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
