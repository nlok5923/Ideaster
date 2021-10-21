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
  Segment,
} from "semantic-ui-react";
import { UserContext } from "../../../Provider/UserAddressProvider";
import toast, { Toaster } from "react-hot-toast";
import Idea from "../../../ethereum/Idea";
import web3 from "../../../ethereum/web3";

const Review = (props) => {
  const [ideaInstance, setIdeaInstance] = useState();
  const [loading, setLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [addMoney, setAddMoney] = useState({ amt: "" });
  const info = useContext(UserContext);
  const { userAddress } = info;
  console.log(props);

  const initTransaction = async () => {
    try {
      setTransactionLoading(true);
      console.log(addMoney);
      console.log(
        props.data[3] + " " + web3.utils.toWei(addMoney.amt, "ether")
      );
      await ideaInstance.methods
        .rewardReviewer(props.data[3], web3.utils.toWei(addMoney.amt, "ether"))
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
      console.log("ideainstance is defined now ");
    }
  }, [userAddress]);

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
        <Card.Content header={"Reviewer: " + props.data.recipient} />
        <Card.Content>
          <Segment>
            <b> Title: </b>
            {props.data.description}
            <br />
            <br />
            <b>Description: </b>
            {props.data.title}
          </Segment>
        </Card.Content>
        <Card.Content extra>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button color="green" floated="right">
                <Icon name="user" />
                {props.data.approvalCount} Approval
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header as="h2" content="Confirmation !!" />
            <Modal.Content>
              Do you really think that this review is constructive review and
              contributing enough to the idea !!
            </Modal.Content>
            <Modal.Actions>
              <>
                <Button
                  color="green"
                  onClick={() => approveReview(props.index)}
                  loading={loading}
                >
                  Yes !!
                </Button>
                <Button color="red" onClick={() => setOpen(false)}>
                  By mistake
                </Button>
              </>
            </Modal.Actions>
          </Modal>

          {props.isAdmin ? (
            <div>
              <Form>
                <Form.Group>
                  <Form.Field
                    id="form-input-control-last-name"
                    control={Input}
                    name="amt"
                    onChange={(e) =>
                      setAddMoney({ [e.target.name]: e.target.value })
                    }
                    placeholder="Enter amount and reward reviewer"
                    type="text"
                  />
                  <br />
                  <Button
                    content="Reward him"
                    color="red"
                    icon="money"
                    onClick={() => initTransaction()}
                    loading={transactionLoading}
                  />
                </Form.Group>
              </Form>
            </div>
          ) : null}
        </Card.Content>
      </Card>
    </>
  );
};

export default Review;
