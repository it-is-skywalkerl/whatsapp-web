import "./styles.css";

function SearchField() {
  return (
    <div className="SearchField">
      <div className="SearchIcon">
        <i className="bx bx-search-alt-2 searchIcon"></i>
      </div>
      <input type="text" placeholder="Search or start a new chat" />
    </div>
  );
}

export default SearchField;
