import { useState } from 'react';
// import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [value, setValue] = useState('');
  console.log(value);

  return (
    <>
      <SearchBar onSubmit={setValue} />
    </>
  );
}

export default App;
