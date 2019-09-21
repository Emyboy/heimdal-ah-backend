const pagination = (data, offset, size) => ({
  metadata: {
    count: data.count,
    currentPage: Math.floor(offset / size) + 1,
    pageSize: data.rows.length,
    totalPages: Math.ceil(data.count / size)
  }
});

export default pagination;
