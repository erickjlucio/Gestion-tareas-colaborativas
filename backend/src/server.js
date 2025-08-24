import dotenv from 'dotenv';
import app, { initDb } from './app.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

initDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
}).catch(err => {
  console.error('Failed to init DB', err);
  process.exit(1);
});
