
function SearchBar({ search, onSearch }) {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="🔍 Search your tasks..."
      value={search}
      onChange={e => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
