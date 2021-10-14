import React from 'react';
import { Pagination as AntDPagination } from 'antd';
import { isEmpty } from 'lodash';
import { i18n } from '@/common/i18n';
import { S2_PREFIX_CLS } from '@/common/constant/classnames';
import { Pagination } from '@/common/interface';

export interface S2PaginationProps {
  pagination: Pagination;
  current: number;
  total: number;
  pageSize?: number;
  setCurrent?: (current: number) => void;
  setPageSize?: (pageSize: number) => void;
}

export const S2Pagination: React.FC<S2PaginationProps> = ({
  pagination,
  current,
  total,
  pageSize,
  setCurrent,
  setPageSize,
}) => {
  // not show the pagination
  if (isEmpty(pagination)) {
    return null;
  }

  // only show the pagination when the pageSize > 5
  const showQuickJumper = total / pageSize > 5;
  const PRE_CLASS = `${S2_PREFIX_CLS}-pagination`;

  return (
    <div className={PRE_CLASS}>
      <AntDPagination
        defaultCurrent={current}
        total={total}
        pageSize={pageSize}
        showSizeChanger
        onShowSizeChange={(current, size) => {
          setCurrent(1);
          setPageSize(size);
        }}
        size={'small'}
        showQuickJumper={showQuickJumper}
        onChange={(page) => setCurrent(page)}
      />
      <span
        className={`${PRE_CLASS}-count`}
        title={`${i18n('共计')}${total}${i18n('条')}`}
      >
        {i18n('共计')}
        {total || ' - '}
        {i18n('条')}
      </span>
    </div>
  );
};

S2Pagination.displayName = 'S2Pagination';
