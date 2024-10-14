import styles from './AffectPublish.module.css';

const AffectPublish = ({ post, handleAffectPublishClick }) => {
  return (
    <div className={styles.publishDiv}>
      {post.published ? (
        <small className={styles.smallMessage}>
          This post is currently published.{' '}
          <button
            type="button"
            onClick={() => handleAffectPublishClick()}
            className={styles.linkButton}
          >
            Select to unpublish
          </button>
        </small>
      ) : (
        <small className={styles.smallMessage}>
          This post is currently saved as a draft.{' '}
          <button
            type="button"
            onClick={() => handleAffectPublishClick()}
            className={styles.linkButton}
          >
            Select to publish
          </button>
        </small>
      )}
    </div>
  );
};

export default AffectPublish;
