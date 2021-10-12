import React from "react";
import "./Review.scss";
import { Card, Icon, Modal, Button, Header } from "semantic-ui-react";

const Review = () => {
  const description = " this is a test description ";

  return (
    <>
      <Card fluid>
        <Card.Content header="About Amy" />
        <Card.Content description={description} />
        <Card.Content extra>
          <Modal
            trigger={
              <Button>
                <Icon name="user" />4 Approval
              </Button>
            }
            header="Reminder!"
            actions={[
              "Snooze",
              { key: "done", content: "Done", positive: true },
            ]}
          >
            <Modal.Content>
              <Header>this is header</Header>
              this is shit again
            </Modal.Content>
          </Modal>
        </Card.Content>
      </Card>
    </>
  );
};

export default Review;
