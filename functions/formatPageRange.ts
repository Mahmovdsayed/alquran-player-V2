export const formatPageRange = (pages: [number, number]): string => {
  const [startPage, endPage] = pages;

  if (startPage === endPage) {
    return `Page: ${startPage}`;
  } else {
    return `Pages: ${startPage} to ${endPage}`;
  }
};
