export default function SearchBar({ onSubmit }) {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === '') {
      alert('input query');
      return;
    }
    onSubmit(query);
    e.target.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
