import React from "react";
import "./Exploration.scss";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import IdeaCard from "../../Shared/IdeaCard/IdeaCard";

const Exploration = () => {
  const ideas = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <Container>
      <Header>Explore ideas</Header>
      <Divider />
      <Grid stackable columns={3}>
        {ideas.map((course, index) => {
          return (
            <Grid.Column key={index}>
              <Container fluid textAlign="center">
                <IdeaCard />
              </Container>
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Exploration;
