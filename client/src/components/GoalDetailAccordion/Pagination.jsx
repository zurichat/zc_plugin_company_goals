import React from 'react';
import { PagContainer } from './GoalDetail.styled';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({ pageCount, pageNum, setPageNum, goalComponents }) => {
  const totalPages = Math.ceil(goalComponents.totalDocuments / 3);
  console.log(totalPages);

  const totalPagesArr = new Array(totalPages).fill(1).map((item, index) => index + 1);
  console.log(totalPagesArr);

  // function handlePrev(pageNum, index, setPageNum, totalPagesArr) {
  // if (!index === totalPagesArr[0]) setPageNum(pageNum - 1);

  // }

  //   function handleNext(pageNum, index, setPageNum, totalPagesArr) {
  //     if (!index === totalPagesArr[totalPagesArr.length - 1]) setPageNum(pageNum + 1);
  //   }

  return (
    <PagContainer>
      <div className="page_index_container">
        <button className="index">
          <BiChevronLeft />
        </button>
        {totalPagesArr?.map((page, index) => (
          <div onClick={() => setPageNum(page)} className={`index ${pageNum === page && 'active'}`} key={index}>
            {page}
          </div>
        ))}
        <button className="index">
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
