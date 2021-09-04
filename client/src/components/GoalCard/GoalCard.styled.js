import styled from 'styled-components';

export const GoalCardWrap = styled.div`
    width: 70%;
    box-sizing: border-box;
    font-family: 'Lato';
    height: fit-content;
    border-bottom: 1px solid #EBEBEB;
    padding: 23px 19px;
    background: #fff;
    position: relative;
    margin: 0 auto;
`
export const TopSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h3 {
        font-weight: 400;

    }
    span#menu {
        position: relative;
        top: 2px;
    } 
`
export const BottomSection = styled.div`
    margin-top: 11px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    color: #999999;
    font-size: 12px;
    span#tag-wrap {
        font-weight: 500;
        text-transform: uppercase;
        span {
            margin-right: 10px;
        }
        span#progress-rotate, span#date-timeline{
            text-transform: capitalize;
            color: #8D8D8D;
        }
    }
`

export const Reactions = styled.span`

`
export const Reaction = styled.span`
    margin-left: 19.5px;
    font-size: 12px;
    color: #999999;
`