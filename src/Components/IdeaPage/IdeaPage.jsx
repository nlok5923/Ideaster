import React, { useEffect, useState, useContext } from "react";
import "./IdeaPage.scss";
import { useParams } from "react-router";
import {
  Container,
  Segment,
  Header,
  Button,
  Modal,
  Form,
  Icon,
} from "semantic-ui-react";
import Review from "./Review/Review";
import Idea from "../../ethereum/Idea";
import DOMPurify from "dompurify";
import { UserContext } from "../../Provider/UserAddressProvider";
import toast, { Toaster } from "react-hot-toast";

const IdeaPage = () => {
  const info = useContext(UserContext);
  const { userAddress, age } = info;
  const [allReviewers, setAllReviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const { ideaAddress } = useParams();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState({ title: "", description: "" });
  const [ideaInstance, setIdeaInstance] = useState();
  const [allReviews, setALlReviews] = useState([]);
  const [ideaSummary, setIdeaSummary] = useState({
    title: "",
    description: "",
    address: "",
    reviewLength: 0,
  });

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  useEffect(() => {
    try {
      console.log(" this is called ", ideaSummary.reviewLength);
      const reviews = [];
      const reviewLengthArray = Array.from(
        Array(ideaSummary.reviewLength).keys()
      );
      reviewLengthArray.map(async (i) => {
        const particularReview = await ideaInstance.methods.reviews(i).call();
        reviews.push(particularReview);
        console.log(particularReview);
        setALlReviews((allReviews) => [...allReviews, particularReview]);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, [ideaSummary]);

  const addReview = async () => {
    try {
      setLoading(true);
      await ideaInstance.methods
        .createReview(review.title, review.description)
        .send({
          from: userAddress,
          type: "0x2",
        });
      setLoading(false);
      setOpen(false);
      toast.success(" Review added successfully !!");
    } catch (err) {
      console.log(err.message);
      toast.error("Adding review didn't worked !!");
    }
  };

  useEffect(async () => {
    console.log(" this is user age ", age);
    setCurrentAddress(ideaAddress);
    console.log(currentAddress);
    const idea = Idea(ideaAddress);
    setIdeaInstance(idea);
    const ideaInfo = await idea.methods.getSummary().call();
    setIdeaSummary({
      title: ideaInfo[0],
      description: ideaInfo[1],
      address: ideaInfo[2],
      reviewLength: ideaInfo[3],
    });
    const addressOfReviewers = await idea.methods.getAllReviewers().call();
    setAllReviewers(addressOfReviewers);
  }, []);

  return (
    <>
      <Toaster />
      <Container style={{ marginTop: "20px" }}>
        <Header as="h3">/dashboard/explore-idea/Idea/{ideaAddress}</Header>
        <Segment>
          <b>Title: </b>
          {ideaSummary.title}
        </Segment>
        <Segment>
          <b>Description: </b> <br />
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(ideaSummary.description)}
          ></div>
        </Segment>
        <Segment>
          <b>Managed by:</b> {ideaSummary.address}
        </Segment>
        <Header as="h1">All Reviews</Header>
        <Segment>
          <Modal
            closeIcon
            open={open}
            trigger={
              <Button color="green" icon="add">
                Add your review
              </Button>
            }
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header as="h2" content="Add your review" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label> your review title </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="review title"
                    onChange={(e) =>
                      setReview({ ...review, [e.target.name]: e.target.value })
                    }
                  />
                  <label> Your review Description </label>
                  <input
                    name="description"
                    type="text"
                    placeholder="review description"
                    onChange={(e) =>
                      setReview({ ...review, [e.target.name]: e.target.value })
                    }
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                onClick={() => addReview()}
                loading={loading}
              >
                <Icon name="add" /> Add Review
              </Button>
            </Modal.Actions>
          </Modal>
          {allReviews.map((element, index) => {
            return (
              <Review
                key={index}
                data={element}
                index={index}
                ideaAddress={ideaAddress}
                allReviewers={allReviewers}
                isAdmin={false}
              />
            );
          })}
        </Segment>
      </Container>
    </>
  );
};

export default IdeaPage;
