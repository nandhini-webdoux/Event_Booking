import Button from 'react-bootstrap/Button'

const CATEGORIES = ['All', 'Tech', 'Music', 'Sports', 'Food']

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-4">
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'primary' : 'outline-primary'}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

export default CategoryFilter
