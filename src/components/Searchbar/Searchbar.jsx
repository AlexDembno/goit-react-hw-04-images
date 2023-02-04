import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

function Searchbar({ searchImages }) {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    searchImages(search);

    reset();
  };

  const reset = () => {
    setSearch('');
  };

  const hendlInputChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <header className={styles.App}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.SearchForm_button}>
          <span className={styles.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={styles.SearchForm_input}
          name="search"
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
          onChange={hendlInputChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  searchImages: PropTypes.func.isRequired,
};
