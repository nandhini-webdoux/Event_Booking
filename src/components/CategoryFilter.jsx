
import Button from 'react-bootstrap/Button';
import styles from './categoryfilter.module.css';

const CATEGORIES = ['All', 'Tech', 'Music', 'Sports', 'Food'];

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className={styles.categoryFilter}>
      {/* <div className={styles.filterHeading}>
        <h6>Browse Categories</h6>
        <p>Choose a category to explore events</p>
      </div> */}

      <div className={styles.categoryButtons}>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
            variant="light"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
