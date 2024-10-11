import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

function EditorComponent({
  content,
  onContentChange,
  editorRef,
  setTitleFocused,
  titleFocused,
  editorFocused,
  setEditorFocused,
}) {
  return (
    <>
      <Editor
        apiKey="fzq8ut8l4whwspu2pqzxwf84ukek80fotkywi6xvv99jpk5y"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={content} // Control the value of the editor
        onEditorChange={onContentChange} // Handle content changes
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
          height: 300,
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
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  );
}

export default EditorComponent;
