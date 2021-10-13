import React, { useState, useContext } from "react";
import "./Profile.scss";
import { useHistory } from "react-router";
import {
  Container,
  Header,
  Form,
  Button,
  TextArea,
  Input,
  Dropdown,
  Segment,
} from "semantic-ui-react";
import { options, genderOptions } from "../../../Content/Profile";
import { updateProfile } from "../../../Services/profileServices";
import { UserContext } from "../../../Provider/UserAddressProvider";

const ProfilePage = () => {
  const info = useContext(UserContext);
  const { userAddress } = info;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const setDropdownValues = (e, data) => {
    setUserInformation({ ...userInformation, [data.name]: data.value });
  };

  const [userInformation, setUserInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    city: "",
    state: "",
    country: "",
    profession: "",
    aboutYou: "",
    terms: [],
    age: 0,
  });

  const setUserInfo = (e) => {
    setUserInformation({ ...userInformation, [e.target.name]: e.target.value });
  };

  const returnBack = () => {
    history.goBack();
  };

  const profileUpdate = async () => {
    try {
      setLoading(true);
      // console.log(userInformation + " " + userAddress);
      await updateProfile(userInformation, userAddress);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Header as="h1" textAlign="center">
          Update your profile here
        </Header>
        <Segment>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                name="firstName"
                onChange={(e) => setUserInfo(e)}
                label="First name"
                placeholder="First name"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="Last name"
                name="lastName"
                onChange={(e) => setUserInfo(e)}
                placeholder="Last name"
              />
            </Form.Group>
            <Dropdown
              placeholder="select your gender"
              name="gender"
              fluid
              search
              selection
              onChange={(e, data) => setDropdownValues(e, data)}
              options={genderOptions}
            />
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="email"
                name="email"
                onChange={(e) => setUserInfo(e)}
                placeholder="First name"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                label="confirm email"
                placeholder="confirm email"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                name="city"
                onChange={(e) => setUserInfo(e)}
                label="Enter city name"
                placeholder="city"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="state"
                onChange={(e) => setUserInfo(e)}
                label="Enter state name"
                placeholder="state"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="country"
                onChange={(e) => setUserInfo(e)}
                label="Enter country name"
                placeholder="country"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="your age"
                name="age"
                type="number"
                onChange={(e) => setUserInfo(e)}
                placeholder="your age"
              />
            </Form.Group>
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              onChange={(e) => setUserInfo(e)}
              name="profession"
              label="Enter your profession"
              placeholder="profession"
            />
            <Form.Field
              id="form-textarea-control-opinion"
              control={TextArea}
              name="aboutYou"
              onChange={(e) => setUserInfo(e)}
              label="Enter some information about you"
              placeholder="About you"
            />
            <label>Select terms associated with you</label>
            <Dropdown
              placeholder="select terms associated with you"
              fluid
              name="terms"
              multiple
              selection
              onChange={(e, data) => setDropdownValues(e, data)}
              options={options}
            />
          </Form>
        </Segment>
        <Button
          primary
          content="update"
          icon="save"
          style={{ marginTop: "20px" }}
          size="large"
          onClick={() => profileUpdate()}
          loading={loading}
          floated="center"
        />
        <Button
          onClick={() => returnBack()}
          primary
          icon="backward"
          style={{ marginTop: "20px" }}
          size="large"
          floated="right"
        />
      </Container>
    </>
  );
};

export default ProfilePage;
