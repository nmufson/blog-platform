import React, { useEffect, useRef } from 'react';
import Masonry from 'masonry-layout';
import styles from './MasonryGrid.module.css'; // Import your CSS styles

const MasonryGrid = ({ posts }) => {
  const masonryRef = useRef(null);

  useEffect(() => {
    const masonryInstance = new Masonry(masonryRef.current, {
      itemSelector: `.${styles.gridItem}`, // Adjust based on your item class
      columnWidth: `.${styles.gridItem}`, // Adjust based on your item class
      gutter: 10, // Space between items
    });

    // Cleanup
    return () => {
      masonryInstance.destroy();
    };
  }, [posts]); // Re-run if posts change

  return (
    <div ref={masonryRef} className={styles.masonryGrid}>
      {posts.map((post) => (
        <div key={post.id} className={styles.gridItem}>
          <img src={post.image} alt={post.altText} />
          <h3>{post.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
