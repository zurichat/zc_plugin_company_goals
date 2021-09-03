import { useState } from 'react';

import Search from './components/searchBarDisplay/Search';
import Home from './pages/Home';

function App() {
  const [searchState, setSearchState] = useState('');
  const handleSearch = (event) => {
    const value = event.type === 'blur' ? '' : event.target.value;
    setSearchState(value);
  };

  return (
    <div className="App">
      <Home onSearch={handleSearch} />
      {searchState ? <Search /> : null}
    </div>
  );
}

export default App;
