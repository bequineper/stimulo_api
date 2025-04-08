import express from 'express';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT;

app.use(express.json());
app.use('/api',router);

app.get(`/`, async (req, res) => {
  res.send(`Hello World`)
  console.log(`Rota '/' rodando`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});