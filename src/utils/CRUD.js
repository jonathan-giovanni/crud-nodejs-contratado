
const SyncQuery  = require('../utils/SyncQuery.js');

//foreach asincrono
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

module.exports = class CRUD{
  //se crea en el respectivo controlador
  constructor(table,view){
    this.error_view = 'error';
    this.table   = table;
    this.view    = view;
    this.create  = `INSERT INTO ${table} SET ?`;
    this.read    = 'SELECT * FROM '+table;
    this.read_id = `SELECT * FROM ${table} WHERE id = ?`;
    this.update  = `UPDATE ${table} SET ? WHERE id = ?`;
    this.delete  = `DELETE FROM ${table} WHERE id = ?`;
  }
  //se llama cada vez que se ejecuta una peticion
  setReqRes(req,res){
    this.req    = req;
    this.res    = res;
  }

  setNullValues(values){
    this.values = values;
  }

  setQuerys(querys,args){
    this.read = querys;
    this.args = args;
  }
  //para guardar o actualizar los datos
  crud_createOrUpdate(){
    let data = this.req.body;
    //recorrer el arreglo con los valores para definirlos nulos
    if(this.values){
      for (let i in data) {
        console.log(i);
        if (data[i]=='' & this.values.includes(i)) {
          data[i] = null;
          console.log('--------------------entre');
        }
      }
    }

    if(data.id){
      this.req.getConnection((err, conn) => {
        if(err){
          this.error('Actualización','Conexión a la base de datos',err);
        }else{
          conn.query(this.update, [data, data.id], (err, rows) => {
            if(err){
              this.error('Actualización','Sentencia SQL de '+this.table,err);
            }else{
              this.res.redirect('/'+this.view);
            }
          });
        }
      });
    }else{
      data.id = null;
      this.req.getConnection((err, conn) => {
        if(err){
          this.error('Inserción','Conexión a la base de datos',err);
        }else{
          console.log(data);
          conn.query(this.create, data, (err, result) => {
            if(err){
              this.error('Inserción','Sentencia SQL de '+this.table,err);
            }else{
              this.res.redirect('/'+this.view);
            }
          });
        }
      });
    }
  }
  //para mostrar los datos
  crud_read(my_query){
    if(my_query){
      this.read = my_query;
    }
    this.req.getConnection((err,conn) =>{
        if(err){
          this.error('Consulta','Conexión a la base de datos',err);
        }else{
          conn.query(this.read,this.args,(err,rows)=>{
              if(err){
                this.error('Consulta','Sentencia SQL de '+this.table,err);
              }else{
                //this.res.json(rows); // retorna un json con los datos
                this.res.render(this.view,{
                  edit_data:null,
                  data: rows
                });
              }
          });
        }
    });
  }
  //para eliminar datos
  crud_delete(){
    const { id } = this.req.params;
    this.req.getConnection((err,conn) =>{
        if(err){
          this.error('Eliminación','Conexión a la base de datos',err);
        }else{
          conn.query(this.delete,[id],(err,rows)=>{
              if(err){
                this.error('Eliminación','Sentencia SQL de '+this.table,err);
              }else{
                this.res.redirect('/'+this.view);
              }
          });
        }
    });
  }

   //para mostrar los datos en el mismo formulario de inserción
  crud_edit(){
    const { id } = this.req.params;
    let item,items;  // solo es visible en este ambito
    this.req.getConnection((err, conn) => {
      if(err){
        this.error('Edición','Conexión a la base de datos',err);
      }else{
        //consulta utilizando promise para realizar proceso sincrono
        let syncQuery = new SyncQuery(conn);
        syncQuery.query( this.read_id, [id] )
        .then( rows => {
            item = rows;
            return syncQuery.query( this.read) ;
        })
        .then( rows => {
            items = rows;
        })
        .then( () => {
            this.res.render(this.view, {
              edit_data: item[0],
              data: items
            });
        })
        .catch( err => {
          this.error('Edición','Sentencia SQL de '+this.table,err);
        });
      }
    });
  }
  //Para manejar los errores
  error(operation,type,err){
    this.res.render(this.error_view,{
      error_op:operation,
      error_type:type,
      error:err
    });
  }



}
