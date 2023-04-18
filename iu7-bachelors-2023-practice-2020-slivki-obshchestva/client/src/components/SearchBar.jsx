import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onChangeHandler }) {
  return (
    <form className="search">
      <input
        type="text"
        placeholder="Поиск"
        className="search__input"
        onChange={onChangeHandler}
      />
    </form>
  );
}

SearchBar.propTypes = {
  onChangeHandler: PropTypes.func.isRequired
};

export default SearchBar;
