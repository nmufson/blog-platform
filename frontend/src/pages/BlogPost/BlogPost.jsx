import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlogPostById } from '../../services/blogPostService';
import AffectPublish from '../../components/AffectPublish/AffectPublish';
import CommentSection from '../../components/Blog/CommentSection/CommentSection.jsx';
import styles from './BlogPost.module.css';
import { useOutletContext } from 'react-router-dom';
import formatDateTime from '../../utils/formatDateTime';
import DOMPurify from 'dompurify';
import Modal from '../../components/Modal/Modal';
import EditDeleteIcons from '../../components/EditDeleteIcons/EditDeleteIcons.jsx';
import { useNavigate } from 'react-router-dom';
import EditorComponent from '../../components/EditorComponent/EditorComponent';
import { deleteBlogPost, updateBlogPost } from '../../services/blogPostService';
import Loading from '../../components/Loading/Loading.jsx';

const BlogPost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(location.state?.post || null);
  const [postContent, setPostContent] = useState(post?.content || '');
  const [postTitle, setPostTitle] = useState(post?.title || '');
  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useOutletContext();
  const { date, time } = formatDateTime(post?.timestamp);

  const navigate = useNavigate();

  // tries to pull post data from location, calls api if it can't
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchBlogPostById(postId);
        const post = data.post;
        setPost(post);
        setPostTitle(post.title);
        setPostContent(post.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [postId]);

  if (!post) return <Loading></Loading>;

  const handleAffectPublishClick = () => {
    setModalType('affectPublish');
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (modalType === 'delete') {
      deletePost();
    } else if (modalType === 'affectPublish') {
      updatePost(!post.published);
    }
    setIsModalOpen(false);
  };

  const createUpdatePostFunction = () => {
    return async (newPublishedStatus = null) => {
      try {
        const response = await updateBlogPost(
          user,
          post.id,
          postTitle,
          postContent,
          newPublishedStatus !== null ? newPublishedStatus : post.published,
        );
        const updatedPost = response.updatedPost;
        setPost(updatedPost);
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    };
  };
  const updatePost = createUpdatePostFunction();

  const deletePost = async () => {
    try {
      await deleteBlogPost(user, post.id);

      navigate('/home');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <>
      <div className={styles.blogPost}>
        <div className={styles.postContainer}>
          <div className={styles.blogHeader}>
            {isEditing ? (
              <input
                value={postTitle}
                maxLength={100}
                onChange={(event) => setPostTitle(event.target.value)}
              ></input>
            ) : (
              <h1>{post.title}</h1>
            )}
            <p className={styles.authorName}>{post.user.username}</p>
            <p className={styles.dateTime}>
              {date}, {time}
            </p>
          </div>

          {post.imageURL && (
            <img
              src={post.imageURL}
              alt={post.imageAltText}
              className={styles.blogImage}
            />
          )}

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
              className={styles.postContent}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          )}
        </div>

        {user?.id === post.userId && (
          <div className={styles.editDeleteContainer}>
            <EditDeleteIcons
              setIsModalOpen={setIsModalOpen}
              setModalType={setModalType}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updatePost={createUpdatePostFunction()}
            ></EditDeleteIcons>
          </div>
        )}

        <CommentSection postId={post.id}></CommentSection>
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
