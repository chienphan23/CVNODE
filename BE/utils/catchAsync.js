export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err)); // fn là 1 hàm bất đồng bộ => promise => có lỗi => catch
  };
};
