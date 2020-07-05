import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { gradeRouter } from './routes/gradeRouter.js';
// import { logger } from './config/logger.js';
import { db } from './models/index.js';
import dotenv from 'dotenv';

const app = express();

const dotEnv = dotenv.config();


(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // logger.info('Conectado ao banco de dados');
    console.log('Conectado ao banco de dados');

  } catch (error) {
    // logger.error(`Erro ao conectar no banco de dados!\n${error}`);
    console.log(`Erro ao conectar no banco de dados!\n${error}`);
    process.exit();

  }
})();


//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.use(gradeRouter);

app.get('/', (req, res) => {
  res.status(200).send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {
  // logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
  console.log(`Servidor em execução na porta ${process.env.PORT}`);
});
