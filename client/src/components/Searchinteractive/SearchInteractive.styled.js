import styled from 'styled-components';

export const Interactive = styled.div`
    display: block;
    height: fit-content;
    width: fit-content;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50px;
    left: 6%;
    right: 0;
    z-index: 1500;
    padding-bottom: 43px;

    div#interactive-header {
        padding: 16px 72px;
        font-size: 13px;
        font-weight: 500;
        color: #BDBDBD;
    }
    ul {
        list-style: none;
    }
    ul li {
        text-transform: capitalize;
        color: body text color;
        font-size: 13px;
        padding: 15.13px 13px;
        font-weight: 500;
        border-bottom: 1px solid #E4E4E4;
    }
    ul li:nth-child(1) {
        border-top: 1px solid #E4E4E4;
    }
`

export const somethin = 'dd'