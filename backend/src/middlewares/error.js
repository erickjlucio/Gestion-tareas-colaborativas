export function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return;
  res.status(err.status || 500).json({ error: err.message || 'Error interno' });
}
