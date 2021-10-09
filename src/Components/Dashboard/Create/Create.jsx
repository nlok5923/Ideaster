import React, { useState } from "react";
import {
  Container,
  Segment,
  Form,
  Button,
  Dropdown,
  Input,
} from "semantic-ui-react";
import { EditorState } from "draft-js";
import { options } from "../../../Content/Profile";
// import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Create.scss";
import { useHistory } from "react-router";

const Create = () => {
  const history = useHistory();

  const [idea, setIdea] = useState({
    title: "",
    description: "",
    types: "",
    responses: "",
    threshold: "",
    amount: "",
    ageMin: "",
    ageMax: "",
  });

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

  // const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    // let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    // setConvertedContent(currentContentAsHTML);
  };

  return (
    <>
      <Container>
        <Segment>
          here we will mention what you need to write in the text editor
        </Segment>
        <Segment>
          <Form>
            <Form.Field>
              <label>Enter your idea title </label>
              <input name="title" placeholder="idea title" />
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
          </Form>
          <Button
            primary
            content="save"
            icon="save"
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
