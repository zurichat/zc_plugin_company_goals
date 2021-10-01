import React from 'react';
import { PagContainer } from './GoalDetail.styled';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const Pagination = ({ pageCount, pageNum, setPageNum }) => {
  const totalPages = Math.ceil(pageCount.totalDocuments / 3);

  const totalPagesArr = new Array(totalPages).fill(1).map((item, index) => index + 1);

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
