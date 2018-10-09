const controller = {};

const SyncQuery  = require('../utils/utils.js');
const table      = 'cSubCategory';

// muestra la lista de elementos
controller.list = (req,res) => {
  req.getConnection((err,conn) =>{
      if(err){
        res.json(err);
      }else{
        conn.query('SELECT * FROM '+table,(err,rows)=>{
            if(err){
              res.json(err);
            }else{
              console.log(rows);
              //res.json(rows); // retorna un json con los datos
              res.render('subcategory',{
                edit_data:null,
                data: rows
              });
            }
        });
      }
  });
};

//guarda o actualiza dependiendo si se le envia el id
controller.save = (req, res) => {
  const data = req.body;
  if(data.id){
    console.log("Existe");
    req.getConnection((err, connection) => {
      console.log(data);
      connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err, rows) => {
        res.redirect('/subcategory');
        if(err){
          console.log(err);
        }
      })
    });
  }else{
    console.log("No existe");
    data.id = null;
    req.getConnection((err, connection) => {
      connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
        res.redirect('/subcategory');
      })
    });
  }
};


//muestra el elemento con el id especifico
controller.edit = (req, res) => {
  const { id } = req.params;
  let item,items;  // solo es visible en este ambito
  req.getConnection((err, conn) => {
    //consulta utilizando promise para realizar proceso sincrono
    let syncQuery = new SyncQuery(conn);
    syncQuery.query( `SELECT * FROM ${table} WHERE id = ?`, [id] )
    .then( rows => {
        item = rows;
        return syncQuery.query( 'SELECT * FROM '+table);
    })
    .then( rows => {
        items = rows;
    })
    .then( () => {
        res.render('subcategory', {
          edit_data: item[0],
          data: items
        })
    } );
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, rows) => {
      res.redirect('/');
    });
  });
};


module.exports = controller;
