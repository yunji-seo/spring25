function CategoryFilter({ currentCategory, setCategory }) {
    const categories = ['all', 'grocery', 'school', 'other'];
  
    return (
      <div className='category-buttons'>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn ${currentCategory === cat ? 'selected' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
  
export default CategoryFilter;
  