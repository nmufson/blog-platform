const TitleInput = ({ showLabel }) => {
  return (
    <>
      {showLabel && <label htmlFor="postTitle">Title:</label>}
      <input
        type="text"
        id="postTitle"
        ref={titleRef}
        maxLength={100}
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        onClick={() => {
          setTitleFocused(true);
          setEditorFocused(false);

          console.log('title:', titleFocused, 'editor', editorFocused);
        }}
      />
    </>
  );
};
