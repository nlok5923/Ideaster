import React, { useState } from "react";
import Header from "../../Shared/Header/Header"
import { Container, Segment, Form, Button } from "semantic-ui-react";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./Create.scss"


const Create = () => {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
  
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

    return(
        <>
        <Header />
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
                   </Form>
                   <Button primary content="save" icon="save"  style={{ marginTop: "20px" }} />
            </Segment>
        </Container>
        </>
    )
}

export default Create;