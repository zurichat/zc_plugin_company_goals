import React from 'react';
import {Spinner, SpinnerContainer} from './loader.styled.js';

const Loader = () => {
    return (
        <SpinnerContainer>
            <Spinner/>
        </SpinnerContainer>
    );
}

export default Loader;
