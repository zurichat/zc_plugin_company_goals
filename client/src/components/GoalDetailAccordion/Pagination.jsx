import React from 'react';
import { PagContainer } from './GoalDetail.styled';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { goalPaginated } from '../../redux/pageNumSlice';

const Pagination = ({ pageNum, setPageNum, goalComponents }) => {
  const dispatch = useDispatch();
  console.log(goalComponents);
  
  const totalPages = Math.ceil(goalComponents.totalDocuments / 3);
  console.log(totalPages);
  
  const totalPagesArr = new Array(totalPages).fill(1).map((item, index) => index + 1);
  function handlePrev(pageNum, setPageNum, totalPagesArr) {
    if (pageNum >= totalPagesArr[0]) setPageNum(pageNum - 1);
    dispatch(goalPaginated(pageNum));
  }
  function handleNext(pageNum, setPageNum, totalPagesArr) {
    if (pageNum <= totalPagesArr[totalPagesArr.length - 1]) setPageNum(pageNum + 1);
    console.log(pageNum);
    dispatch(goalPaginated(pageNum));
  }
  console.log(pageNum);

  return (
    <PagContainer>
      <div className="page_index_container">
        <button
          className="index"
          onClick={() => handlePrev(pageNum, setPageNum, totalPagesArr)}
          disabled={pageNum === totalPagesArr[0] ? true : false}
        >
          <BiChevronLeft />
        </button>
        {totalPagesArr?.map((page, index) => (
          <div
            onClick={() => {
              dispatch(goalPaginated(pageNum));
              setPageNum(page);
            }}
            className={`index ${pageNum === page && 'active'}`}
            key={index}
          >
            {page}
          </div>
        ))}
        <button
          onClick={() => handleNext(pageNum, setPageNum, totalPagesArr)}
          className="index"
          disabled={pageNum === totalPagesArr[totalPagesArr.length - 1] ? true : false}
        >
          <BiChevronRight />
        </button>
      </div>
    </PagContainer>
  );
};
export default Pagination;
// <Pagination pageCount={totalPagesArr} pageIndex={pageIndex} setPageIndex={setPageIndex} />;
// get total pages available
// const totalPages = Math.ceil(data.totalDocuments / 3);
