/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "semantic-ui-react";

const IdeaCard = (props) => {
  return (
    <Card
      link
      header={props.data}
      meta="this is your idea"
      fluid
      description={["head in to see your idea review status !!"].join("")}
    />
  );
};

export default IdeaCard;
