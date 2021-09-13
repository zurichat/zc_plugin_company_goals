import React from 'react';

import PropTypes from 'prop-types';

import { Interactive } from './SearchInteractive.styled';

const SearchInteractive = ({ searchState }) => {
  const searchData = ['Create wireframe', 'Prototype wireframe', 'Sketch wireframe'];

  const dynamicSearch = () => {
    return searchData.filter((goal) => goal.toLowerCase().includes(searchState.toLowerCase()));
  };

  console.log(searchState);

  const resultCount = 3;

  return (
    <Interactive>
      <div id="interactive-header">{resultCount.toString()} results found</div>
      <ul>
        <li>{dynamicSearch()}</li>
      </ul>
    </Interactive>
  );
};

SearchInteractive.propTypes = {
  searchState: PropTypes.string.isRequired,
};

export default SearchInteractive;
