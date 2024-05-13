import { PiMagnifyingGlassBold } from 'react-icons/pi';

import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.toLowerCase().trim();
    if (query === '') {
      alert('input query');
      return;
    }
    onSubmit(query);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button className={css.button} type="submit">
          <PiMagnifyingGlassBold />
        </button>
      </form>
    </header>
  );
}
