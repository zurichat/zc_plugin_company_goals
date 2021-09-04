import styled from 'styled-components';

export const Progress = styled.span`
        width: 339px;
        height: 10px;
        border-radius: 16px;
        background: #E2DBDB80;
        z-index: 1;
        vertical-align: middle;
        position: relative;
        top: 7px;
`

export const InnerProgress = styled.span`
    height: 100%;
    width: ${(props) => props.progress};
    background-color: #2F80ED;
    display: block;
    border-radius: 16px;
    z-index: 10;
`