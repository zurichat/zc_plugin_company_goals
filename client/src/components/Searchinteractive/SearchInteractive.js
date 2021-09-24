import React from 'react';

import PropTypes from 'prop-types';

import { Interactive, EmptySearch } from './SearchInteractive.styled';

const SearchInteractive = ({ searchState }) => {
  const searchData = [
    {
      id: 1,
      text: 'Create wireframe',
    },
    {
      id: 2,
      text: 'Prototype wireframe',
    },
    {
      id: 3,
      text: 'Sketch wireframe',
    },
  ];

  const resultCount = searchData.filter((goal) => goal.text.toLowerCase().includes(searchState.toLowerCase())).length;

  return (
    <Interactive>
      <div id="interactive-header">
        {resultCount} {resultCount > 1 ? 'results' : 'result'} found
      </div>
      <ul>
        {resultCount === 0 ? (
          <EmptySearch>
            <p>No Result Found</p>
          </EmptySearch>
        ) : (
          searchData
            .filter((goal) => goal.text.toLowerCase().includes(searchState.toLowerCase()))
            .map((info) => <li key={info.id}>{info.text}</li>)
        )}
      </ul>
    </Interactive>
  );
};

SearchInteractive.propTypes = {
  searchState: PropTypes.string.isRequired,
};

export default SearchInteractive;
