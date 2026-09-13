require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/newsexplorer' } = process.env;

const app = express();

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

app.use(cors());

app.use(requestLogger);

app.use(express.json());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
});
