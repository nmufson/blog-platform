import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

function EditorComponent({
  content,
  onContentChange = () => {},
  onBlur = () => {},
  editorRef = { current: null },
  setTitleFocused = () => {},
  setEditorFocused = () => {},
}) {
  return (
    <>
      <Editor
        apiKey="fzq8ut8l4whwspu2pqzxwf84ukek80fotkywi6xvv99jpk5y"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={(newContent) => {
          onContentChange(newContent);
        }}
        onBlur={() => {
          onBlur();
        }}
        onClick={() => {
          setTitleFocused(false);
          setEditorFocused(true);
        }}
        init={{
          height: 500,
          menubar: false,
          placeholder: 'Let your mind run free...',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Montserrat,sans-serif; font-size:14px; background-color: #dbe2ef; }',
          content_css: '/EditorComponent.module.css',
          body_class: 'tox-tinymce',
        }}
      />
    </>
  );
}

EditorComponent.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func,
  onBlur: PropTypes.func,
  editorRef: PropTypes.shape({
    current: PropTypes.object,
  }),
  setTitleFocused: PropTypes.func,
  setEditorFocused: PropTypes.func,
};

export default EditorComponent;
