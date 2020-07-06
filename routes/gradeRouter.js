import express from 'express';
import controller from '../controllers/gradeController.js';

const app = express();

app.post('/grade/', controller.create); // OK
app.get('/grade/', controller.findAll); //OK
app.get('/grade/:name', controller.findOne); // OK
app.put('/grade/:id', controller.update); // OK
app.delete('/grade/:id', controller.remove); // OK
app.delete('/grade/', controller.removeAll); // OK

export { app as gradeRouter };
