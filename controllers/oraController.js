const catchAsync = require('../utils/catchAsync');

exports.exportToExcel = catchAsync(async (req, res, next) => {
  // const execQuery = await statQuery;
  res.status(200).json({
    status: 'success',
    data: 'stats',
  });
});
