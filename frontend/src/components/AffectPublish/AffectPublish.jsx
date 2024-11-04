import styles from './AffectPublish.module.css';
import PropTypes from 'prop-types';

const AffectPublish = ({ post, handleAffectPublishClick }) => {
  return (
    <div className={styles.publishDiv}>
      {post.published ? (
        <p className={styles.publishMessage}>
          This post is currently published.{' '}
          <button
            type="button"
            onClick={() => handleAffectPublishClick()}
            className={styles.linkButton}
          >
            Select to unpublish
          </button>
        </p>
      ) : (
        <p className={styles.publishMessage}>
          This post is currently saved as a draft.{' '}
          <button
            type="button"
            onClick={() => handleAffectPublishClick()}
            className={styles.linkButton}
          >
            Select to publish
          </button>
        </p>
      )}
    </div>
  );
};

AffectPublish.propTypes = {
  post: PropTypes.shape({
    published: PropTypes.bool.isRequired,
  }).isRequired,
  handleAffectPublishClick: PropTypes.func.isRequired,
};

export default AffectPublish;
