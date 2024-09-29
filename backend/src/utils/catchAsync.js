function catchAsync(controllerFunc) {
  return function (req, res, next) {
    controllerFunc(req, res, next).catch(next);
  };
}

module.exports = catchAsync;
