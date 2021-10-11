import React, { useState } from "react";
import {
  Container,
  Segment,
  Form,
  Button,
  Dropdown,
  Input,
  Message,
} from "semantic-ui-react";
import { EditorState } from "draft-js";
import { options } from "../../../Content/Profile";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Create.scss";
import { useHistory } from "react-router";
import factory from "../../../ethereum/Factory";
import web3 from "../../../ethereum/web3";
import toast, { Toaster } from "react-hot-toast";

const Create = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [idea, setIdea] = useState({
    title: "",
    types: "",
    responses: "",
    amount: "",
    ageMin: "",
    ageMax: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const setDropdownValues = (e, data) => {
    setIdea({ ...idea, [data.name]: data.value });
  };

  const setEssentialValues = (e) => {
    setIdea({ ...idea, [e.target.name]: e.target.value });
  };

  const returnBack = () => {
    history.goBack();
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(convertedContent);
    console.log(idea);
  };

  const deployIdea = async () => {
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createIdeas(
          idea.title,
          JSON.stringify(convertedContent),
          idea.responses,
          idea.amount,
          idea.ageMax,
          idea.ageMin
        )
        .send({
          from: accounts[0],
          type: "0x2",
        });
      toast.success("Success fully deployed idea !!");
      setLoading(false);
    } catch (err) {
      console.log("this err occured ", err);
      toast.error("Probably it didn't worked !!");
      setErrMessage(err);
    }
  };

  return (
    <>
      <Container>
        <Toaster />
        <Segment>
          here we will mention what you need to write in the text editor
        </Segment>
        <Segment>
          <Form error={!!errMessage}>
            <Form.Field>
              <label>Enter your idea title </label>
              <input
                name="title"
                placeholder="idea title"
                onChange={(e) => setEssentialValues(e)}
              />
            </Form.Field>

            <Form.Field>
              <label>Describe your idea </label>
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Form.Field>
            <label>
              <b>Select people which this idea intends for</b>
            </label>
            <Dropdown
              placeholder="select the people for which it intend for"
              fluid
              name="types"
              multiple
              selection
              onChange={(e, data) => setDropdownValues(e, data)}
              options={options}
            />

            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                label="min age"
                name="ageMin"
                onChange={(e) => setEssentialValues(e)}
                placeholder="Enter age lower bound"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="ageMax"
                label="max age"
                onChange={(e) => setEssentialValues(e)}
                placeholder="Enter age upper bound"
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-first-name"
                control={Input}
                type="number"
                label="no of responses you needed"
                name="responses"
                onChange={(e) => setEssentialValues(e)}
                placeholder="Enter no of responses needed"
              />
              <Form.Field
                id="form-input-control-last-name"
                control={Input}
                name="amount"
                label="amount to disburse"
                onChange={(e) => setEssentialValues(e)}
                placeholder="Enter amount to disburse"
                type="number"
              />
            </Form.Group>
            <Message error header="Oops!" content={errMessage} />
          </Form>
          <Button
            primary
            content="deploy"
            loading={loading}
            icon="save"
            onClick={() => deployIdea()}
            style={{ marginTop: "20px" }}
          />
          <Button
            onClick={() => returnBack()}
            primary
            icon="backward"
            style={{ marginTop: "20px" }}
            size="large"
            floated="right"
          />
        </Segment>
      </Container>
    </>
  );
};

export default Create;
