import "../../scss/app.scss";

const Search = ({ onSearch, value, onClear, inputRef, inFocus }) => {
  return (
    <div className="header__search">
      <label htmlFor="searchQuery">
        <svg
          className="header__search-icon"
          width="19"
          height="15"
          viewBox="0 0 19 18"
          fill="none"
        >
          <path
            d="M13.2406 12.7955L17.8753 17.4302M15.637 8.17399C15.637 12.1237 12.4352 15.3255 8.48552 15.3255C4.53583 15.3255 1.33398 12.1237 1.33398 8.17399C1.33398 4.22431 4.53583 1.02246 8.48552 1.02246C12.4352 1.02246 15.637 4.22431 15.637 8.17399Z"
            stroke="gray"
          ></path>
        </svg>
      </label>
      <input
        type="text"
        autoComplete="off"
        name="searchQuery"
        id="searchQuery"
        placeholder="Search..."
        onChange={onSearch}
        value={value}
        ref={inputRef}
      />
      {inFocus && (
        <span className="clear-input" onClick={onClear}>
          x
        </span>
      )}
    </div>
  );
};

export default Search;
