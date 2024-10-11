import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlogPostById } from '../../services/blogPostService';
import CommentList from '../../components/Blog/CommentList/CommentList';
import styles from './BlogPost.module.css';
import DOMPurify from 'dompurify';

const BlogPost = () => {
  const { postId } = useParams(); // Extract postId from URL
  const location = useLocation(); // Access state passed from navigation
  const [post, setPost] = useState(location.state?.post || null);

  // tries to pull post data from parent component state, or calls
  // api if it can't
  useEffect(() => {
    if (!post) {
      const getPost = async () => {
        try {
          const data = await fetchBlogPostById(postId);
          setPost(data.post); // Assuming the post is nested under `data.post`
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      getPost();
    }
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  // perhaps underline the title
  return (
    <div className={styles.BlogPost}>
      {/* <div className={styles.publishDiv}>
        <button>Publish</button>
      </div> */}
      <div className={styles.postContainer}>
        <h1>{post.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </div>
      <CommentList post={post} comments={post.comments}></CommentList>
    </div>
  );
};

export default BlogPost;
