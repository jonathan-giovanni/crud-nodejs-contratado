const controller = {};


const CRUD       = require('../utils/CRUD.js');
const table      = 'cSubCategory';
const view       = 'subcategory';

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

//elimina el dato seleccionado
controller.delete = (req, res) => {
  crud.setReqRes(req,res);
  crud.crud_delete();
};

module.exports = controller;
