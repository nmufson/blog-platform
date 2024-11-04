import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlogPostById } from '../../services/blogPostService';
import { usePostForm } from '../../hooks/usePostForm/usePostForm';
import { useModal } from '../../hooks/useModal/useModal';
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
import { useAuth } from '../../hooks/useAuth/useAuth.js';

const BlogPost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(
    location.state?.post || {
      title: '',
      content: '',
      imageURL: '',
      imageAltText: '',
      user: { username: '' },
      published: false,
    },
  );
  const { isModalOpen, modalType, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const { loading, setLoading } = useAuth();
  const { post: formData, onChange } = usePostForm();

  const { user } = useOutletContext();
  const { date, time } = formatDateTime(post?.timestamp);

  // tries to pull post data from location, calls api if it can't
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchBlogPostById(postId);
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [postId]);

  useEffect(() => {
    if (post) {
      onChange({ target: { value: post.title } }, 'title');
      onChange({ target: { value: post.content } }, 'content');
      onChange({ target: { value: post.imageURL } }, 'imageURL');
      onChange({ target: { value: post.imageAltText } }, 'imageAltText');
    }
  }, [post]);

  if (loading) return <Loading></Loading>;
  if (!post) return <Loading />;

  const updatePost = async (newPublishedStatus = null) => {
    try {
      const response = await updateBlogPost(
        user,
        post.id,
        formData.title,
        formData.content,
        newPublishedStatus !== null ? newPublishedStatus : post.published,
      );
      setPost(response.updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const deletePost = async () => {
    try {
      await deleteBlogPost(user, post.id);
      navigate('/home');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleConfirm = () => {
    if (modalType === 'delete') {
      deletePost();
    } else if (modalType === 'affectPublish') {
      updatePost(!post.published);
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.blogPost}>
        <div className={styles.postContainer}>
          <div className={styles.blogHeader}>
            {isEditing ? (
              <input
                value={formData.title}
                maxLength={100}
                onChange={(e) => onChange(e, 'title')}
              />
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
              handleAffectPublishClick={() => openModal('affectPublish')}
            />
          )}

          {isEditing ? (
            <EditorComponent
              content={formData.content}
              onContentChange={(newContent) =>
                onChange({ target: { value: newContent } }, 'content')
              }
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
              openModal={openModal}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updatePost={updatePost}
            />
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
        closeModal={closeModal}
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
