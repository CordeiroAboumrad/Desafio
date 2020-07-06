import { db, studentModel } from '../models/index.js';
// import { logger } from '../config/logger.js';


const create = async (req, res) => {
  try {

    const student = new studentModel(req.body);
    await student.save();

    res.status(200).send(student);
    // logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    // logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};


const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
  ? { name: { $regex: new RegExp(name), $options: 'i' } }
  : {};
  
  
  try {

    const student = await studentModel.find({});
    res.status(200).send(student);

    // logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    // logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};


const findOne = async (req, res) => {
  const name = req.params.name; 
  // const id = req.params.id;

  try {

    const student = await studentModel.find({"name": name});

    res.status(200).send(student);

    // logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade name: ' + name });
    // logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};


const update = async (req, res) => {
  
  const id = req.params.id;
  
  try {

    if (!req.body) {
        throw 'Dados para atualização vazios';
    }

    const student = await studentModel.findOneAndUpdate({'_id': id},
        req.body,
        {new: true}
        );

    res.status(200).send(student);

    // logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    // logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};


const remove = async (req, res) => {
  const id = req.params.id;

  try {

    const student = await studentModel.findOneAndDelete({'_id': id});
    if(!student){
      res.status(404).send('Documento não encontrado na coleção.');
    }

    res.status(200).send({ message: 'Grade excluido com sucesso' });

    // logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    // logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};


const removeAll = async (req, res) => {
  const id = req.params.id;

  try {

    const student = await studentModel.deleteMany({});

    res.status(200).send({
      message: `Grades excluidos`,
    });
    // logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    // logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
