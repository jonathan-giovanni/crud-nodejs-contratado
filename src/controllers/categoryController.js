const controller = {};



controller.list = (req,res) => {
  req.getConnection((err,conn) =>{
      if(err){
          res.json(err);
      }else{
          conn.query('select * from cCategory',(err,category)=>{
              if(err){
                  res.json(err);
              }else{
                  //res.json(category); retorna un json con los datos
                  res.render('category',{
                      edit_data:null,
                      data: category
                  });
              }
          });
      }
  });
};

controller.save = (req, res) => {
  const data = req.body;
  if(data.id){
      console.log("Existe");
      req.getConnection((err, connection) => {
      console.log(data);
      connection.query('update cCategory set ? where id = ?', [data, data.id], (err, rows) => {
         res.redirect('/');
         if(err){
             console.log(err);
         }
      })});
  }else{
      console.log("No existe");
      data.id = null;
      req.getConnection((err, connection) => {
      const query = connection.query('insert into cCategory set ?', data, (err, customer) => {
         console.log(customer)
        res.redirect('/');
      })
     });
  }
};


controller.edit = (req, res) => {
  const { id } = req.params;
  var item;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM cCategory WHERE id = ?", [id], (err, found) => {
      item = found;
    });
    conn.query("SELECT * FROM cCategory", [id], (err, items) => {
      res.render('category', {
        edit_data: item[0],
        data: items
      })
    });
  });
};




controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
  conn.query('UPDATE customer set ? where id = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM cCategory WHERE id = ?', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}


module.exports = controller;