import React, { useEffect, useState } from "react";
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

const IdeaPage = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const { ideaAddress } = useParams();
  const [open, setOpen] = useState(false);
  // const [ideaInstance, setIdeaInstance] = useState();
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

  // const addReview = () => {

  // }

  useEffect(async () => {
    setCurrentAddress(ideaAddress);
    const idea = Idea(ideaAddress);
    // setIdeaInstance(idea);
    const ideaInfo = await idea.methods.getSummary().call();
    console.log(ideaInfo);
    // console.log(idea);
    console.log(ideaInfo[0]);
    setIdeaSummary({
      title: ideaInfo[0],
      description: ideaInfo[1],
      address: ideaInfo[2],
      reviewLength: ideaInfo[3],
    });
  }, []);

  return (
    <>
      <Container>
        <Segment>
          this is the idea area {currentAddress}
          {ideaSummary.title}
        </Segment>
        <Segment>
          <div
            className="preview"
            dangerouslySetInnerHTML={createMarkup(
              JSON.parse(ideaSummary.description)
            )}
          ></div>
        </Segment>
        <Header as="h1">All Reviews</Header>
        <Segment>
          <Modal
            closeIcon
            open={open}
            trigger={<Button>Show Modal</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header as="h2" content="Add your review" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label> your review title </label>
                  <input name="title" type="text" placeholder="review title" />
                  <label> Your review Description </label>
                  <input
                    name="description"
                    type="text"
                    placeholder="review description"
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={() => setOpen(false)}>
                <Icon name="add" /> Add Review
              </Button>
            </Modal.Actions>
          </Modal>
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </Segment>
      </Container>
    </>
  );
};

export default IdeaPage;
