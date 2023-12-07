import { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const usePagination = ({totalCount, pageSize, siblingCount = 1, currentPage}) => {
  const paginationRange = useMemo(() => {
    // считаем количество страниц
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const pairOfSiblings = siblingCount * 2;
    //считаем кол-во номеров страниц siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = pairOfSiblings + 5;

    // если количество страниц меньше количества отображаемых номеров страниц
    // показываем пагинацию от 1 до последней страницы
    if (totalPageCount <= totalPageNumbers) {
      return range(1, totalPageCount);
    }

    // считаем индексы левого и правого сиблинга текущей страницы
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    let pages = 3; // количество отображаемых номеров страниц, не считая пары сиблингов

    // не показываем левые точки
    if (currentPage <= pairOfSiblings + 1) {
      pages = currentPage === 3 ? 2 : 1;
      let leftItemCount = pages + pairOfSiblings;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, lastPageIndex];
    }

    // не показываем правые точки
    if (currentPage >= totalPageCount - pairOfSiblings) {
        pages = currentPage === totalPageCount - 2 ? 2 : 1;
        let rightItemCount = pages + pairOfSiblings;
        let rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }

    // показываем и левые, и правые точки
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
