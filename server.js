import express from 'express';
import loadClient from './middlewares/load_client.js';

const PORT = process.env.PORT || 8080;

const app = express();

loadClient(app);

app.listen(PORT, () => {
  console.log(`Server Started on Port: ${PORT}\nMode: ${process.env.NODE_ENV}\nURI: http://127.0.0.1:${PORT}`);
});
