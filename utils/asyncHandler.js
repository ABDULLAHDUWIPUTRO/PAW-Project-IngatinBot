// Meneruskan error dari fungsi async ke error handler Express, tanpa try/catch berulang di controller.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;