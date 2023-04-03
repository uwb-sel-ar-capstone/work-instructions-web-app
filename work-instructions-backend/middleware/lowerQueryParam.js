const lowerQueryParam = (req, res, next) => {
  for (let key in req.query) {
    req.query[key.toLowerCase()] = req.query[key];
  }
  next();
};

module.exports = lowerQueryParam;
