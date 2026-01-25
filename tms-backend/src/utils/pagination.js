module.exports = function paginate(array, page, limit) {
  const start = (page - 1) * limit;
  const end = start + limit;
  return array.slice(start, end);
};
