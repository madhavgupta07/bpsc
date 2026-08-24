const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Resource not found' });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
