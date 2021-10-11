import React, { useEffect } from "react";
import "./Exploration.scss";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import IdeaCard from "../../Shared/IdeaCard/IdeaCard";
import factory from "../../../ethereum/Factory";

const Exploration = () => {
  useEffect(async () => {
    try {
      const address = await factory.methods.deployedIdeas("1");
      console.log(address);
    } catch (err) {
      console.log(" this is err ", err);
    }
  }, []);

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
