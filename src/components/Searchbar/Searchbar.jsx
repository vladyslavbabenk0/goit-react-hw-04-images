import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim() === '') {
      toast.error('Enter your search query');
      return;
    }

    onSubmit({ search });
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          onChange={handleChange}
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          name="search"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
