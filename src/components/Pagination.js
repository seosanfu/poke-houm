import React from 'react'
import { Pagination } from 'antd';

export const PaginationPoke = ({ setPage, page, total }) => {

  const handleOnChange = (pageNumber) => {
      setPage(pageNumber - 1);
  }

  return (
    <Pagination defaultCurrent={1} current={page + 1} total={total} onChange={handleOnChange} pageSize={12} showSizeChanger={false} />
  )
}
