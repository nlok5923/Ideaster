import React, { useEffect, useState } from "react";
import "./Exploration.scss";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import IdeaCard from "../../Shared/IdeaCard/IdeaCard";
import factory from "../../../ethereum/Factory";
import { NavLink } from "react-router-dom";

const Exploration = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(async () => {
    try {
      const address = await factory.methods.allIdeas().call();
      console.log(address);
      setIdeas(address);
    } catch (err) {
      console.log(" this is err ", err);
    }
  }, []);

  return (
    <Container>
      <Header>Explore ideas</Header>
      <Divider />
      <Grid stackable columns={3}>
        {ideas.map((ideaAddress, index) => {
          return (
            <Grid.Column key={index}>
              <Container fluid textAlign="center">
                <NavLink
                  exact
                  activeClassName="current"
                  to={`/user/dashboard/exploration/${ideaAddress}`}
                >
                  <IdeaCard />
                </NavLink>
              </Container>
            </Grid.Column>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Exploration;
