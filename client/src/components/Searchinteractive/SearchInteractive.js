import React from 'react';

import {Interactive} from './SearchInteractive.styled';

function SearchInteractive(props) {
    const resultCount = 3;
    const {display} = props;
    return (
        <Interactive display={display} >
            <div id="interactive-header">
                {resultCount.toString()} results found
            </div>
            <ul>
                <li>Create wireframe</li>
                <li>Prototype wireframe</li>
                <li>Sketch wireframe</li>
            </ul>
        </Interactive>
    )
}

export default SearchInteractive
