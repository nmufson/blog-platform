import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

function EditorComponent({
  content,
  onContentChange = () => {},
  onBlur,
  editorRef = { current: null },
  setTitleFocused = () => {},
  titleFocused = false,
  editorFocused = false,
  onChange,
  setEditorFocused = () => {},
}) {
  return (
    <>
      <Editor
        apiKey="fzq8ut8l4whwspu2pqzxwf84ukek80fotkywi6xvv99jpk5y"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={content} // Control the value of the editor
        onEditorChange={(newContent) => {
          // Call the parent component's onContentChange function
          onContentChange(newContent);
        }}
        onBlur={() => {
          // Call the parent component's onBlur function when the editor loses focus
          onBlur();
        }}
        onClick={() => {
          setTitleFocused(false);
          setEditorFocused(true);
          console.log(
            'Focus changed - Title:',
            titleFocused,
            'Editor:',
            editorFocused,
          );
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

export default EditorComponent;
