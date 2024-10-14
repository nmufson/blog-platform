import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlogPostById } from '../../services/blogPostService';
import AffectPublish from '../../../author-frontend/src/components/AffectPublish/AffectPublish';
import CommentList from '../../components/Blog/CommentList/CommentList';
import styles from './BlogPost.module.css';
import { useOutletContext } from 'react-router-dom';
import formatDateTime from '../../utils/formatDateTime';
import DOMPurify from 'dompurify';
import Modal from '../../components/Modal/Modal';
import EditDeleteIcons from '../../../author-frontend/src/components/EditDeleteIcons/EditDeleteIcons.jsx';
import { useNavigate } from 'react-router-dom';

import EditorComponent from '../../../author-frontend/src/components/EditorComponent/EditorComponent';
import { deleteBlogPost, updateBlogPost } from '../../services/blogPostService';

const BlogPost = () => {
  const { postId } = useParams(); // Extract postId from URL
  const location = useLocation(); // Access state passed from navigation
  const [post, setPost] = useState(location.state?.post || null);
  const [postContent, setPostContent] = useState(post?.content || '');
  const [postTitle, setPostTitle] = useState(post?.title || '');
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useOutletContext();

  // allow title and main edits if isEditing is true, add save button
  // if isEditing is true, remove publish config
  const { date, time } = formatDateTime(post.timestamp);
  const navigate = useNavigate();

  // tries to pull post data from parent component state, or calls
  // api if it can't
  useEffect(() => {
    if (!post) {
      const getPost = async () => {
        try {
          const data = await fetchBlogPostById(postId);
          const post = data.post;
          setPost(post); // Assuming the post is nested under `data.post`
          setPostTitle(post.title);
          setPostContent(post.content);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      getPost();
    }
  }, [post, postId, setPostContent, setPostTitle]);

  if (!post) return <div>Loading...</div>;

  const handleAffectPublishClick = () => {
    setModalType('affectPublish');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    if (modalType === 'delete') {
      deletePost();
    } else if (modalType === 'affectPublish') {
      updatePost(!post.published);
    }
    setIsModalOpen(false);
  };

  const updatePost = async (published) => {
    try {
      const response = await updateBlogPost(
        user,
        post.id,
        postTitle,
        postContent,
        published,
      );
      const updatedPost = response.updatedPost;
      setPost(updatedPost);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const deletePost = async () => {
    try {
      await deleteBlogPost(user, post.id);
      console.log('Post deleted.');
      navigate('/home');
      // Optionally, you might want to redirect or update the UI here
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  // perhaps underline the title
  // check if theyre an author before showing the publish div
  // allow them to update or delete the post
  return (
    <>
      <div className={styles.BlogPost} onClick={() => console.log(post)}>
        <div className={styles.postContainer}>
          <div className={styles.BlogHeader}>
            {isEditing ? (
              <input
                value={postTitle}
                onChange={(event) => setPostTitle(event.target.value)}
              ></input>
            ) : (
              <h1>{post.title || post.title}</h1>
            )}
            <strong className={styles.AuthorName}>{post.user.username}</strong>
            <p className={styles.DateTime}>
              {date}, {time}
            </p>
          </div>

          <img
            src={post.image}
            // {have user include alt text}
            // alt={post.altText}
            className={styles.blogImage}
          />
          {user?.canPost && post.userId === user.id && !isEditing && (
            <AffectPublish
              post={post}
              handleAffectPublishClick={handleAffectPublishClick}
            />
          )}
          {isEditing ? (
            <EditorComponent
              content={postContent || post.content}
              onContentChange={(newContent) => setPostContent(newContent)}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          )}
        </div>
        {user?.id === post.userId && (
          <div className={styles.EditDeleteContainer}>
            <EditDeleteIcons
              setIsModalOpen={setIsModalOpen}
              setModalType={setModalType}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updatePost={updatePost}
            ></EditDeleteIcons>
          </div>
        )}

        <CommentList post={post} comments={post.comments}></CommentList>
      </div>
      <Modal
        title={
          modalType === 'delete'
            ? 'Delete Post'
            : post.published
              ? 'Unpublish Post'
              : 'Publish Post'
        }
        message={
          modalType === 'delete'
            ? 'Are you sure you want to delete this post? This action cannot be undone.'
            : post.published
              ? 'Are you sure you want to unpublish this post? It will no longer be visible to others.'
              : 'Are you sure you want to publish this post?'
        }
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        confirmText={
          modalType === 'delete'
            ? 'Delete'
            : post.published
              ? 'Unpublish'
              : 'Publish'
        }
      />
    </>
  );
};

export default BlogPost;
