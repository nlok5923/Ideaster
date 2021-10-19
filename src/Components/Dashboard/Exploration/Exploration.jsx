import React, { useEffect, useState } from "react";
import "./Exploration.scss";
import { Container, Divider, Header, Grid } from "semantic-ui-react";
import IdeaCard from "../../Shared/IdeaCard/IdeaCard";
import factory from "../../../ethereum/Factory";
import { NavLink } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";
// import { UserContext } from "../../../Provider/UserAddressProvider";
import Idea from "../../../ethereum/Idea";
// remebers to add unique string with idea
// we should also add a minimum contribution for a reviewer to provide a valid review
// also add field like state country gender
const Exploration = () => {
  const [ideas, setIdeas] = useState([]);
  const [fetchAllIdeas, setFetchedIdeas] = useState(false);
  // const info = useContext(UserContext);
  // const { age, city, country, gender, profession, terms, state } = info;
  const [allIdeas, setAllIdeas] = useState([]);

  useEffect(() => {
    try {
      setFetchedIdeas(true);
      ideas.map(async (ideaAddress, index) => {
        const ideaInstance = Idea(ideaAddress);
        const ideaInfo = await ideaInstance.methods.getSummary().call();
        setAllIdeas((allIdeas) => [
          ...allIdeas,
          { address: ideaAddress, ideaInfo },
        ]);
        console.log(allIdeas);
        console.log(ideaInfo);
      });
      setFetchedIdeas(false);
      console.log("all ideas", allIdeas);
    } catch (err) {
      console.log(err.message);
    }
  }, [ideas]);

  useEffect(async () => {
    try {
      const address = await factory.methods.allIdeas().call();
      console.log(address);
      setIdeas(address);
      // const idea = Idea(ideaAddress);
      // console.log(idea);
      // setIdeaInstance(idea);
      // const ideaInfo = await idea.methods.getSummary().call();
      // console.log(userAddress + " " + age);
    } catch (err) {
      console.log(" this is err ", err);
    }
  }, []);

  const filterIdea = (idea) => {
    // const ideaTitle = idea[0];
    // const ideaDescription = idea[1];
    // const ideaAmt = idea[4];
    // const ideaAgeMax = idea[5];
    // const ideaAgeMin = idea[6];

    return true;
  };

  return (
    <>
      {fetchAllIdeas && <Loader />}
      <Container>
        <Header style={{ marginTop: "20px" }} as="h3">
          /dashboard/explore-ideas
        </Header>
        <Divider />
        <Grid stackable columns={3}>
          {allIdeas.filter(filterIdea).map((idea, index) => {
            return (
              <Grid.Column key={index}>
                <Container fluid textAlign="center">
                  <NavLink
                    exact
                    activeClassName="current"
                    to={`/user/dashboard/exploration/${idea.address}`}
                  >
                    <IdeaCard data={idea} />
                  </NavLink>
                </Container>
              </Grid.Column>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Exploration;
