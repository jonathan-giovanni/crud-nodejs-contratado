const controller = {};

const SyncQuery  = require('../utils/SyncQuery.js');
const CRUD       = require('../utils/CRUD.js');
const table      = 'cCategory';
const view       = 'category';

var crud = new CRUD(table,view);

// muestra la lista de elementos
controller.list = (req, res) => {
  crud.setReqRes(req,res);
  crud.crud_read();
};

//guarda o actualiza dependiendo si se le envia el id
controller.save = (req, res) => {
  crud.setReqRes(req,res);
  crud.crud_createOrUpdate();
};

//muestra el elemento con el id especifico
controller.edit = (req, res) => {
  crud.setReqRes(req,res);
  crud.crud_edit();
};

controller.delete = (req, res) => {
  crud.setReqRes(req,res);
  crud.crud_delete();
};

module.exports = controller;
