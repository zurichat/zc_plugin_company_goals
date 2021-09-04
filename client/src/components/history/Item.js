export default HistoryItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
  background: rgba(245, 245, 245, 1);
  border-radius: 6px;
  padding: 0 2rem;
  font-size: 1rem;
  color: black !important;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  &.active {
    background: rgba(240, 252, 248, 1);
  }
`;
