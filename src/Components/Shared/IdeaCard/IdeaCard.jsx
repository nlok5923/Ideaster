import React from "react";
import "./IdeaCard.scss";
import { Card } from "semantic-ui-react";

const IdeaCard = () => {
  return (
    <Card link>
      <img
        src={"/asset/images/idea.png"}
        style={{ height: "300px", width: "290px" }}
        alt="card"
      />
      <Card.Content>
        <Card.Header>Sample heading</Card.Header>
        <Card.Description>this is a test description</Card.Description>
        <Card.Description>
          <span>we need meta here </span>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default IdeaCard;
