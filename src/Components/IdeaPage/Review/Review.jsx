/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import "./Review.scss";
import {
  Card,
  Icon,
  Modal,
  Input,
  Button,
  Form,
  Header,
} from "semantic-ui-react";
import { UserContext } from "../../../Provider/UserAddressProvider";
import toast, { Toaster } from "react-hot-toast";
import Idea from "../../../ethereum/Idea";
// import web3 from "../../../ethereum/web3";

const Review = (props) => {
  const [ideaInstance, setIdeaInstance] = useState();
  const [loading, setLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addMoney, setAddMoney] = useState({ amt: "" });
  const info = useContext(UserContext);
  const { userAddress } = info;
  const description = " this is a test description ";
  console.log(props);

  const initTransaction = async () => {
    try {
      setTransactionLoading(true);
      console.log(addMoney);
      await ideaInstance.methods
        .rewardReviewer(props.data[3], addMoney.amt)
        .send({
          from: userAddress,
          type: "0x2",
        });
      setTransactionLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (userAddress) {
      const idea = Idea(props.ideaAddress);
      setIdeaInstance(idea);
    }
  }, []);

  const approveReview = async (reviewIndex) => {
    try {
      if (props.allReviewers.includes(userAddress)) {
        toast("You already bagged it !!");
      } else {
        setLoading(true);
        await ideaInstance.methods
          .approveReview(reviewIndex)
          .send({ from: userAddress, type: "0x2" });
        toast.success("Review approved successfully");
        setLoading(false);
        setOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
      toast.error("falied to approve review!!");
    }
  };

  return (
    <>
      <Toaster />
      <Card fluid>
        <Card.Content header="About Amy" />
        <Card.Content description={description} />
        <Card.Content extra>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button>
                <Icon name="user" />
                {props.data.approvalCount} Approval
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header as="h2" content="Confirmation !!" />
            <Modal.Content>
              Do you really want to approve this review !!
            </Modal.Content>
            <Modal.Actions>
              <>
                <Button
                  color="green"
                  onClick={() => approveReview(props.index)}
                  loading={loading}
                >
                  <Icon name="add" /> Yes !!
                </Button>
                <Button color="red" onClick={() => setOpen(false)}>
                  <Icon name="add" /> By mistake
                </Button>
              </>
            </Modal.Actions>
          </Modal>

          {props.isAdmin ? (
            <div>
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
              <br />
              <Button
                content="Add money"
                color="red"
                icon="money"
                onClick={() => initTransaction()}
                loading={transactionLoading}
              />
            </div>
          ) : null}
        </Card.Content>
      </Card>
    </>
  );
};

export default Review;
