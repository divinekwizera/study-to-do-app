
function FilterBar({ filter, onChange }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className="filter-bar">
      {filters.map(item => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={filter === item ? "active" : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
